import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore';
import { db } from './firebase';
import { BoardGame, MeetupSession } from '../types';
import { INITIAL_MEETUPS, sortMeetupsLatestFirst } from '../data/meetups';

function cleanForFirestore<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function useFirestoreData() {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [meetups, setMeetups] = useState<MeetupSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeGames: (() => void) | undefined;
    let unsubscribeMeetups: (() => void) | undefined;

    async function initAndListen() {
      try {
        // Set up real-time listener for games collection in Firestore
        unsubscribeGames = onSnapshot(
          collection(db, 'games'),
          (snap) => {
            const loadedGames: BoardGame[] = snap.docs.map((docSnap) => {
              const data = docSnap.data() as BoardGame;
              return {
                ...data,
                id: docSnap.id,
              };
            });
            setGames(loadedGames);
            setIsLoading(false);
          },
          (err) => {
            console.error('Firestore games listener error:', err);
            setIsLoading(false);
          }
        );

        // Check if meetups need initial seeding if collection is empty
        const meetupsRef = collection(db, 'meetups');
        const meetupsSnap = await getDocs(query(meetupsRef));
        if (meetupsSnap.empty && INITIAL_MEETUPS.length > 0) {
          console.log('Seeding initial meetups to Firestore...');
          const meetupBatch = writeBatch(db);
          for (const meetup of INITIAL_MEETUPS) {
            const cleanMeetup = cleanForFirestore({
              ...meetup,
              createdAt: new Date().toISOString(),
            });
            const meetupDoc = doc(db, 'meetups', meetup.id);
            meetupBatch.set(meetupDoc, cleanMeetup);
          }
          await meetupBatch.commit();
        }

        // Set up real-time listener for meetups
        unsubscribeMeetups = onSnapshot(
          collection(db, 'meetups'),
          (snap) => {
            if (!snap.empty) {
              const loadedMeetups: MeetupSession[] = snap.docs.map((docSnap) => {
                const data = docSnap.data() as MeetupSession;
                return {
                  ...data,
                  id: docSnap.id,
                };
              });
              setMeetups(sortMeetupsLatestFirst(loadedMeetups));
            } else {
              setMeetups([]);
            }
          },
          (err) => {
            console.error('Firestore meetups listener error:', err);
          }
        );
      } catch (err) {
        console.error('Error initializing Firestore data:', err);
        setIsLoading(false);
      }
    }

    initAndListen();

    return () => {
      if (unsubscribeGames) unsubscribeGames();
      if (unsubscribeMeetups) unsubscribeMeetups();
    };
  }, []);

  return { games, meetups, isLoading };
}
