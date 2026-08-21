import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, MessageCircle, ExternalLink } from 'lucide-react';

interface JoinDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_LINK = 'https://chat.whatsapp.com/J8JQz88u0lL0AFTniFGLbk';

export function JoinDialog({ isOpen, onClose }: JoinDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(WHATSAPP_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="join-dialog-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="join-dialog-content"
        className="bg-white rounded-xl border border-neutral-200 max-w-md w-full p-6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-join-dialog"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
            <MessageCircle className="w-5 h-5 fill-emerald-600/10 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Join our Community</h2>
            <p className="text-xs text-neutral-500">WhatsApp Group</p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
          Join us so you can attend our next game event, catch up with fellow players, or talk about board games!
        </p>

        {/* QR Code */}
        <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg border border-neutral-200 mb-5">
          <div className="p-3 bg-white rounded border border-neutral-100 shadow-xs mb-2">
            <QRCodeSVG
              value={WHATSAPP_LINK}
              size={180}
              level="M"
              includeMargin={false}
            />
          </div>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Scan with your phone camera
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <a
            id="btn-open-whatsapp"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            Open WhatsApp Group
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            id="btn-copy-whatsapp-link"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-sm transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Link Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-600" />
                <span>Copy Invite Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
