import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import type { Activity } from '../../types/activity';
import { SPORT_LABELS } from '../../utils/scoring';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  activity: Activity | null;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  activity,
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen || !activity) return null;

  const sportName = SPORT_LABELS[activity.sport] || activity.sport;
  const valueDisplay =
    activity.unit === 'KM'
      ? `${Number(activity.value).toFixed(1)} km`
      : activity.unit === 'MINUTES'
      ? `${Math.round(activity.value)} min`
      : `${Number(activity.value).toLocaleString()} steps`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => {
          if (!isLoading) onClose();
        }}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 space-y-6 animate-scaleIn">
        {/* Close Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8e9379] hover:text-white hover:bg-[#201f1f] transition-colors cursor-pointer disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Warning Icon & Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">Delete Activity?</h3>
            <p className="text-sm text-[#9fa38c] mt-1">
              This action cannot be undone. All points earned from this workout will be removed.
            </p>
          </div>
        </div>

        {/* Activity Details Preview Pill */}
        <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2e2e2e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-[#c3f400]">
              <Trash2 size={16} />
            </div>
            <div>
              <span className="text-sm font-bold text-white font-display block">
                {sportName}
              </span>
              <span className="text-xs text-[#9fa38c]">{valueDisplay}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-[#c3f400] font-display">
              +{activity.points.toLocaleString()} PTS
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] text-[#9fa38c] hover:text-white border border-[#2a2a2a] text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white text-sm font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete Activity</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
