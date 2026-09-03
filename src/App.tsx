import React, { useState, useEffect } from 'react';
import { useLocalData } from './lib/useLocalData';
import { initGA, trackPageView } from './lib/analytics';
import { Header, TabType } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GameCard } from './components/GameCard';
import { FilterBar } from './components/FilterBar';
import { HomeView } from './components/HomeView';
import { MeetupsView } from './components/MeetupsView';
import { JoinDialog } from './components/JoinDialog';
import { GameDetailDialog } from './components/GameDetailDialog';
import { BoardGame } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'games' || hash === 'meetups') {
      return hash as TabType;
    }
    return 'home';
  });
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initialize Google Analytics if Measurement ID is set
    initGA();
  }, []);

  useEffect(() => {
    const tabTitles: Record<TabType, string> = {
      home: 'Home | Board Game Society',
      games: 'Games Library | Board Game Society',
      meetups: 'Meetup Journals | Board Game Society',
    };
    trackPageView(`/${activeTab === 'home' ? '' : activeTab}`, tabTitles[activeTab] || 'Board Game Society');
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'games' || hash === 'meetups') {
        setActiveTab(hash as TabType);
      } else if (!hash || hash === 'home') {
        setActiveTab('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { games, meetups, isLoading } = useLocalData();

  const filteredGames = games.filter(game => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      if (!game.name.toLowerCase().includes(q)) return false;
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-20 md:pb-8">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto">
        {activeTab === 'home' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
            <HomeView
              meetups={meetups}
              onExploreGames={() => handleTabChange('games')}
              onExploreMeetups={() => handleTabChange('meetups')}
              onOpenJoin={() => setIsJoinOpen(true)}
            />
          </div>
        )}

        {activeTab === 'games' && (
          <div id="games-view" className="space-y-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Board Game Library</h2>
              <p className="text-sm text-neutral-500 mt-1">Explore all games available in our community collection.</p>
            </div>

            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalGamesCount={games.length}
              filteredGamesCount={filteredGames.length}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
              {filteredGames.length === 0 ? (
                <div className="text-center py-16 bg-neutral-50 rounded border border-neutral-200">
                  <p className="text-sm font-medium text-neutral-600">No games found matching your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 px-4 py-2 bg-neutral-900 text-white rounded text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  id="games-grid"
                >
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onSelectGame={(g) => setSelectedGame(g)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'meetups' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
            <MeetupsView
              meetups={meetups}
              games={games}
              onOpenJoin={() => setIsJoinOpen(true)}
              onSelectGame={(g) => setSelectedGame(g)}
            />
          </div>
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Community Join Dialog */}
      <JoinDialog
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      {/* Game Detail Dialog */}
      <GameDetailDialog
        game={selectedGame}
        isOpen={selectedGame !== null}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
}
