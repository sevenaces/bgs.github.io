import React from 'react';
import { Home, Gamepad2, Calendar, MessageCircle } from 'lucide-react';
import { TabType } from './Header';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenJoin: () => void;
}

export function BottomNav({ activeTab, onTabChange, onOpenJoin }: BottomNavProps) {
  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-3 py-1.5 shadow-lg"
    >
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        <button
          id="mobile-tab-home"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'home'
              ? 'text-neutral-900 bg-neutral-100 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${activeTab === 'home' ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
          <span>Home</span>
        </button>

        <button
          id="mobile-tab-games"
          onClick={() => onTabChange('games')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'games'
              ? 'text-neutral-900 bg-neutral-100 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Gamepad2 className={`w-5 h-5 mb-0.5 ${activeTab === 'games' ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
          <span>Games</span>
        </button>

        <button
          id="mobile-tab-meetups"
          onClick={() => onTabChange('meetups')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'meetups'
              ? 'text-neutral-900 bg-neutral-100 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Calendar className={`w-5 h-5 mb-0.5 ${activeTab === 'meetups' ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
          <span>Meetups</span>
        </button>

        <button
          id="mobile-tab-join"
          onClick={onOpenJoin}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 mb-0.5 stroke-[1.75]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <span>Join</span>
        </button>
      </div>
    </nav>
  );
}
