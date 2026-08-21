import React from 'react';
import { Sparkles } from 'lucide-react';
import { BoardGame } from '../types';

export interface GameCardProps {
  key?: React.Key;
  game: BoardGame;
  isFeatured?: boolean;
}

export function GameCard({ game, isFeatured }: GameCardProps) {
  if (isFeatured) {
    return (
      <div
        id={`game-card-${game.id}`}
        className="sm:col-span-2 bg-neutral-900 text-white rounded border border-neutral-900 p-4 sm:p-5 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider">Game of the Week</span>
          </div>
          <h3
            className="text-lg sm:text-xl font-bold text-white font-sans tracking-tight"
            title={game.name}
          >
            {game.name}
          </h3>
        </div>

        {game.owner && (
          <span className="text-[11px] text-neutral-400 font-normal mt-3 block">
            {game.owner}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      id={`game-card-${game.id}`}
      className="bg-white rounded border border-neutral-200 p-3.5 flex flex-col justify-between hover:border-neutral-400 transition-colors"
    >
      <h3
        className="text-sm font-semibold text-neutral-900 font-sans tracking-tight"
        title={game.name}
      >
        {game.name}
      </h3>

      {game.owner && (
        <span className="text-[11px] text-neutral-400 font-normal mt-1.5 block">
          {game.owner}
        </span>
      )}
    </div>
  );
}
