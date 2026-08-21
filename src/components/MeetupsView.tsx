import React from 'react';
import { MapPin, Dices, MessageCircle, ExternalLink, Clock, User } from 'lucide-react';
import { MeetupSession, BoardGame } from '../types';
import { extractGamesFromDescription } from '../data/meetups';

interface MeetupsViewProps {
  meetups: MeetupSession[];
  games: BoardGame[];
  onOpenJoin: () => void;
  onSelectGame?: (gameName: string) => void;
}

export function MeetupsView({ meetups, onOpenJoin }: MeetupsViewProps) {
  return (
    <div id="meetups-view" className="max-w-3xl mx-auto space-y-7 animate-in fade-in duration-300">
      {/* Header Banner - Focus on Joining Next Session */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Meetup Recaps & Sessions</h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            A log of past games played in the community. Come join our next table!
          </p>
        </div>

        <button
          id="btn-meetup-join-whatsapp"
          onClick={onOpenJoin}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs cursor-pointer flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Join Next Session</span>
        </button>
      </div>

      {/* Recaps List */}
      <div className="space-y-6">
        {meetups.map((meetup) => {
          const gamesPlayedList =
            meetup.gamesPlayed && meetup.gamesPlayed.length > 0
              ? meetup.gamesPlayed
              : extractGamesFromDescription(meetup.description);

          const [day, month] = meetup.date.split(' ');

          return (
            <div
              key={meetup.id}
              id={`meetup-journal-${meetup.id}`}
              className="bg-white sm:bg-transparent rounded-xl sm:rounded-none border sm:border-0 border-neutral-200 p-4 sm:p-0 shadow-xs sm:shadow-none flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group transition-colors"
            >
              {/* Left Date Stamp Block (Hidden on mobile, shown on sm+) */}
              <div className="hidden sm:flex w-20 flex-shrink-0 flex-col items-center justify-center p-3 bg-neutral-100 rounded-xl border border-neutral-200 group-hover:border-neutral-300 transition-colors text-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  {month || 'AUG'}
                </span>
                <span className="text-3xl font-black text-neutral-900 leading-none my-0.5 font-mono">
                  {day}
                </span>
              </div>

              {/* Right Content Card (Unified card on mobile, inner card on desktop) */}
              <div className="flex-1 w-full bg-transparent sm:bg-white rounded-none sm:rounded-xl border-0 sm:border border-neutral-200 p-0 sm:p-6 shadow-none sm:shadow-xs space-y-4 sm:group-hover:border-neutral-300 transition-colors">
                {/* Header: Date (mobile only) | Time | Host | Location */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pb-3 border-b border-neutral-100 text-xs sm:text-sm text-neutral-700">
                  {/* Mobile Date Badge */}
                  <div className="sm:hidden font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-xs">
                    {meetup.date}
                  </div>
                  <span className="sm:hidden text-neutral-300">|</span>

                  {/* Time (if available) */}
                  {meetup.time && (
                    <>
                      <div className="flex items-center gap-1.5 text-neutral-800 font-mono text-xs">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{meetup.time}</span>
                      </div>
                      <span className="text-neutral-300">|</span>
                    </>
                  )}

                  {/* Host */}
                  <div className="flex items-center gap-1.5 text-neutral-800">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Host: <strong className="font-semibold text-neutral-900">{meetup.host}</strong></span>
                  </div>

                  <span className="text-neutral-300">|</span>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-neutral-800">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {meetup.locationUrl ? (
                      <a
                        href={meetup.locationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-neutral-900 hover:text-emerald-700 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                      >
                        {meetup.location}
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    ) : (
                      <span className="font-medium text-neutral-900">{meetup.location}</span>
                    )}
                  </div>
                </div>

                {/* Description / Story Text */}
                {meetup.description && (
                  <div className="text-neutral-800 text-sm leading-relaxed whitespace-pre-line font-normal space-y-2.5">
                    {meetup.description.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-neutral-800">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Games Played Section */}
                {gamesPlayedList.length > 0 && (
                  <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase tracking-wider font-medium mr-1">
                      <Dices className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Games Played:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {gamesPlayedList.map((game, gIdx) => (
                        <span
                          key={gIdx}
                          className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-900 text-xs font-medium border border-neutral-200"
                        >
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
