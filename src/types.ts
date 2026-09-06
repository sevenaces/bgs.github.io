export interface GameOwnerInfo {
  name: string;
  ownerType: 'parag' | 'dharitri' | 'member' | 'other';
  note?: string;
}

export interface BoardGame {
  id: string;
  name: string;
  owner: string;
  ownerType?: 'parag' | 'dharitri' | 'member' | 'other' | 'multiple';
  owners?: GameOwnerInfo[];
  ownerNote?: string;
  minPlayers?: number;
  maxPlayers?: number;
  playingTime?: number;
  minPlayTime?: number;
  maxPlayTime?: number;
  yearPublished?: number;
  image?: string;
  thumbnail?: string;
  bggId?: string;
  bggRating?: number;
  bggWeight?: number;
  categories?: string[];
  mechanics?: string[];
  description?: string;
  videoUrl?: string;
  source: 'bgg' | 'google-sheet' | 'custom';
  createdAt?: string;
}

export type OwnerFilter = 'all' | 'parag' | 'dharitri' | 'other';
export type ViewMode = 'grid' | 'table';
export type SortOption = 'name-asc' | 'name-desc' | 'rating-desc' | 'playtime-asc' | 'players-asc' | 'year-desc';

export interface MeetupSession {
  id: string;
  date: string;
  time?: string;
  location: string;
  locationUrl?: string;
  host: string;
  description?: string;
  gamesPlayed?: string[];
  createdAt?: string;
}

export interface SyncStatus {
  bgg: 'idle' | 'loading' | 'success' | 'error';
  sheet: 'idle' | 'loading' | 'success' | 'error';
  lastSynced?: Date;
  bggCount?: number;
  sheetCount?: number;
  errorMessage?: string;
}

