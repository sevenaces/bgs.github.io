import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { BoardGame } from '../types';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: BoardGame) => void;
}

export function AddGameModal({ isOpen, onClose, onAddGame }: AddGameModalProps) {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState<'parag' | 'dharitri' | 'other'>('parag');
  const [customOwnerName, setCustomOwnerName] = useState('');
  const [ownerNote, setOwnerNote] = useState('');
  const [minPlayers, setMinPlayers] = useState('2');
  const [maxPlayers, setMaxPlayers] = useState('4');
  const [playingTime, setPlayingTime] = useState('45');
  const [yearPublished, setYearPublished] = useState('');
  const [categories, setCategories] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bggId, setBggId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let finalOwner = 'Parag (reachparag)';
    let finalOwnerType: 'parag' | 'dharitri' | 'member' | 'other' = 'parag';

    if (owner === 'dharitri') {
      finalOwner = 'Dharitri Cafe';
      finalOwnerType = 'dharitri';
    } else if (owner === 'other') {
      finalOwner = customOwnerName.trim() || 'Society Member';
      finalOwnerType = 'member';
    }

    const newGame: BoardGame = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      owner: finalOwner,
      ownerType: finalOwnerType,
      ownerNote: ownerNote.trim() || undefined,
      minPlayers: parseInt(minPlayers, 10) || 2,
      maxPlayers: parseInt(maxPlayers, 10) || 4,
      playingTime: parseInt(playingTime, 10) || 30,
      yearPublished: yearPublished ? parseInt(yearPublished, 10) : undefined,
      categories: categories.split(',').map(c => c.trim()).filter(Boolean),
      image: imageUrl.trim() || undefined,
      bggId: bggId.trim() || undefined,
      source: 'custom',
    };

    onAddGame(newGame);
    onClose();
    // Reset form
    setName('');
    setCustomOwnerName('');
    setOwnerNote('');
    setImageUrl('');
    setBggId('');
  };

  return (
    <div
      id="add-game-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="add-game-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded border border-neutral-200 max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-neutral-900 text-white flex items-center justify-center">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-sans">Add Board Game</h3>
              <p className="text-xs text-neutral-500">Add a new title to the collection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          
          {/* Game Title */}
          <div>
            <label className="block font-medium text-neutral-800 mb-1">
              Game Title <span className="text-red-500">*</span>
            </label>
            <input
              id="input-game-title"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dune: Imperium, Cascadia, Azul..."
              className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded focus:outline-hidden focus:border-neutral-900 focus:bg-white"
            />
          </div>

          {/* Owner Selection */}
          <div>
            <label className="block font-medium text-neutral-800 mb-1">Owner</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOwner('parag')}
                className={`py-1.5 px-2 rounded border text-center text-[11px] font-medium transition-all cursor-pointer ${
                  owner === 'parag'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Parag (BGG)
              </button>
              <button
                type="button"
                onClick={() => setOwner('dharitri')}
                className={`py-1.5 px-2 rounded border text-center text-[11px] font-medium transition-all cursor-pointer ${
                  owner === 'dharitri'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Dharitri Cafe
              </button>
              <button
                type="button"
                onClick={() => setOwner('other')}
                className={`py-1.5 px-2 rounded border text-center text-[11px] font-medium transition-all cursor-pointer ${
                  owner === 'other'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Other
              </button>
            </div>
          </div>

          {owner === 'other' && (
            <div>
              <label className="block font-medium text-neutral-800 mb-1">Owner Name</label>
              <input
                type="text"
                value={customOwnerName}
                onChange={(e) => setCustomOwnerName(e.target.value)}
                placeholder="e.g. Alex, Maya, Rahul..."
                className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded focus:outline-hidden focus:border-neutral-900"
              />
            </div>
          )}

          {/* Location / Note */}
          <div>
            <label className="block font-medium text-neutral-800 mb-1">Shelf Location or Note</label>
            <input
              type="text"
              value={ownerNote}
              onChange={(e) => setOwnerNote(e.target.value)}
              placeholder="e.g. Cafe Shelf A2, Sleeve protected, Expansion included"
              className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          {/* Players & Playtime */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-medium text-neutral-800 mb-1 text-[11px]">Min Players</label>
              <input
                type="number"
                min="1"
                max="99"
                value={minPlayers}
                onChange={(e) => setMinPlayers(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1 text-[11px]">Max Players</label>
              <input
                type="number"
                min="1"
                max="99"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1 text-[11px]">Play Time (min)</label>
              <input
                type="number"
                min="5"
                step="5"
                value={playingTime}
                onChange={(e) => setPlayingTime(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded"
              />
            </div>
          </div>

          {/* Categories & BGG ID */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-neutral-800 mb-1">Categories (comma separated)</label>
              <input
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="Strategy, Card Game"
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1">BGG ID (optional)</label>
              <input
                type="text"
                value={bggId}
                onChange={(e) => setBggId(e.target.value)}
                placeholder="e.g. 13"
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Add to Collection
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
