import React from 'react';
import { MapPin, Calendar, Clock, Sparkles, MessageCircle, ArrowRight, Dices, ExternalLink, User } from 'lucide-react';
import { MeetupSession } from '../types';
import { extractGamesFromDescription, sortMeetupsLatestFirst } from '../data/meetups';
import { trackEvent } from '../lib/analytics';

interface HomeViewProps {
  meetups: MeetupSession[];
  onExploreGames: () => void;
  onOpenJoin: () => void;
  onExploreMeetups: () => void;
}

export function HomeView({ meetups, onExploreGames, onOpenJoin, onExploreMeetups }: HomeViewProps) {
  const lastMeetup = React.useMemo(() => sortMeetupsLatestFirst(meetups).slice(0, 1), [meetups]);

  return (
    <div id="home-view" className="max-w-3xl mx-auto space-y-9 animate-in fade-in duration-300">
      {/* Hero Welcome Section */}
      <section className="pt-2 pb-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans mb-1.5">
          Welcome to Board Game Society! 🎲
        </h2>
        <div className="flex items-center gap-1.5 text-sm text-neutral-500 font-medium mb-3">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span>North Bengaluru • Near Hebbal</span>
        </div>

        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6 font-normal">
          We gather weekly to play board games. Whether you&apos;re a complete beginner or a seasoned strategist, there&apos;s a seat at the table for you. Open to ages 18+. No experience required. Bring your enthusiasm, learn new games, and let&apos;s roll!
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            id="btn-home-join"
            onClick={() => {
              trackEvent('join_whatsapp_click', { source: 'hero' });
              onOpenJoin();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            Join WhatsApp Group
          </button>

          <button
            id="btn-home-explore-games"
            onClick={() => {
              trackEvent('explore_games_click', { source: 'hero' });
              onExploreGames();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-sm border border-neutral-200 transition-colors cursor-pointer"
          >
            Browse Game Library
            <ArrowRight className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-neutral-900" />
          <h3 className="text-base sm:text-lg font-bold text-neutral-900">Weekly Schedule</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Thursday */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4 flex flex-col justify-between hover:border-neutral-300 transition-colors">
            <h4 className="font-bold text-neutral-900 text-base">Thursday</h4>
            <div className="mt-3 pt-3 border-t border-neutral-100 space-y-1 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium text-neutral-800">8:00 PM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <a
                  href="https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-emerald-700 transition-colors text-neutral-700"
                >
                  Dharitri Cafe
                </a>
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4 flex flex-col justify-between hover:border-neutral-300 transition-colors">
            <h4 className="font-bold text-neutral-900 text-base">Saturday</h4>
            <div className="mt-3 pt-3 border-t border-neutral-100 space-y-1 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium text-neutral-800">4:00 PM – 6:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <a
                  href="https://maps.app.goo.gl/ycY4wVSU9cyQhRRM9"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-emerald-700 transition-colors text-neutral-700"
                >
                  Dharitri Cafe
                </a>
              </div>
            </div>
          </div>

          {/* Custom Plan */}
          <div className="bg-neutral-50 rounded-lg border border-dashed border-neutral-300 p-4 flex flex-col justify-between">
            <h4 className="font-bold text-neutral-900 text-base">Plan your own :)</h4>
            <div className="mt-3 pt-3 border-t border-neutral-200 text-xs text-neutral-600 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Ping the group anytime to coordinate impromptu sessions or specific games!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Meetups Section */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dices className="w-4 h-4 text-neutral-900" />
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">Recent Meetups</h3>
          </div>
          <button
            id="btn-home-view-all-meetups"
            onClick={() => {
              trackEvent('explore_meetups_click', { source: 'home_recent' });
              onExploreMeetups();
            }}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View all meetups</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        <div className="space-y-6">
          {lastMeetup.map((meetup) => {
            const gamesPlayedList =
              meetup.gamesPlayed && meetup.gamesPlayed.length > 0
                ? meetup.gamesPlayed
                : extractGamesFromDescription(meetup.description);

            const [day, month] = meetup.date.split(' ');

            return (
              <div
                key={meetup.id}
                id={`home-meetup-journal-${meetup.id}`}
                className="bg-white sm:bg-transparent rounded-xl sm:rounded-none border sm:border-0 border-neutral-200 p-4 sm:p-0 shadow-xs sm:shadow-none flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group transition-colors"
              >
                {/* Left Date Stamp Block (Hidden on mobile, shown on sm+) */}
                <div className="hidden sm:flex w-20 flex-shrink-0 flex-col items-center justify-center p-3 bg-neutral-100 rounded-xl border border-neutral-200 group-hover:border-neutral-300 transition-colors text-center">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    {month || 'AUG'}
                  </span>
                  <span className="text-3xl font-black text-neutral-900 leading-none my-0.5">
                    {day}
                  </span>
                </div>

                {/* Right Content Card */}
                <div className="flex-1 w-full bg-transparent sm:bg-white rounded-none sm:rounded-xl border-0 sm:border border-neutral-200 p-0 sm:p-6 shadow-none sm:shadow-xs space-y-4 sm:group-hover:border-neutral-300 transition-colors">
                  {/* Header: Date | Time | Host | Location */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pb-3 border-b border-neutral-100 text-xs sm:text-sm text-neutral-700">
                    {/* Mobile Date Badge */}
                    <div className="sm:hidden font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-xs">
                      {meetup.date}
                    </div>
                    <span className="sm:hidden text-neutral-300">|</span>

                    {/* Time (if available) */}
                    {meetup.time && (
                      <>
                        <div className="flex items-center gap-1.5 text-neutral-800 text-xs">
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
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 uppercase tracking-wider font-medium mr-1">
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

          {/* Join Next Meetup Card */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-emerald-900 text-base">Want to join our upcoming session?</h4>
              <p className="text-xs text-emerald-700">We host regular table games every Sunday & Thursday at Dharitri Cafe, Hebbal.</p>
            </div>
            <button
              id="btn-home-join-next-meetup"
              onClick={() => {
                trackEvent('join_whatsapp_click', { source: 'next_meetup_banner' });
                onOpenJoin();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs cursor-pointer flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Next Meetup</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
