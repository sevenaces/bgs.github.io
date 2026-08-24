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
import { INITIAL_GAMES } from '../data/initialGames';
import { INITIAL_MEETUPS, sortMeetupsLatestFirst } from '../data/meetups';

function cleanForFirestore<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function useFirestoreData() {
  const [games, setGames] = useState<BoardGame[]>(INITIAL_GAMES);
  const [meetups, setMeetups] = useState<MeetupSession[]>(() => sortMeetupsLatestFirst(INITIAL_MEETUPS));
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeded, setIsSeeded] = useState(false);

  useEffect(() => {
    let unsubscribeGames: (() => void) | undefined;
    let unsubscribeMeetups: (() => void) | undefined;

    async function initAndListen() {
      try {
        // Check if database needs initial seeding
        const gamesRef = collection(db, 'games');
        let snapshot = await getDocs(query(gamesRef));

        // Delete any game documents whose ID starts with parag or dharitri
        const docsToDelete = snapshot.docs.filter(d => {
          const idLower = d.id.toLowerCase();
          return idLower.startsWith('parag') || idLower.startsWith('dharitri');
        });

        if (docsToDelete.length > 0) {
          console.log(`Deleting ${docsToDelete.length} game documents starting with parag or dharitri...`);
          const deleteBatch = writeBatch(db);
          for (const dDoc of docsToDelete) {
            deleteBatch.delete(dDoc.ref);
          }
          await deleteBatch.commit();
          snapshot = await getDocs(query(gamesRef));
        }

        if (snapshot.empty) {
          console.log('Seeding initial games and meetups to Firestore...');
          
          // Seed games in chunks of 300 to stay well under 500-operation batch limits
          const allGames = INITIAL_GAMES;
          const chunkSize = 300;
          for (let i = 0; i < allGames.length; i += chunkSize) {
            const chunk = allGames.slice(i, i + chunkSize);
            const batch = writeBatch(db);
            for (const game of chunk) {
              const cleanGame = cleanForFirestore({
                ...game,
                createdAt: new Date().toISOString(),
              });
              const gameDoc = doc(db, 'games', game.id);
              batch.set(gameDoc, cleanGame);
            }
            await batch.commit();
          }

          // Seed meetups
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

          setIsSeeded(true);
          console.log('Firestore seed completed successfully.');
        } else {
          // Sync all initial games so new games (like Flamecraft) and updated thumbnails (Taboo, Splendor, Keep Talking) are merged into Firestore
          const allInitialGames = INITIAL_GAMES;
          const chunkSize = 300;
          for (let i = 0; i < allInitialGames.length; i += chunkSize) {
            const chunk = allInitialGames.slice(i, i + chunkSize);
            const batch = writeBatch(db);
            for (const game of chunk) {
              const cleanGame = cleanForFirestore({
                ...game,
                createdAt: new Date().toISOString(),
              });
              const gameDoc = doc(db, 'games', game.id);
              batch.set(gameDoc, cleanGame, { merge: true });
            }
            await batch.commit();
          }

          // Also upsert/sync initial meetups to ensure names like Ultimate Werewolf & Taco Cat Goat Cheese Pizza are updated
          const meetupBatch = writeBatch(db);
          for (const meetup of INITIAL_MEETUPS) {
            const cleanMeetup = cleanForFirestore({
              ...meetup,
              createdAt: new Date().toISOString(),
            });
            const meetupDoc = doc(db, 'meetups', meetup.id);
            meetupBatch.set(meetupDoc, cleanMeetup, { merge: true });
          }
          await meetupBatch.commit();
        }

        // Set up real-time listener for games
        unsubscribeGames = onSnapshot(
          collection(db, 'games'),
          (snap) => {
            if (!snap.empty) {
              const loadedGames: BoardGame[] = snap.docs.map((docSnap) => {
                const data = docSnap.data() as BoardGame;
                return {
                  ...data,
                  id: docSnap.id,
                };
              });
              setGames(loadedGames);
            }
            setIsLoading(false);
          },
          (err) => {
            console.error('Firestore games listener error:', err);
            setIsLoading(false);
          }
        );

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

  return { games, meetups, isLoading, isSeeded };
}
