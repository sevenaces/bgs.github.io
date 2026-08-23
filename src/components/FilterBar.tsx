import React from 'react';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  totalGamesCount?: number;
  filteredGamesCount?: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  totalGamesCount,
  filteredGamesCount,
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-neutral-200 py-3" id="filters-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="input-search-games"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search game by name..."
            className="w-full pl-9 pr-9 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all text-neutral-900 placeholder:text-neutral-400"
          />
          {searchQuery && (
            <button
              id="btn-clear-search"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Games count indicator */}
        {totalGamesCount !== undefined && (
          <div className="text-xs text-neutral-500 font-medium">
            {searchQuery
              ? `Showing ${filteredGamesCount} of ${totalGamesCount} games`
              : `${totalGamesCount} games in library`}
          </div>
        )}
      </div>
    </div>
  );
}


