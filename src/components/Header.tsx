import React from 'react';
import { Dices, Home, Gamepad2, Calendar, MessageCircle } from 'lucide-react';

export type TabType = 'home' | 'games' | 'meetups';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenJoin: () => void;
}

export function Header({ activeTab, onTabChange, onOpenJoin }: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40" id="app-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - clicking navigates to Home on mobile and desktop */}
          <button
            id="header-logo-btn"
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Go to Home"
          >
            <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-800 transition-colors">
              <Dices className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-neutral-900 font-sans group-hover:text-neutral-700 transition-colors leading-tight">
                Board Game Society
              </h1>
            </div>
          </button>

          {/* Desktop Navigation Tabs (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2" id="desktop-nav">
            <button
              id="tab-home-desktop"
              onClick={() => onTabChange('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              id="tab-games-desktop"
              onClick={() => onTabChange('games')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'games'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Games</span>
            </button>

            <button
              id="tab-meetups-desktop"
              onClick={() => onTabChange('meetups')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'meetups'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Meetups</span>
            </button>

            <button
              id="tab-join-desktop"
              onClick={onOpenJoin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors ml-1 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
