import { MeetupSession } from '../types';

export function extractGamesFromDescription(desc?: string): string[] {
  if (!desc) return [];
  const matches = desc.match(/"([^"]+)"/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.replace(/"/g, '').trim())));
}

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

export function parseMeetupDateToTimestamp(dateStr?: string, id?: string): number {
  if (id) {
    const match = id.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, y, m, d] = match;
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
    }
  }

  if (dateStr) {
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      const day = parseInt(parts[0], 10);
      const monthStr = parts[1].toLowerCase().slice(0, 3);
      const month = MONTH_MAP[monthStr] ?? 0;
      const year = parts[2] ? parseInt(parts[2], 10) : 2026;
      return new Date(year, month, isNaN(day) ? 1 : day).getTime();
    }
  }

  return 0;
}

export function sortMeetupsLatestFirst(meetups: MeetupSession[]): MeetupSession[] {
  return [...meetups].sort((a, b) => {
    const timeA = parseMeetupDateToTimestamp(a.date, a.id);
    const timeB = parseMeetupDateToTimestamp(b.date, b.id);
    if (timeA !== timeB) {
      return timeB - timeA; // Descending (latest first)
    }
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
}

export const INITIAL_MEETUPS: MeetupSession[] = [
   {
    id: 'meetup-2026-09-06',
    date: '6 Sep',
    time: '4:00 PM – 6:30 PM',
    location: 'Kadhaigal Library',
    locationUrl: 'https://maps.app.goo.gl/sNgssERsPkofSsYK9',
    host: 'Parag',
    description: `We served families mouthwatering street foods from the sensational "Khau Gali" of Ahmedabad, Delhi, Mumbai, Calcutta and Indore. 🥙🥙

We avenged the director's death, by following ghostly visions to locate the murderer in "Mysterium Park" 👻🎡

We frantically defused bombs, with mixed success in "Keep Talking and Nobody Explodes" 💣💥

And lastly, we got uncomfortably competitive, acted like buffoons, and slapped the table in "Taco Cat Goat Cheese Pizza". 🌮😺🐐🧀🍕🦧🦄🦫`,
    gamesPlayed: ['Taco Cat Goat Cheese Pizza', 'Keep Talking and Nobody Explodes', 'Mysterium Park']
  },
  {
    id: 'meetup-2026-08-22',
    date: '22 Aug',
    time: '4:00 PM – 6:30 PM',
    location: 'Dharitri Cafe',
    locationUrl: 'https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9',
    host: 'Parag',
    description: `Today was co-op day! We won together, and we lost together!

We guessed words with "Just One" unique one word hints! 

Followed by defusing bombs (some unsuccessfuly) in "Keep Talking and Nobody Explodes"

Then we spent some time trying to avenge the death of the director by following ghostly visions to find the murderer in "Mysterium Park"

Ending the evening with a quick game of "Ultimate Werewolf".`,
    gamesPlayed: ['Just One', 'Keep Talking and Nobody Explodes', 'Mysterium Park', 'Ultimate Werewolf']
  },
  {
    id: 'meetup-2026-08-20',
    date: '20 Aug',
    time: '7:00 PM – 10:30 PM',
    location: 'Dharitri Cafe',
    locationUrl: 'https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9',
    host: 'Parag',
    description: `Today, we had a chaotic round of table slapping with "Taco Cat Goat Cheese Pizza"

Fought over the tastiest snacks plates with "Chatpate"

Accused each other about being Werewolves to save villagers (unsuccessfully) in "Ultimate Werewolf"

Figured out what card we were holding, to make pairs of three in "Trio"

And ended the night with a round of making the tastiest dishes in "Masala Lab"!

3 hours, 5 games, and 8 amazing players!`,
    gamesPlayed: ['Taco Cat Goat Cheese Pizza', 'Chatpate', 'Ultimate Werewolf', 'Trio', 'Masala Lab']
  },
  {
    id: 'meetup-2026-08-14',
    date: '14 Aug',
    time: '4:00 PM – 6:30 PM',
    location: 'GWE, Hebbal',
    host: 'Parag',
    description: `We conquered the depths of the dungeon, narrowingly escaping the dragon and gathered treasures and artifacts in "Clank!"

We also spent some time with political intrigue, in a game of deception, lying and taking over governments in "Coup"!`,
    gamesPlayed: ['Clank!', 'Coup']
  },
  {
    id: 'meetup-2026-08-09',
    date: '9 Aug',
    location: 'GWE, Hebbal',
    host: 'Parag',
    description: `Today, we avoided (some) bomb explosions with "Keep Talking and Nobody Explodes", and then spent time trying to decipher ghostly visions to find the murderer in "Mysterium Park"`,
    gamesPlayed: ['Keep Talking and Nobody Explodes', 'Mysterium Park']
  },
  {
    id: 'meetup-2026-08-01',
    date: '1 Aug',
    location: 'Dharitri Cafe',
    locationUrl: 'https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9',
    host: 'Parag',
    gamesPlayed: ['Loot', 'Codenames']
  },
  {
    id: 'meetup-2026-07-25',
    date: '25 Jul',
    location: 'GWE, Hebbal',
    host: 'Shreya',
    gamesPlayed: ['Mahjong', 'Next Station: London']
  }
];

export const MEETUPS: MeetupSession[] = sortMeetupsLatestFirst(INITIAL_MEETUPS);

