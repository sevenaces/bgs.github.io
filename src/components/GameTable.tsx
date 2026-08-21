import { Users, Clock, Star, ExternalLink, Dices } from 'lucide-react';
import { BoardGame } from '../types';

interface GameTableProps {
  games: BoardGame[];
  onSelect: (game: BoardGame) => void;
}

export function GameTable({ games, onSelect }: GameTableProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded border border-neutral-200 overflow-hidden" id="games-table-container">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-700" id="games-table">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3.5 w-10 text-center font-medium">#</th>
              <th className="py-2.5 px-3.5 font-medium">Game Title</th>
              <th className="py-2.5 px-3.5 font-medium">Owner</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap font-medium">Players</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap font-medium">Duration</th>
              <th className="py-2.5 px-3.5 text-center font-medium">Year</th>
              <th className="py-2.5 px-3.5 text-center font-medium">Rating</th>
              <th className="py-2.5 px-3.5 text-right font-medium">Links</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-sans">
            {games.map((game, idx) => {
              const isParag = game.ownerType === 'parag';
              const isDharitri = game.ownerType === 'dharitri';

              const ownerDotColor = isParag
                ? 'bg-neutral-900'
                : isDharitri
                ? 'bg-emerald-600'
                : 'bg-purple-600';

              let players = '2-4';
              if (game.minPlayers && game.maxPlayers) {
                players = game.minPlayers === game.maxPlayers ? `${game.minPlayers}` : `${game.minPlayers} - ${game.maxPlayers}`;
              }

              let duration = '30m';
              if (game.playingTime) {
                duration = `${game.playingTime}m`;
              } else if (game.minPlayTime && game.maxPlayTime) {
                duration = `${game.minPlayTime}-${game.maxPlayTime}m`;
              }

              return (
                <tr
                  key={game.id}
                  onClick={() => onSelect(game)}
                  className="hover:bg-neutral-50 transition-colors cursor-pointer group"
                >
                  {/* Row Number */}
                  <td className="py-2.5 px-3.5 text-center text-neutral-400 text-[11px]">
                    {idx + 1}
                  </td>

                  {/* Title & Category */}
                  <td className="py-2.5 px-3.5 font-medium text-neutral-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-neutral-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-neutral-200">
                        {game.thumbnail || game.image ? (
                          <img
                            src={game.thumbnail || game.image}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <Dices className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900 group-hover:text-black transition-colors block">
                          {game.name}
                        </span>
                        {game.categories && game.categories.length > 0 && (
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            {game.categories.slice(0, 2).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="py-2.5 px-3.5">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-50 text-neutral-900 border border-neutral-200">
                        <span className={`w-1.5 h-1.5 rounded-full ${ownerDotColor}`} />
                        {game.owner}
                      </span>
                      {game.ownerNote && (
                        <span className="text-[10px] text-neutral-500">
                          📍 {game.ownerNote}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Players */}
                  <td className="py-2.5 px-3.5 whitespace-nowrap text-[11px] text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3 text-neutral-400" />
                      {players}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="py-2.5 px-3.5 whitespace-nowrap text-[11px] text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {duration}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="py-2.5 px-3.5 text-center text-neutral-500 text-[11px]">
                    {game.yearPublished || '—'}
                  </td>

                  {/* Rating */}
                  <td className="py-2.5 px-3.5 text-center">
                    {game.bggRating ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-neutral-800 text-[11px]">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        {game.bggRating}
                      </span>
                    ) : (
                      <span className="text-neutral-300 text-xs">—</span>
                    )}
                  </td>

                  {/* External Links */}
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    {game.bggId ? (
                      <a
                        href={`https://boardgamegeek.com/boardgame/${game.bggId}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                        title="BoardGameGeek link"
                      >
                        BGG
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-neutral-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
