import React, { useState, useMemo } from 'react';
import { ActivityCard } from '../components/activities/ActivityCard';
import { LogActivityForm } from '../components/activities/LogActivityForm';
import { ConfirmDeleteModal } from '../components/common/ConfirmDeleteModal';
import { useActivities, useDeleteActivity } from '../hooks/useActivities';
import type { Activity, Sport } from '../types/activity';
import { Activity as ActivityIcon, AlertCircle, RefreshCw } from 'lucide-react';

type FilterType = 'ALL' | Sport;

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'RUNNING', label: 'Running' },
  { key: 'WALKING', label: 'Walking' },
  { key: 'CYCLING', label: 'Cycling' },
  { key: 'SWIMMING', label: 'Swimming' },
  { key: 'GYM', label: 'Gym' },
  { key: 'DAILY_STEPS', label: 'Daily Steps' },
];

export const ActivitiesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);

  const { data: activities, isLoading, isError, error, refetch } = useActivities();
  const deleteActivityMutation = useDeleteActivity();

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (!activities) return [];
    if (selectedFilter === 'ALL') return activities;
    return activities.filter((act) => act.sport === selectedFilter);
  }, [activities, selectedFilter]);

  const handleConfirmDelete = async () => {
    if (!activityToDelete) return;
    try {
      await deleteActivityMutation.mutateAsync(activityToDelete.id);
      setActivityToDelete(null);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Page Header */}
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          Activities
        </h1>
        <p className="text-sm sm:text-base text-[#9fa38c]">
          Track every move. Earn every point.
        </p>
      </div>

      {/* Main Grid: Left List Feed + Right Log Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Activities Feed) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filter Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = selectedFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#c3f400] text-[#161e00] shadow-[0_0_15px_rgba(195,244,0,0.3)]'
                      : 'bg-[#201f1f] text-[#9fa38c] hover:text-white border border-[#2a2a2a] hover:border-[#444933]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Activities List */}
          <div className="space-y-3.5">
            {isLoading ? (
              // Loading Skeletons
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="p-5 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] flex items-center justify-between animate-pulse"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#2a2a2a]" />
                      <div className="space-y-2">
                        <div className="w-28 h-4 bg-[#2a2a2a] rounded-sm" />
                        <div className="w-40 h-3 bg-[#201f1f] rounded-sm" />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <div className="w-16 h-4 bg-[#2a2a2a] rounded-sm ml-auto" />
                      <div className="w-20 h-3 bg-[#201f1f] rounded-sm ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              // Error State
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-3">
                <AlertCircle className="mx-auto text-red-400" size={32} />
                <p className="text-sm text-red-300">
                  {error instanceof Error ? error.message : 'Failed to load activities'}
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#201f1f] text-white text-xs font-semibold hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>Retry</span>
                </button>
              </div>
            ) : filteredActivities.length === 0 ? (
              // Empty State
              <div className="p-10 rounded-2xl bg-[#1c1b1b] border border-dashed border-[#2a2a2a] text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#201f1f] border border-[#2e2e2e] flex items-center justify-center mx-auto text-[#8e9379]">
                  <ActivityIcon size={26} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-display">
                    No activities recorded yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9fa38c] max-w-sm mx-auto">
                    {selectedFilter === 'ALL'
                      ? 'Start logging your workouts on the right to track progress and earn points!'
                      : `No ${selectedFilter.toLowerCase()} activities recorded yet. Log one to get started!`}
                  </p>
                </div>
              </div>
            ) : (
              // Activity Cards Feed
              filteredActivities.map((act) => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  onDelete={(activity) => setActivityToDelete(activity)}
                  isDeleting={deleteActivityMutation.isPending && activityToDelete?.id === act.id}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column (Log Activity Form) */}
        <div className="lg:col-span-5 sticky top-24">
          <LogActivityForm />
        </div>
      </div>

      {/* Confirmation Modal for Deletion */}
      <ConfirmDeleteModal
        isOpen={Boolean(activityToDelete)}
        activity={activityToDelete}
        isLoading={deleteActivityMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setActivityToDelete(null)}
      />
    </div>
  );
};
