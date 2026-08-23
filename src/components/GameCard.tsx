import React from 'react';
import { Star, Dices, MessageCircle } from 'lucide-react';
import { BoardGame } from '../types';
import { trackEvent } from '../lib/analytics';

export interface GameCardProps {
  key?: React.Key;
  game: BoardGame;
  onSelectGame?: (game: BoardGame) => void;
}

export function GameCard({ game, onSelectGame }: GameCardProps) {
  const isParag = game.ownerType === 'parag';
  const isDharitri = game.ownerType === 'dharitri';

  const ownerDotColor = isParag
    ? 'bg-neutral-900'
    : isDharitri
    ? 'bg-emerald-600'
    : 'bg-purple-600';

  const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/J8JQz88u0lL0AFTniFGLbk';

  const handleFindPlayersClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('find_players_click', {
      game_name: game.name,
      game_id: game.id,
      view: 'grid',
    });
  };

  const handleCardClick = () => {
    if (onSelectGame) {
      onSelectGame(game);
    }
  };

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Thumbnail / Image */}
        <div className="w-full aspect-square bg-neutral-100 overflow-hidden relative flex items-center justify-center border-b border-neutral-100">
          {game.thumbnail || game.image ? (
            <img
              src={game.thumbnail || game.image}
              alt={game.name}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <Dices className="w-10 h-10 text-neutral-300" />
          )}

          {/* Rating Badge */}
          {game.bggRating && (
            <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-neutral-900/90 backdrop-blur-xs text-white px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold flex items-center gap-0.5 sm:gap-1 shadow-xs">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
              <span>{game.bggRating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2.5 sm:p-3.5 space-y-1.5 sm:space-y-2">
          <div className="flex items-start justify-between gap-1.5 sm:gap-2">
            <h3
              className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight line-clamp-1 group-hover:text-emerald-700 transition-colors"
              title={game.name}
            >
              {game.name}
            </h3>
            {game.yearPublished && (
              <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono shrink-0">
                {game.yearPublished}
              </span>
            )}
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-600 truncate">
            {game.owners && game.owners.length > 1 ? (
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
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
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-2.5 sm:p-3.5 pt-0">
        <a
          id={`btn-find-players-${game.id}`}
          href={WHATSAPP_GROUP_URL}
          onClick={handleFindPlayersClick}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 hover:text-neutral-900 border border-neutral-200 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap"
        >
          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
          <span>Find players</span>
        </a>
      </div>
    </div>
  );
}
