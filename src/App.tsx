import React, { useState } from 'react';
import { INITIAL_GAMES } from './data/initialGames';
import { INITIAL_MEETUPS } from './data/meetups';
import { Header, TabType } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GameCard } from './components/GameCard';
import { HomeView } from './components/HomeView';
import { MeetupsView } from './components/MeetupsView';
import { JoinDialog } from './components/JoinDialog';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const games = INITIAL_GAMES;
  const meetups = INITIAL_MEETUPS;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-20 md:pb-8">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-8">
        {activeTab === 'home' && (
          <HomeView
            meetups={meetups}
            onExploreGames={() => setActiveTab('games')}
            onExploreMeetups={() => setActiveTab('meetups')}
            onOpenJoin={() => setIsJoinOpen(true)}
          />
        )}

        {activeTab === 'games' && (
          <div id="games-view">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4"
              id="games-grid"
            >
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meetups' && (
          <MeetupsView
            meetups={meetups}
            games={games}
            onOpenJoin={() => setIsJoinOpen(true)}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Community Join Dialog */}
      <JoinDialog
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />
    </div>
  );
}
