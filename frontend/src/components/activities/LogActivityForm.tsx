import React, { useState, useMemo } from 'react';
import { Calendar, ArrowRight, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import type { Sport } from '../../types/activity';
import { useCreateActivity } from '../../hooks/useActivities';
import { calculateSportPoints, SPORT_LABELS, SPORT_METRIC_MAP } from '../../utils/scoring';

interface LogActivityFormProps {
  onSuccess?: () => void;
}

const AVAILABLE_SPORTS: { value: Sport; label: string }[] = [
  { value: 'RUNNING', label: 'Running' },
  { value: 'WALKING', label: 'Walking' },
  { value: 'CYCLING', label: 'Cycling' },
  { value: 'SWIMMING', label: 'Swimming' },
  { value: 'GYM', label: 'Gym' },
  { value: 'DAILY_STEPS', label: 'Daily Steps' },
];

export const LogActivityForm: React.FC<LogActivityFormProps> = ({ onSuccess }) => {
  const [sport, setSport] = useState<Sport>('RUNNING');
  const [distanceKm, setDistanceKm] = useState<string>('5.5');
  const [durationMinutes, setDurationMinutes] = useState<string>('0');
  const [steps, setSteps] = useState<string>('5000');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const createActivityMutation = useCreateActivity();

  const metricCategory = SPORT_METRIC_MAP[sport];

  // Calculate live preview points
  const parsedDistance = parseFloat(distanceKm) || 0;
  const parsedDuration = parseFloat(durationMinutes) || 0;
  const parsedSteps = parseInt(steps, 10) || 0;

  const estimatedPoints = useMemo(() => {
    return calculateSportPoints(sport, {
      distanceKm: parsedDistance,
      durationMinutes: parsedDuration,
      steps: parsedSteps,
    });
  }, [sport, parsedDistance, parsedDuration, parsedSteps]);

  // Preview label text
  const previewText = useMemo(() => {
    const sportName = SPORT_LABELS[sport] || sport;
    if (metricCategory === 'distance') {
      return `${parsedDistance} km ${sportName}`;
    }
    if (metricCategory === 'duration') {
      return `${parsedDuration} min ${sportName}`;
    }
    if (metricCategory === 'steps') {
      return `${parsedSteps.toLocaleString()} Steps`;
    }
    return sportName;
  }, [sport, metricCategory, parsedDistance, parsedDuration, parsedSteps]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Validate inputs
    if (metricCategory === 'distance' && (!parsedDistance || parsedDistance <= 0)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid distance greater than 0.' });
      return;
    }
    if (metricCategory === 'duration' && (!parsedDuration || parsedDuration <= 0)) {
      setStatusMessage({ type: 'error', text: 'Please enter a duration in minutes greater than 0.' });
      return;
    }
    if (metricCategory === 'steps' && (!parsedSteps || parsedSteps <= 0)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid step count greater than 0.' });
      return;
    }

    try {
      const payload: {
        sport: Sport;
        distanceKm?: number;
        durationSeconds?: number;
        steps?: number;
        recordedAt?: string;
      } = {
        sport,
      };

      if (metricCategory === 'distance') {
        payload.distanceKm = parsedDistance;
      } else if (metricCategory === 'duration') {
        // Backend expects duration in seconds
        payload.durationSeconds = Math.round(parsedDuration * 60);
      } else if (metricCategory === 'steps') {
        payload.steps = parsedSteps;
      }

      if (date) {
        // Construct ISO date string with current time
        const selectedDate = new Date(date);
        const now = new Date();
        selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        payload.recordedAt = selectedDate.toISOString();
      }

      await createActivityMutation.mutateAsync(payload);

      setStatusMessage({
        type: 'success',
        text: `Logged ${previewText} (+${estimatedPoints} PTS)!`,
      });

      // Reset form slightly for next entry
      if (metricCategory === 'distance') setDistanceKm('5.0');
      if (metricCategory === 'duration') setDurationMinutes('30');
      if (metricCategory === 'steps') setSteps('5000');

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to record activity';
      setStatusMessage({ type: 'error', text: msg });
    }
  };

  return (
    <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[#262626] mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
          Log Activity
        </h2>
        <div className="text-[#9fa38c] p-1.5 rounded-lg bg-[#201f1f] border border-[#2e2e2e]">
          <Calendar size={18} />
        </div>
      </div>

      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 size={16} className="shrink-0" />
          ) : (
            <AlertCircle size={16} className="shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Activity Type Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="activity-type"
            className="block text-xs font-semibold text-[#8e9379] uppercase tracking-wider"
          >
            Activity Type
          </label>
          <div className="relative">
            <select
              id="activity-type"
              value={sport}
              onChange={(e) => setSport(e.target.value as Sport)}
              className="w-full appearance-none bg-[#201f1f] border border-[#2a2a2a] focus:border-[#c3f400] text-white font-medium text-sm rounded-xl px-4 py-3 pr-10 outline-none transition-colors cursor-pointer"
            >
              {AVAILABLE_SPORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#1c1b1b] text-white">
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e9379] pointer-events-none"
            />
          </div>
        </div>

        {/* Dynamic Metric Inputs */}
        {metricCategory === 'distance' ? (
          <div className="grid grid-cols-2 gap-3">
            {/* Distance input */}
            <div className="space-y-1.5">
              <label
                htmlFor="activity-distance"
                className="block text-xs font-semibold text-[#8e9379] uppercase tracking-wider"
              >
                Distance
              </label>
              <div className="relative flex items-center">
                <input
                  id="activity-distance"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                  placeholder="5.5"
                  className="w-full bg-[#201f1f] border border-[#2a2a2a] focus:border-[#c3f400] text-white text-sm font-medium rounded-xl px-4 py-3 pr-12 outline-none transition-colors"
                />
                <span className="absolute right-3.5 text-xs font-semibold text-[#8e9379] pointer-events-none">
                  km
                </span>
              </div>
            </div>

            {/* Optional Duration input */}
            <div className="space-y-1.5">
              <label
                htmlFor="activity-duration"
                className="block text-xs font-semibold text-[#8e9379] uppercase tracking-wider"
              >
                Duration
              </label>
              <div className="relative flex items-center">
                <input
                  id="activity-duration"
                  type="number"
                  min="0"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#201f1f] border border-[#2a2a2a] focus:border-[#c3f400] text-white text-sm font-medium rounded-xl px-4 py-3 pr-12 outline-none transition-colors"
                />
                <span className="absolute right-3.5 text-xs font-semibold text-[#8e9379] pointer-events-none">
                  min
                </span>
              </div>
            </div>
          </div>
        ) : metricCategory === 'duration' ? (
          <div className="space-y-1.5">
            <label
              htmlFor="activity-duration-only"
              className="block text-xs font-semibold text-[#8e9379] uppercase tracking-wider"
            >
              Duration
            </label>
            <div className="relative flex items-center">
              <input
                id="activity-duration-only"
                type="number"
                min="1"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="45"
                className="w-full bg-[#201f1f] border border-[#2a2a2a] focus:border-[#c3f400] text-white text-sm font-medium rounded-xl px-4 py-3 pr-12 outline-none transition-colors"
              />
              <span className="absolute right-3.5 text-xs font-semibold text-[#8e9379] pointer-events-none">
                min
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <label
              htmlFor="activity-steps"
              className="block text-xs font-semibold text-[#8e9379] uppercase tracking-wider"
            >
              Steps Count
            </label>
            <div className="relative flex items-center">
              <input
                id="activity-steps"
                type="number"
                min="100"
                step="100"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="8000"
                className="w-full bg-[#201f1f] border border-[#2a2a2a] focus:border-[#c3f400] text-white text-sm font-medium rounded-xl px-4 py-3 pr-14 outline-none transition-colors"
              />
              <span className="absolute right-3.5 text-xs font-semibold text-[#8e9379] pointer-events-none">
                steps
              </span>
            </div>
          </div>
        )}

        {/* Date Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="activity-date"
            className="block text-xs font-semibold text-[#8e9379] uppercase tracking-wider"
          >
            Date
          </label>
          <div className="relative flex items-center">
            <input
              id="activity-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#201f1f] border border-[#2a2a2a] focus:border-[#c3f400] text-white text-sm font-medium rounded-xl px-4 py-3 outline-none transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Preview Box */}
        <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2e2e2e] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#8e9379] block uppercase tracking-wider">
              Preview
            </span>
            <span className="text-sm font-bold text-white truncate font-display">
              {previewText}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-right">
            <span className="text-lg font-bold text-white">=</span>
            <span className="text-xl sm:text-2xl font-black text-[#c3f400] font-display tracking-tight">
              {estimatedPoints.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#c3f400] font-display">PTS</span>
          </div>
        </div>

        {/* Submit Activity Button */}
        <button
          type="submit"
          disabled={createActivityMutation.isPending}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#c3f400] hover:bg-[#abd600] active:scale-[0.99] disabled:opacity-50 text-[#161e00] font-bold text-sm shadow-[0_0_20px_rgba(195,244,0,0.3)] hover:shadow-[0_0_28px_rgba(195,244,0,0.5)] transition-all duration-200 cursor-pointer"
        >
          {createActivityMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-[#161e00] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Submit Activity</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
