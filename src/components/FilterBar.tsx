import React from 'react';
import { Search, LayoutGrid, Table, X } from 'lucide-react';
import { ViewMode } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-neutral-200 py-3" id="filters-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="input-search-games"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search game by name..."
            className="w-full pl-9 pr-9 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all text-neutral-900 placeholder:text-neutral-400"
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

        {/* View Mode Toggle */}
        <div className="flex items-center bg-neutral-100 p-0.5 rounded border border-neutral-200 self-end sm:self-auto" id="view-mode-toggle">
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
  );
}

