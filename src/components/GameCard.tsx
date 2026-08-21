import React from 'react';
import { BoardGame } from '../types';

export interface GameCardProps {
  key?: React.Key;
  game: BoardGame;
}

export function GameCard({ game }: GameCardProps) {
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
