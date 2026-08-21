import { MeetupSession } from '../types';

export function extractGamesFromDescription(desc?: string): string[] {
  if (!desc) return [];
  const matches = desc.match(/"([^"]+)"/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.replace(/"/g, '').trim())));
}

export const INITIAL_MEETUPS: MeetupSession[] = [
  {
    id: 'meetup-2024-08-20',
    date: '20 Aug',
    time: '7:00 PM – 10:30 PM',
    location: 'Dharitri Cafe',
    locationUrl: 'https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9',
    host: 'Parag',
    description: `Today, we had a chaotic round of table slapping with "Taco Cat"

Fought over the tastiest snacks plates with "Chatpate"

Accused each other about being Werewolves to save villagers (unsuccessfully) in "Werewolves"

Figured out what card we were holding, to make pairs of three in "Trio"

And ended the night with a round of making the tastiest dishes in "Masala Lab"!

3 hours, 5 games, and 8 amazing players!`,
    gamesPlayed: ['Taco Cat', 'Chatpate', 'Werewolves', 'Trio', 'Masala Lab']
  },
  {
    id: 'meetup-2024-08-14',
    date: '14 Aug',
    time: '4:00 PM – 6:30 PM',
    location: 'GWE, Hebbal',
    host: 'Parag',
    description: `We conquered the depths of the dungeon, narrowingly escaping the dragon and gathered treasures and artifacts in "Clank!"

We also spent some time with political intrigue, in a game of deception, lying and taking over governments in "Coup"!`,
    gamesPlayed: ['Clank!', 'Coup']
  },
  {
    id: 'meetup-2024-08-09',
    date: '9 Aug',
    location: 'GWE, Hebbal',
    host: 'Parag',
    description: `Today, we avoided (some) bomb explosions with "Keep Talking and Nobody Explodes", and then spent time trying to decipher ghostly visions to find the murderer in "Mysterium Park"`,
    gamesPlayed: ['Keep Talking and Nobody Explodes', 'Mysterium Park']
  },
  {
    id: 'meetup-2024-08-01',
    date: '1 Aug',
    location: 'Dharitri Cafe',
    locationUrl: 'https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9',
    host: 'Parag',
    gamesPlayed: ['Loot', 'Codenames']
  },
  {
    id: 'meetup-2024-07-25',
    date: '25 Jul',
    location: 'GWE, Hebbal',
    host: 'Shreya',
    gamesPlayed: ['Mahjong', 'Next Station: London']
  }
];
