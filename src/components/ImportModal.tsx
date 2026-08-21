import React, { useState } from 'react';
import { X, FileSpreadsheet, UploadCloud, Check } from 'lucide-react';
import { BoardGame } from '../types';
import { parseSheetCsv } from '../services/gameService';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (games: BoardGame[]) => void;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [csvText, setCsvText] = useState('');
  const [defaultOwner, setDefaultOwner] = useState<'dharitri' | 'parag' | 'other'>('dharitri');
  const [successCount, setSuccessCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleProcess = () => {
    if (!csvText.trim()) return;

    let parsed = parseSheetCsv(csvText);

    // Apply owner if needed
    if (defaultOwner === 'parag') {
      parsed = parsed.map(g => ({ ...g, owner: 'Parag (reachparag)', ownerType: 'parag', source: 'bgg' }));
    }

    if (parsed.length > 0) {
      setSuccessCount(parsed.length);
      onImport(parsed);
      setTimeout(() => {
        setSuccessCount(null);
        setCsvText('');
        onClose();
      }, 1000);
    }
  };

  return (
    <div
      id="import-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="import-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded border border-neutral-200 max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-neutral-900 text-white flex items-center justify-center">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-sans">Import from Sheet or CSV</h3>
              <p className="text-xs text-neutral-500">Paste spreadsheet rows to add games quickly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-neutral-800 mb-1">
              Default Owner for these games:
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDefaultOwner('dharitri')}
                className={`py-1.5 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  defaultOwner === 'dharitri'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Dharitri Cafe
              </button>
              <button
                type="button"
                onClick={() => setDefaultOwner('parag')}
                className={`py-1.5 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  defaultOwner === 'parag'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Parag (reachparag)
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium text-neutral-800 mb-1">
              Paste CSV or Table Rows (Name, Players, Time, Note)
            </label>
            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={`Example:\nCatan, 3-4, 75, Shelf A\nTicket to Ride, 2-5, 45, Shelf B\nCodenames, 2-8, 15, Party Games`}
              className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          {successCount !== null && (
            <div className="p-2.5 bg-neutral-900 text-white rounded flex items-center gap-2 text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Successfully imported {successCount} games!</span>
            </div>
          )}

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProcess}
              disabled={!csvText.trim()}
              className="px-4 py-1.5 rounded font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50 text-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Import Rows
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
