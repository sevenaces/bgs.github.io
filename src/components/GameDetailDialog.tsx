import React from 'react';
import { Star, Dices, MessageCircle, MapPin, X } from 'lucide-react';
import { BoardGame } from '../types';
import { trackEvent } from '../lib/analytics';

interface GameDetailDialogProps {
  game: BoardGame | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GameDetailDialog({ game, isOpen, onClose }: GameDetailDialogProps) {
  if (!isOpen || !game) return null;

  const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/J8JQz88u0lL0AFTniFGLbk';

  const handleFindPlayersClick = () => {
    trackEvent('find_players_click', {
      game_name: game.name,
      game_id: game.id,
      view: 'dialog',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="game-detail-dialog"
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Header thumbnail area - showing full picture */}
        <div className="relative w-full bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-neutral-100 max-h-[60vh]">
          {game.thumbnail || game.image ? (
            <img
              src={game.thumbnail || game.image}
              alt={game.name}
              className="w-full h-auto max-h-[60vh] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="aspect-[16/9] w-full flex items-center justify-center">
              <Dices className="w-16 h-16 text-neutral-600" />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md z-10"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Rating badge */}
          {game.bggRating && (
            <div className="absolute bottom-3 left-3 bg-neutral-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md z-10">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{game.bggRating} BGG Rating</span>
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">{game.name}</h3>
              {game.yearPublished && (
                <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded shrink-0">
                  {game.yearPublished}
                </span>
              )}
            </div>

            {/* Play At / Owner Info */}
            <div className="mt-3 space-y-1.5">
              {game.owners && game.owners.length > 0 ? (
                game.owners.map((o, idx) => {
                  const ownerNameClean = o.name.replace(/\s*\(reachparag\)/i, '').trim();
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Play at: <strong className="font-semibold text-neutral-900">{ownerNameClean}</strong>
                        {o.note && <span className="text-neutral-500 ml-1 font-normal">({o.note})</span>}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Play at: <strong className="font-semibold text-neutral-900">{game.owner || 'Dharitri Cafe'}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description / Categories if available */}
          {game.description && (
            <div className="space-y-1 text-xs text-neutral-600">
              <h4 className="font-semibold uppercase tracking-wider text-neutral-500 text-[11px]">About</h4>
              <p className="line-clamp-4 leading-relaxed">{game.description}</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex items-center gap-3">
          <a
            id="btn-dialog-find-players"
            href={WHATSAPP_GROUP_URL}
            onClick={handleFindPlayersClick}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Find players for {game.name}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
