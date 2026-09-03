import { useState } from 'react';
import { BoardGame, MeetupSession } from '../types';
import { GAMES } from '../data/games';
import { MEETUPS } from '../data/meetups';

export function useLocalData() {
  const [games, setGames] = useState<BoardGame[]>(GAMES);
  const [meetups, setMeetups] = useState<MeetupSession[]>(MEETUPS);
  const isLoading = false;

  return { games, setGames, meetups, setMeetups, isLoading };
}

