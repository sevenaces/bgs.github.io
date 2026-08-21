import React, { useState } from 'react';
import { INITIAL_GAMES } from './data/initialGames';
import { Header, TabType } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GameCard } from './components/GameCard';
import { JoinDialog } from './components/JoinDialog';

const FEATURED_GAME_ID = 'dharitri-canvas';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('games');
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const games = INITIAL_GAMES;
  const featuredGame = games.find((g) => g.id === FEATURED_GAME_ID);
  const otherGames = games.filter((g) => g.id !== FEATURED_GAME_ID);

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
          <div id="home-view" className="py-16 text-center text-neutral-400">
            {/* Empty view as requested */}
          </div>
        )}

        {activeTab === 'games' && (
          <div id="games-view">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4"
              id="games-grid"
            >
              {/* Featured Game of the Week */}
              {featuredGame && (
                <GameCard
                  key={featuredGame.id}
                  game={featuredGame}
                  isFeatured={true}
                />
              )}

              {/* Other Games */}
              {otherGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meetups' && (
          <div id="meetups-view" className="py-16 text-center text-neutral-400">
            {/* Empty view as requested */}
          </div>
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
