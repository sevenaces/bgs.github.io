import { BoardGame } from '../types';

function mergeDuplicateGames(rawGames: BoardGame[]): BoardGame[] {
  const map = new Map<string, BoardGame>();

  for (const game of rawGames) {
    const key = game.name.toLowerCase().trim();
    const rawOwnerType = game.ownerType === 'multiple' ? 'other' : (game.ownerType || 'other');
    const cleanId = game.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (map.has(key)) {
      const existing = map.get(key)!;
      const existingOwners = existing.owners || [{ name: existing.owner, ownerType: existing.ownerType === 'multiple' ? 'other' : existing.ownerType, note: existing.ownerNote }];
      const newOwnerName = game.owner || (rawOwnerType === 'parag' ? 'Parag' : 'Dharitri Cafe');
      
      if (!existingOwners.some(o => o.name.toLowerCase() === newOwnerName.toLowerCase())) {
        existingOwners.push({ name: newOwnerName, ownerType: rawOwnerType, note: game.ownerNote });
      }

      existing.owners = existingOwners;
      existing.owner = existingOwners.map(o => o.name.replace(/\s*\(reachparag\)/i, '')).join(' & ');
      existing.ownerType = existingOwners.length > 1 ? 'multiple' : existingOwners[0].ownerType;

      if (!existing.thumbnail && game.thumbnail) existing.thumbnail = game.thumbnail;
      if (!existing.image && game.image) existing.image = game.image;
      if (!existing.videoUrl && game.videoUrl) existing.videoUrl = game.videoUrl;
      if (!existing.bggId && game.bggId) existing.bggId = game.bggId;
      if (!existing.bggRating && game.bggRating) existing.bggRating = game.bggRating;
      if (!existing.description && game.description) existing.description = game.description;
      if (!existing.minPlayers && game.minPlayers) existing.minPlayers = game.minPlayers;
      if (!existing.maxPlayers && game.maxPlayers) existing.maxPlayers = game.maxPlayers;
      if (!existing.playingTime && game.playingTime) existing.playingTime = game.playingTime;
      if (!existing.yearPublished && game.yearPublished) existing.yearPublished = game.yearPublished;
      if (!existing.categories && game.categories) existing.categories = game.categories;
    } else {
      const initialOwners = [{ name: game.owner || (rawOwnerType === 'parag' ? 'Parag' : 'Dharitri Cafe'), ownerType: rawOwnerType, note: game.ownerNote }];
      map.set(key, {
        ...game,
        id: cleanId,
        ownerType: rawOwnerType,
        owners: initialOwners,
        owner: initialOwners.map(o => o.name.replace(/\s*\(reachparag\)/i, '')).join(' & '),
      });
    }
  }

  return Array.from(map.values());
}

const rawGames: BoardGame[] = [
  // Featured Game of the week
  {
    id: 'dharitri-canvas',
    name: 'Canvas',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/canvas.jpeg',
    image: '/canvas.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=kAZxJTqFgSw',
    source: 'custom'
  },

  // Dharitri Cafe Games
  {
    id: 'dharitri-playing-cards',
    name: 'Playing Cards',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/playing_cards.jpeg',
    image: '/playing_cards.jpeg',
    source: 'custom'
  },
  {
    id: 'dharitri-uno-classic',
    name: 'UNO Classic',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/uno_classic.png',
    image: '/uno_classic.png',
    videoUrl: 'https://www.youtube.com/watch?v=FkuqYtE1rw0',
    source: 'custom'
  },
  {
    id: 'dharitri-uno-flip',
    name: 'UNO Flip',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/uno_flip.jpg',
    image: '/uno_flip.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=l-AyukgblK4',
    source: 'custom'
  },
  {
    id: 'dharitri-uno-show-em-no-mercy',
    name: "UNO - Show 'Em No Mercy",
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/uno_no_mercy.jpg',
    image: '/uno_no_mercy.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=g4boAtA9p3w',
    source: 'custom'
  },
  {
    id: 'dharitri-harmonies',
    name: 'Harmonies',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/harmonies.png',
    image: '/harmonies.png',
    videoUrl: 'https://www.youtube.com/watch?v=NlygiFc_xNY',
    source: 'custom'
  },
  {
    id: 'dharitri-loot',
    name: 'Loot',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/loot.jpeg',
    image: '/loot.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=WUTc1AF3a0I',
    source: 'custom'
  },
  {
    id: 'dharitri-taco-cat',
    name: 'Taco Cat Goat Cheese Pizza',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/taco_cat.jpeg',
    image: '/taco_cat.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=oihdM_Rj44g',
    source: 'custom'
  },
  {
    id: 'dharitri-codenames',
    name: 'Codenames',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/codenames.jpeg',
    image: '/codenames.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=J8RWBooJivg',
    source: 'custom'
  },
  {
    id: 'dharitri-ultimate-werewolf',
    name: 'Ultimate Werewolf',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/werewolves.png',
    image: '/werewolves.png',
    videoUrl: 'https://www.youtube.com/watch?v=XsP6LvZQpLk',
    source: 'custom'
  },
  {
    id: 'dharitri-trio',
    name: 'Trio',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/trio.jpeg',
    image: '/trio.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=9M5_B9jmxvQ',
    source: 'custom'
  },
  {
    id: 'dharitri-chatpate',
    name: 'Chatpate',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/chatpate.jpeg',
    image: '/chatpate.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=3snHEMIlGBI',
    source: 'custom'
  },
  {
    id: 'dharitri-bollywood-showdown',
    name: 'Bollywood Showdown',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/bollywood_showdown.jpeg',
    image: '/bollywood_showdown.jpeg',
    source: 'custom'
  },
  {
    id: 'dharitri-coup',
    name: 'Coup',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/coup.jpg',
    image: '/coup.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=lPlBDZnxHQA',
    source: 'custom'
  },
  {
    id: 'dharitri-masala-lab',
    name: 'Masala Lab',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/masala_lab.jpg',
    image: '/masala_lab.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QUBXDnY18n0',
    source: 'custom'
  },

  // Parag's Games
  {
    id: 'keep-talking-and-nobody-explodes',
    name: 'Keep Talking and Nobody Explodes',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Party', 'Cooperative'],
    minPlayers: 2,
    maxPlayers: 6,
    playingTime: 30,
    videoUrl: 'https://www.youtube.com/watch?v=1t5o68A0K6A',
    source: 'custom'
  },
  {
    id: 'parag-7-wonders-duel',
    name: '7 Wonders Duel',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/7_wonders_duel.jpeg',
    image: '/7_wonders_duel.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=NlygiFc_xNY',
    source: 'custom'
  },
  {
    id: 'parag-7-wonders-duel-agora',
    name: '7 Wonders Duel: Agora',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Expansion'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/agora.jpg',
    image: '/agora.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=kAZxJTqFgSw',
    source: 'custom'
  },
  {
    id: 'parag-7-wonders-duel-pantheon',
    name: '7 Wonders Duel: Pantheon',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Expansion'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/pantheon.jpeg',
    image: '/pantheon.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=WUTc1AF3a0I',
    source: 'custom'
  },
  {
    id: 'parag-angry-indians',
    name: 'Angry Indians',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 8,
    playingTime: 45,
    thumbnail: '/angry_indians.jpg',
    image: '/angry_indians.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=oihdM_Rj44g',
    source: 'custom'
  },
  {
    id: 'parag-azul',
    name: 'Azul',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 45,
    thumbnail: '/azul.jpg',
    image: '/azul.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=cI7UuD5Zp3w',
    source: 'custom'
  },
  {
    id: 'parag-cards-against-humanity',
    name: 'Cards Against Humanity',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 4,
    maxPlayers: 30,
    playingTime: 30,
    thumbnail: '/cards_againsts_humanity.png',
    image: '/cards_againsts_humanity.png',
    videoUrl: 'https://www.youtube.com/watch?v=J8RWBooJivg',
    source: 'custom'
  },
  {
    id: 'parag-cascadia',
    name: 'Cascadia',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 4,
    playingTime: 45,
    thumbnail: '/cascadia.webp',
    image: '/cascadia.webp',
    videoUrl: 'https://www.youtube.com/watch?v=XsP6LvZQpLk',
    source: 'custom'
  },
  {
    id: 'parag-catan',
    name: 'Catan',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 3,
    maxPlayers: 4,
    playingTime: 120,
    thumbnail: '/catan.jpeg',
    image: '/catan.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=kw8drL0G2p4',
    source: 'custom'
  },
  {
    id: 'parag-chai-garam',
    name: 'Chai Garam',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 60,
    thumbnail: '/chai_garam.jpeg',
    image: '/chai_garam.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=9M5_B9jmxvQ',
    source: 'custom'
  },
  {
    id: 'parag-chess',
    name: 'Chess',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/chess.jpg',
    image: '/chess.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=fKxG8KjH1MH',
    source: 'custom'
  },
  {
    id: 'parag-chutes-and-ladders',
    name: 'Chutes and Ladders',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 6,
    playingTime: 30,
    thumbnail: '/snakes_and_ladders.png',
    image: '/snakes_and_ladders.png',
    videoUrl: 'https://www.youtube.com/watch?v=3snHEMIlGBI',
    source: 'custom'
  },
  {
    id: 'parag-clank',
    name: 'Clank!: A Deck-Building Adventure',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 60,
    thumbnail: '/clank.webp',
    image: '/clank.webp',
    videoUrl: 'https://www.youtube.com/watch?v=lPlBDZnxHQA',
    source: 'custom'
  },
  {
    id: 'parag-codenames',
    name: 'Codenames',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 8,
    playingTime: 15,
    thumbnail: '/codenames.jpeg',
    image: '/codenames.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=zQVHgn6A14A',
    source: 'custom'
  },
  {
    id: 'parag-the-crew-mission-deep-sea',
    name: 'The Crew: Mission Deep Sea',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 5,
    playingTime: 20,
    thumbnail: '/crew.jpg',
    image: '/crew.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QUBXDnY18n0',
    source: 'custom'
  },
  {
    id: 'parag-dominion',
    name: 'Dominion',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 30,
    thumbnail: '/dominion.jpg',
    image: '/dominion.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=52Yf3EmsAWE',
    source: 'custom'
  },
  {
    id: 'parag-flamecraft-duals',
    name: 'Flamecraft Duals',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 2,
    playingTime: 45,
    thumbnail: '/flamecraft_dual.jpeg',
    image: '/flamecraft_dual.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=xm4FbFySIvY',
    source: 'custom'
  },
  {
    id: 'parag-fletter',
    name: 'Fletter',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 5,
    playingTime: 30,
    thumbnail: '/fletter.jpg',
    image: '/fletter.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=q1OSR4EYQNo',
    source: 'custom'
  },
  {
    id: 'parag-shasn',
    name: 'Shasn',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 5,
    playingTime: 90,
    thumbnail: '/shasn.jpeg',
    image: '/shasn.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=FkuqYtE1rw0',
    source: 'custom'
  },
  {
    id: 'parag-the-game-of-life',
    name: 'The Game of Life',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 6,
    playingTime: 60,
    thumbnail: '/life.jpg',
    image: '/life.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=7u2q43FvO4A',
    source: 'custom'
  },
  {
    id: 'parag-great-shakespearean-deaths',
    name: 'Great Shakespearean Deaths: Card Game',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 5,
    playingTime: 30,
    thumbnail: '/shakespearean_death.jpg',
    image: '/shakespearean_death.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=FkuqYtE1rw0',
    source: 'custom'
  },
  {
    id: 'parag-harmonies',
    name: 'Harmonies',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 4,
    playingTime: 45,
    thumbnail: '/harmonies.png',
    image: '/harmonies.png',
    videoUrl: 'https://www.youtube.com/watch?v=l-AyukgblK4',
    source: 'custom'
  },
  {
    id: 'parag-heros-realms',
    name: "Hero's Realms",
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 2,
    playingTime: 60,
    thumbnail: '/heros_realm.jpg',
    image: '/heros_realm.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=g4boAtA9p3w',
    source: 'custom'
  },
  {
    id: 'parag-jaipur',
    name: 'Jaipur',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/jaipur.jpg',
    image: '/jaipur.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=NlygiFc_xNY',
    source: 'custom'
  },
  {
    id: 'parag-just-one',
    name: 'Just One',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 3,
    maxPlayers: 7,
    playingTime: 60,
    thumbnail: '/just_one.jpg',
    image: '/just_one.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=kAZxJTqFgSw',
    source: 'custom'
  },
  {
    id: 'parag-kingdomino',
    name: 'Kingdomino',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 25,
    thumbnail: '/kingdomino.png',
    image: '/kingdomino.png',
    videoUrl: 'https://www.youtube.com/watch?v=WUTc1AF3a0I',
    source: 'custom'
  },
  {
    id: 'parag-lakshadweep',
    name: 'Lakshadweep',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 45,
    thumbnail: '/lakshadweep.jpg',
    image: '/lakshadweep.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=oihdM_Rj44g',
    source: 'custom'
  },
  {
    id: 'parag-loot',
    name: 'Loot',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 8,
    playingTime: 20,
    thumbnail: '/loot.jpeg',
    image: '/loot.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=J8RWBooJivg',
    source: 'custom'
  },
  {
    id: 'parag-lotr-duel',
    name: 'The Lord of the Rings: Duel for Middle-earth',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/lotr_duel.jpg',
    image: '/lotr_duel.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=XsP6LvZQpLk',
    source: 'custom'
  },
  {
    id: 'parag-masala-lab',
    name: 'Masala Lab',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 60,
    thumbnail: '/masala_lab.jpg',
    image: '/masala_lab.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9M5_B9jmxvQ',
    source: 'custom'
  },
  {
    id: 'parag-the-mind',
    name: 'The Mind',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 20,
    thumbnail: '/the_mind.jpeg',
    image: '/the_mind.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=3snHEMIlGBI',
    source: 'custom'
  },
  {
    id: 'parag-mind-the-gap',
    name: 'Mind the Gap',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 99,
    playingTime: 60,
    thumbnail: '/mind_the_gap.jpg',
    image: '/mind_the_gap.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=lPlBDZnxHQA',
    source: 'custom'
  },
  {
    id: 'parag-mysterium-park',
    name: 'Mysterium Park',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 6,
    playingTime: 45,
    thumbnail: '/mysterium_park.jpg',
    image: '/mysterium_park.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QUBXDnY18n0',
    source: 'custom'
  },
  {
    id: 'parag-next-station-london',
    name: 'Next Station: London',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 4,
    playingTime: 30,
    thumbnail: '/next station london.jpeg',
    image: '/next station london.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=xm4FbFySIvY',
    source: 'custom'
  },
  {
    id: 'parag-othello',
    name: 'Othello',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/othello.jpg',
    image: '/othello.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=q1OSR4EYQNo',
    source: 'custom'
  },
  {
    id: 'parag-pachisi',
    name: 'Pachisi',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 6,
    playingTime: 30,
    thumbnail: '/pachisi.webp',
    image: '/pachisi.webp',
    videoUrl: 'https://www.youtube.com/watch?v=FkuqYtE1rw0',
    source: 'custom'
  },
  {
    id: 'parag-risk-strike',
    name: 'Risk Strike',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 5,
    playingTime: 20,
    thumbnail: '/risk.jpg',
    image: '/risk.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=l-AyukgblK4',
    source: 'custom'
  },
  {
    id: 'parag-sagrada',
    name: 'Sagrada',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 4,
    playingTime: 45,
    thumbnail: '/sagrada.jpeg',
    image: '/sagrada.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=g4boAtA9p3w',
    source: 'custom'
  },
  {
    id: 'parag-scattergories',
    name: 'Scattergories',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 6,
    playingTime: 30,
    thumbnail: '/scattergories.png',
    image: '/scattergories.png',
    videoUrl: 'https://www.youtube.com/watch?v=NlygiFc_xNY',
    source: 'custom'
  },
  {
    id: 'parag-scrabble',
    name: 'Scrabble',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 90,
    thumbnail: '/scrabble.webp',
    image: '/scrabble.webp',
    videoUrl: 'https://www.youtube.com/watch?v=kAZxJTqFgSw',
    source: 'custom'
  },
  {
    id: 'parag-sea-salt-paper-extra-pepper',
    name: 'Sea Salt & Paper: Extra Pepper',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Expansion'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 45,
    thumbnail: '/sea salt paper.webp',
    image: '/sea salt paper.webp',
    videoUrl: 'https://www.youtube.com/watch?v=WUTc1AF3a0I',
    source: 'custom'
  },
  {
    id: 'dharitri-sequence',
    name: 'Sequence',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    thumbnail: '/sequence.jpg',
    image: '/sequence.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=oihdM_Rj44g',
    source: 'custom'
  },
  {
    id: 'parag-sequence',
    name: 'Sequence',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 12,
    playingTime: 30,
    thumbnail: '/sequence.jpg',
    image: '/sequence.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=oihdM_Rj44g',
    source: 'custom'
  },
  {
    id: 'parag-sky-team',
    name: 'Sky Team',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 20,
    thumbnail: '/sky team.jpg',
    image: '/sky team.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=J8RWBooJivg',
    source: 'custom'
  },
  {
    id: 'parag-splendor',
    name: 'Splendor',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 30,
    videoUrl: 'https://www.youtube.com/watch?v=XsP6LvZQpLk',
    source: 'custom'
  },
  {
    id: 'parag-splendor-duel',
    name: 'Splendor Duel',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 30,
    thumbnail: '/splendor duel.jpeg',
    image: '/splendor duel.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=9M5_B9jmxvQ',
    source: 'custom'
  },
  {
    id: 'parag-spot-it',
    name: 'Spot it!',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 8,
    playingTime: 15,
    thumbnail: '/dobble.jpg',
    image: '/dobble.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=3snHEMIlGBI',
    source: 'custom'
  },
  {
    id: 'dharitri-taboo',
    name: 'Taboo',
    owner: 'Dharitri Cafe',
    ownerType: 'dharitri',
    categories: ['Standalone'],
    minPlayers: 4,
    maxPlayers: 10,
    playingTime: 20,
    videoUrl: 'https://www.youtube.com/watch?v=QUBXDnY18n0',
    source: 'custom'
  },
  {
    id: 'parag-taboo',
    name: 'Taboo',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 4,
    maxPlayers: 10,
    playingTime: 20,
    videoUrl: 'https://www.youtube.com/watch?v=QUBXDnY18n0',
    source: 'custom'
  },
  {
    id: 'parag-taco-cat',
    name: 'Taco Cat Goat Cheese Pizza',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 8,
    playingTime: 30,
    thumbnail: '/taco_cat.jpeg',
    image: '/taco_cat.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=xm4FbFySIvY',
    source: 'custom'
  },
  {
    id: 'parag-terraforming-mars',
    name: 'Terraforming Mars',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 1,
    maxPlayers: 5,
    playingTime: 120,
    thumbnail: '/terraforming mars.jpg',
    image: '/terraforming mars.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=q1OSR4EYQNo',
    source: 'custom'
  },
  {
    id: 'parag-ticket-to-ride',
    name: 'Ticket to Ride',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 5,
    playingTime: 60,
    thumbnail: '/ticket to ride.jpg',
    image: '/ticket to ride.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=FkuqYtE1rw0',
    source: 'custom'
  },
  {
    id: 'parag-uninvited-guests-at-a-wedding',
    name: 'Uninvited Guests at a Wedding',
    owner: 'Parag',
    ownerType: 'parag',
    categories: ['Standalone'],
    minPlayers: 2,
    maxPlayers: 8,
    playingTime: 30,
    thumbnail: '/uninvited guests.jpg',
    image: '/uninvited guests.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=l-AyukgblK4',
    source: 'custom'
  }
];

export const INITIAL_GAMES: BoardGame[] = mergeDuplicateGames(rawGames);
