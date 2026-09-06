import { useState } from 'react';
import { X, Users, Clock, Star, ExternalLink, Calendar, Dices, Tag } from 'lucide-react';
import { BoardGame } from '../types';

interface GameDetailModalProps {
  game: BoardGame | null;
  onClose: () => void;
}

export function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!game) return null;

  const isParag = game.ownerType === 'parag';
  const isDharitri = game.ownerType === 'dharitri';

  const ownerDotColor = isParag
    ? 'bg-neutral-900'
    : isDharitri
    ? 'bg-emerald-600'
    : 'bg-purple-600';

  let playersText = '2 - 4 Players';
  if (game.minPlayers && game.maxPlayers) {
    playersText = game.minPlayers === game.maxPlayers ? `${game.minPlayers} Players` : `${game.minPlayers} - ${game.maxPlayers} Players`;
  }

  let timeText = '30-45 mins';
  if (game.playingTime) {
    timeText = `${game.playingTime} mins`;
  } else if (game.minPlayTime && game.maxPlayTime) {
    timeText = `${game.minPlayTime} - ${game.maxPlayTime} mins`;
  }

  return (
    <div
      id="game-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="game-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded border border-neutral-200 max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header Image */}
        <div className="relative h-48 sm:h-56 bg-neutral-900 overflow-hidden flex items-center justify-center border-b border-neutral-200">
          {(game.thumbnail || game.image) && !imgError ? (
            <img
              src={game.thumbnail || game.image}
              alt={game.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-400">
              <Dices className="w-10 h-10 text-neutral-500 mb-2" />
              <span className="text-sm font-medium">{game.name}</span>
            </div>
          )}

          {/* Close Button */}
          <button
            id="btn-close-detail-modal"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded bg-white/90 text-neutral-900 border border-neutral-200 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Owner Overlay Badge */}
          <div className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-medium bg-white/95 text-neutral-900 border border-neutral-200 backdrop-blur-xs flex-wrap">
              <span>Play at:</span>
              {game.owners && game.owners.length > 1 ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {game.owners.map((o, idx) => {
                    const dotColor = o.ownerType === 'parag' ? 'bg-neutral-900' : o.ownerType === 'dharitri' ? 'bg-emerald-600' : 'bg-purple-600';
                    return (
                      <span key={idx} className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        {o.name.replace(/\s*\(reachparag\)/i, '')}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                  <span className={`w-1.5 h-1.5 rounded-full ${ownerDotColor}`} />
                  {game.owner}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Title & Ratings */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
                {game.name}
              </h2>
              {game.yearPublished && (
                <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" /> Published {game.yearPublished}
                </p>
              )}
            </div>

            {game.bggRating && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 text-white flex-shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <div className="text-right">
                  <div className="text-sm font-bold leading-none">{game.bggRating}</div>
                </div>
              </div>
            )}
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-50 border border-neutral-200">
              <Users className="w-4 h-4 text-neutral-500" />
              <div>
                <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Players</div>
                <div className="text-xs font-semibold text-neutral-900">{playersText}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-50 border border-neutral-200">
              <Clock className="w-4 h-4 text-neutral-500" />
              <div>
                <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Play Time</div>
                <div className="text-xs font-semibold text-neutral-900">{timeText}</div>
              </div>
            </div>
          </div>

          {/* Owner Note / Shelf Location */}
          {game.ownerNote && (
            <div className="p-3 rounded bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
              <span className="font-semibold text-neutral-900">Location / Note:</span> {game.ownerNote}
            </div>
          )}

          {/* Description */}
          {game.description && (
            <div className="space-y-1">
              <h4 className="text-[10px] uppercase tracking-widest text-neutral-400">About</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {game.description}
              </p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {game.bggId ? (
                <a
                  href={`https://boardgamegeek.com/boardgame/${game.bggId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white text-neutral-800 hover:bg-neutral-50 transition-colors border border-neutral-200"
                >
                  BoardGameGeek
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <a
                  href={`https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=${encodeURIComponent(game.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white text-neutral-800 hover:bg-neutral-50 transition-colors border border-neutral-200"
                >
                  Search on BGG
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <a
                href={game.videoUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${game.name} how to play board game`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white text-neutral-800 hover:bg-neutral-50 transition-colors border border-neutral-200"
              >
                How to Play
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
