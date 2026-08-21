import React from 'react';
import { Search, SlidersHorizontal, LayoutGrid, Table, X, ArrowUpDown } from 'lucide-react';
import { OwnerFilter, ViewMode, SortOption } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  ownerFilter: OwnerFilter;
  onOwnerFilterChange: (owner: OwnerFilter) => void;
  playerFilter: string;
  onPlayerFilterChange: (val: string) => void;
  timeFilter: string;
  onTimeFilterChange: (val: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  counts: {
    all: number;
    parag: number;
    dharitri: number;
    other: number;
  };
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  ownerFilter,
  onOwnerFilterChange,
  playerFilter,
  onPlayerFilterChange,
  timeFilter,
  onTimeFilterChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  counts,
  hasActiveFilters,
  onResetFilters,
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-neutral-200 py-3.5" id="filters-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Top Row: Owner Pills & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Owner Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none" id="owner-filter-tabs">
            <button
              id="filter-owner-all"
              onClick={() => onOwnerFilterChange('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                ownerFilter === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              All Owners ({counts.all})
            </button>

            <button
              id="filter-owner-parag"
              onClick={() => onOwnerFilterChange('parag')}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                ownerFilter === 'parag'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${ownerFilter === 'parag' ? 'bg-white' : 'bg-neutral-900'}`} />
              Parag ({counts.parag})
            </button>

            <button
              id="filter-owner-dharitri"
              onClick={() => onOwnerFilterChange('dharitri')}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                ownerFilter === 'dharitri'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${ownerFilter === 'dharitri' ? 'bg-white' : 'bg-emerald-600'}`} />
              Dharitri Cafe ({counts.dharitri})
            </button>

            {counts.other > 0 && (
              <button
                id="filter-owner-other"
                onClick={() => onOwnerFilterChange('other')}
                className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  ownerFilter === 'other'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200'
                }`}
              >
                Other Members ({counts.other})
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="input-search-games"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by game name, category, or note..."
              className="w-full pl-9 pr-9 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all text-neutral-900 placeholder:text-neutral-400"
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

        </div>

        {/* Bottom Row: Secondary Filters & View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Player Count Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500 font-medium hidden sm:inline">Players:</span>
              <select
                id="select-player-filter"
                value={playerFilter}
                onChange={(e) => onPlayerFilterChange(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded text-xs font-medium text-neutral-700 focus:outline-hidden focus:border-neutral-900 cursor-pointer"
              >
                <option value="all">Any Players</option>
                <option value="1">1 Player (Solo)</option>
                <option value="2">2 Players</option>
                <option value="3-4">3 - 4 Players</option>
                <option value="5+">5+ Players</option>
                <option value="party">Party (6+)</option>
              </select>
            </div>

            {/* Playtime Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500 font-medium hidden sm:inline">Time:</span>
              <select
                id="select-time-filter"
                value={timeFilter}
                onChange={(e) => onTimeFilterChange(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded text-xs font-medium text-neutral-700 focus:outline-hidden focus:border-neutral-900 cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="quick">Quick (&le; 20m)</option>
                <option value="medium">Medium (30 - 60m)</option>
                <option value="long">Long (60m+)</option>
              </select>
            </div>

            {/* Sort Option */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:inline" />
              <select
                id="select-sort-option"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded text-xs font-medium text-neutral-700 focus:outline-hidden focus:border-neutral-900 cursor-pointer"
              >
                <option value="name-asc">Name (A &rarr; Z)</option>
                <option value="name-desc">Name (Z &rarr; A)</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="playtime-asc">Shortest Time</option>
                <option value="players-asc">Fewest Players</option>
                <option value="year-desc">Newest Year</option>
              </select>
            </div>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                id="btn-reset-filters"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer border border-neutral-200"
              >
                <X className="w-3 h-3" />
                Clear Filters
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded border border-neutral-200" id="view-mode-toggle">
            <button
              id="btn-view-grid"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="btn-view-table"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
              title="Table View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
