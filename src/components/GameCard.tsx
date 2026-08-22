import React from 'react';
import { Users, Clock, Star, Dices } from 'lucide-react';
import { BoardGame } from '../types';

export interface GameCardProps {
  key?: React.Key;
  game: BoardGame;
  onSelect: (game: BoardGame) => void;
}

export function GameCard({ game, onSelect }: GameCardProps) {
  const isParag = game.ownerType === 'parag';
  const isDharitri = game.ownerType === 'dharitri';

  const ownerDotColor = isParag
    ? 'bg-neutral-900'
    : isDharitri
    ? 'bg-emerald-600'
    : 'bg-purple-600';

  let players = '2-4';
  if (game.minPlayers && game.maxPlayers) {
    players = game.minPlayers === game.maxPlayers ? `${game.minPlayers}p` : `${game.minPlayers}-${game.maxPlayers}p`;
  }

  let duration = '30m';
  if (game.playingTime) {
    duration = `${game.playingTime}m`;
  } else if (game.minPlayTime && game.maxPlayTime) {
    duration = `${game.minPlayTime}-${game.maxPlayTime}m`;
  }

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onSelect(game)}
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Thumbnail / Image Banner */}
        <div className="w-full aspect-square bg-neutral-100 overflow-hidden relative flex items-center justify-center border-b border-neutral-100">
          {game.thumbnail || game.image ? (
            <img
              src={game.thumbnail || game.image}
              alt={game.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <Dices className="w-10 h-10 text-neutral-300" />
          )}

          {/* Rating Badge */}
          {game.bggRating && (
            <div className="absolute top-2.5 right-2.5 bg-neutral-900/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{game.bggRating}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-3.5 space-y-2">
          <h3
            className="text-sm font-bold text-neutral-900 tracking-tight line-clamp-1 group-hover:text-neutral-700 transition-colors"
            title={game.name}
          >
            {game.name}
          </h3>

          {/* Meta stats */}
          <div className="flex items-center gap-3 pt-1 text-xs text-neutral-600 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              {players}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {duration}
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Owner */}
      <div className="px-3.5 py-2.5 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 truncate">
          {game.owners && game.owners.length > 1 ? (
            <div className="flex items-center gap-2 truncate">
              {game.owners.map((o, idx) => {
                const dotColor = o.ownerType === 'parag' ? 'bg-neutral-900' : o.ownerType === 'dharitri' ? 'bg-emerald-600' : 'bg-purple-600';
                return (
                  <span key={idx} className="inline-flex items-center gap-1 font-medium text-neutral-700 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />
                    <span className="truncate">{o.name.replace(/\s*\(reachparag\)/i, '')}</span>
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 truncate">
              <span className={`w-1.5 h-1.5 rounded-full ${ownerDotColor}`} />
              <span className="truncate">{game.owner}</span>
            </span>
          )}
        </div>
        {game.yearPublished && (
          <span className="text-[11px] text-neutral-400 font-mono shrink-0 ml-2">
            {game.yearPublished}
          </span>
        )}
      </div>
    </div>
  );
}

