import { BoardGame, SyncStatus } from '../types';

const STORAGE_KEY_GAMES = 'bgs_games_collection_v1';
const STORAGE_KEY_SYNC = 'bgs_sync_status_v1';

export const BGG_USERNAME = 'reachparag';
export const BGG_COLLECTION_URL = `https://boardgamegeek.com/xmlapi2/collection?username=${BGG_USERNAME}&own=1`;
export const BGG_WEB_URL = `https://boardgamegeek.com/collection/user/${BGG_USERNAME}`;
export const GOOGLE_SHEET_ID = '1WcrI8_aSUsrLpx4k7GyajCAdyr6PXSNNBZp1xP7gKzA';
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit?gid=0#gid=0`;

// CORS proxy list for client-side fetches
const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => url, // direct fallback
];

export function getStoredGames(): BoardGame[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_GAMES);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read games from localStorage:', e);
  }
  return [];
}

export function saveStoredGames(games: BoardGame[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_GAMES, JSON.stringify(games));
  } catch (e) {
    console.warn('Failed to save games to localStorage:', e);
  }
}

export function getStoredSyncStatus(): SyncStatus {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SYNC);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        ...parsed,
        lastSynced: parsed.lastSynced ? new Date(parsed.lastSynced) : undefined,
      };
    }
  } catch (e) {
    console.warn('Failed to read sync status:', e);
  }
  return {
    bgg: 'idle',
    sheet: 'idle',
    lastSynced: new Date(),
    bggCount: 0,
    sheetCount: 0,
  };
}

export function saveStoredSyncStatus(status: SyncStatus): void {
  try {
    localStorage.setItem(STORAGE_KEY_SYNC, JSON.stringify(status));
  } catch (e) {
    console.warn('Failed to save sync status:', e);
  }
}

/**
 * Parses XML from BoardGameGeek Collection API
 */
export function parseBggXml(xmlText: string): BoardGame[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const items = xmlDoc.getElementsByTagName('item');
  const games: BoardGame[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const objectId = item.getAttribute('objectid') || String(i);
    const nameEl = item.getElementsByTagName('name')[0];
    const name = nameEl?.textContent || 'Unnamed Game';

    const yearEl = item.getElementsByTagName('yearpublished')[0];
    const yearPublished = yearEl?.textContent ? parseInt(yearEl.textContent, 10) : undefined;

    const thumbEl = item.getElementsByTagName('thumbnail')[0];
    const imageEl = item.getElementsByTagName('image')[0];
    const thumbnail = thumbEl?.textContent || undefined;
    const image = imageEl?.textContent || thumbnail;

    const statsEl = item.getElementsByTagName('stats')[0];
    let minPlayers: number | undefined;
    let maxPlayers: number | undefined;
    let minPlayTime: number | undefined;
    let maxPlayTime: number | undefined;
    let playingTime: number | undefined;
    let bggRating: number | undefined;

    if (statsEl) {
      const minp = statsEl.getAttribute('minplayers');
      const maxp = statsEl.getAttribute('maxplayers');
      const minpt = statsEl.getAttribute('minplaytime');
      const maxpt = statsEl.getAttribute('maxplaytime');
      const pt = statsEl.getAttribute('playingtime');

      if (minp) minPlayers = parseInt(minp, 10);
      if (maxp) maxPlayers = parseInt(maxp, 10);
      if (minpt) minPlayTime = parseInt(minpt, 10);
      if (maxpt) maxPlayTime = parseInt(maxpt, 10);
      if (pt) playingTime = parseInt(pt, 10);

      const ratingEl = statsEl.getElementsByTagName('rating')[0];
      const avgEl = ratingEl?.getElementsByTagName('average')[0];
      if (avgEl) {
        const val = avgEl.getAttribute('value');
        if (val && !isNaN(parseFloat(val))) {
          bggRating = Math.round(parseFloat(val) * 10) / 10;
        }
      }
    }

    games.push({
      id: `bgg-${objectId}`,
      name,
      owner: 'Parag (reachparag)',
      ownerType: 'parag',
      minPlayers,
      maxPlayers,
      minPlayTime,
      maxPlayTime,
      playingTime: playingTime || maxPlayTime || minPlayTime,
      yearPublished,
      image,
      thumbnail,
      bggId: objectId,
      bggRating,
      source: 'bgg',
    });
  }

  return games;
}

/**
 * Parses CSV exported from Google Sheets
 */
export function parseSheetCsv(csvText: string): BoardGame[] {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return [];

  const games: BoardGame[] = [];
  // Skip header if it exists
  const startIndex = lines[0].toLowerCase().includes('game') || lines[0].toLowerCase().includes('name') || lines[0].toLowerCase().includes('title') ? 1 : 0;

  for (let i = startIndex; i < lines.length; i++) {
    const row = lines[i];
    // Simple CSV parser handling quotes
    const cells: string[] = [];
    let insideQuote = false;
    let currentCell = '';

    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim());

    if (cells.length > 0 && cells[0]) {
      const cleanName = cells[0].replace(/^["']|["']$/g, '').trim();
      if (!cleanName || cleanName.toLowerCase() === 'game name' || cleanName.toLowerCase() === 'name') continue;

      const playersCol = cells[1] ? cells[1].replace(/^["']|["']$/g, '').trim() : '';
      const timeCol = cells[2] ? cells[2].replace(/^["']|["']$/g, '').trim() : '';
      const noteCol = cells[3] ? cells[3].replace(/^["']|["']$/g, '').trim() : '';

      // Parse players if present (e.g., "2-4", "4", "2-6 Players")
      let minPlayers: number | undefined;
      let maxPlayers: number | undefined;
      const playerMatch = playersCol.match(/(\d+)\s*[-–to]?\s*(\d+)?/);
      if (playerMatch) {
        minPlayers = parseInt(playerMatch[1], 10);
        maxPlayers = playerMatch[2] ? parseInt(playerMatch[2], 10) : minPlayers;
      }

      // Parse playing time (e.g. "30-45 mins", "60", "15m")
      let playingTime: number | undefined;
      const timeMatch = timeCol.match(/(\d+)/);
      if (timeMatch) {
        playingTime = parseInt(timeMatch[1], 10);
      }

      games.push({
        id: `cafe-${i}-${encodeURIComponent(cleanName.slice(0, 15))}`,
        name: cleanName,
        owner: 'Dharitri Cafe',
        ownerType: 'dharitri',
        ownerNote: noteCol || 'Available at cafe',
        minPlayers: minPlayers || 2,
        maxPlayers: maxPlayers || 4,
        playingTime: playingTime || 30,
        source: 'google-sheet',
      });
    }
  }

  return games;
}

/**
 * Fetch with multiple proxy fallbacks
 */
async function fetchWithFallback(targetUrl: string): Promise<string> {
  let lastError: Error | null = null;

  for (const proxyGen of CORS_PROXIES) {
    try {
      const url = proxyGen(targetUrl);
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/xml, text/xml, text/csv, text/plain, */*',
        },
      });
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 0 && !text.includes('Too Many Requests') && !text.includes('Access Denied')) {
          return text;
        }
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw lastError || new Error('All fetch attempts failed');
}

/**
 * Syncs both BGG collection and Google Sheet, merging with existing data
 */
export async function syncAllGameSources(): Promise<{
  games: BoardGame[];
  status: SyncStatus;
}> {
  const currentGames = getStoredGames();
  const currentStatus: SyncStatus = {
    bgg: 'loading',
    sheet: 'loading',
  };

  let bggGames: BoardGame[] = [];
  let sheetGames: BoardGame[] = [];

  // Fetch BGG
  try {
    const bggXml = await fetchWithFallback(BGG_COLLECTION_URL);
    bggGames = parseBggXml(bggXml);
    if (bggGames.length > 0) {
      currentStatus.bgg = 'success';
      currentStatus.bggCount = bggGames.length;
    } else {
      currentStatus.bgg = 'error';
    }
  } catch (e) {
    console.warn('BGG sync failed, retaining previous Parag games:', e);
    currentStatus.bgg = 'error';
    // Keep previous Parag games
    bggGames = currentGames.filter(g => g.ownerType === 'parag');
  }

  // Fetch Google Sheet
  try {
    const sheetCsvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
    const csvText = await fetchWithFallback(sheetCsvUrl);
    sheetGames = parseSheetCsv(csvText);
    if (sheetGames.length > 0) {
      currentStatus.sheet = 'success';
      currentStatus.sheetCount = sheetGames.length;
    } else {
      currentStatus.sheet = 'error';
    }
  } catch (e) {
    console.warn('Google Sheet sync failed, retaining previous Cafe games:', e);
    currentStatus.sheet = 'error';
    // Keep previous Cafe games
    sheetGames = currentGames.filter(g => g.ownerType === 'dharitri');
  }

  // Custom / member added games
  const memberGames = currentGames.filter(g => g.ownerType !== 'parag' && g.ownerType !== 'dharitri');

  // Merge unique games
  const merged = [...bggGames, ...sheetGames, ...memberGames];
  
  const finalStatus: SyncStatus = {
    ...currentStatus,
    lastSynced: new Date(),
    bggCount: bggGames.length,
    sheetCount: sheetGames.length,
  };

  saveStoredGames(merged);
  saveStoredSyncStatus(finalStatus);

  return {
    games: merged,
    status: finalStatus,
  };
}
