import React from 'react';
import { Search, X } from 'lucide-react';
import { OwnerFilter } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  ownerFilter: OwnerFilter;
  onOwnerFilterChange: (val: OwnerFilter) => void;
  totalGamesCount?: number;
  filteredGamesCount?: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  ownerFilter,
  onOwnerFilterChange,
  totalGamesCount,
  filteredGamesCount,
}: FilterBarProps) {
  const isFiltered = Boolean(searchQuery.trim() || ownerFilter !== 'all');

  return (
    <div className="bg-white border-b border-neutral-200 py-3" id="filters-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search and Play at in the same line */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 sm:max-w-2xl">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
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
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Play at: Parag / Dharitri */}
          <div className="flex items-center gap-1.5 shrink-0" id="filter-play-at">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              </span>
            <div className="inline-flex rounded-lg bg-neutral-100 p-0.5 border border-neutral-200/80">
              <button
                type="button"
                id="filter-owner-all"
                onClick={() => onOwnerFilterChange('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  ownerFilter === 'all'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Anywhere
              </button>
              <button
                type="button"
                id="filter-owner-parag"
                onClick={() => onOwnerFilterChange('parag')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  ownerFilter === 'parag'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Parag
              </button>
              <button
                type="button"
                id="filter-owner-dharitri"
                onClick={() => onOwnerFilterChange('dharitri')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  ownerFilter === 'dharitri'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Dharitri
              </button>
            </div>
          </div>
        </div>

        {/* Games count indicator */}
        {totalGamesCount !== undefined && (
          <div className="text-xs text-neutral-500 font-medium shrink-0">
            {isFiltered
              ? `Showing ${filteredGamesCount} of ${totalGamesCount} games`
              : `${totalGamesCount} games in library`}
          </div>
        )}
      </div>
    </div>
  );
}
