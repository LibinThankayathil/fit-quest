import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activityApi } from '../api/activity';
import { useAuth } from '../context/AuthContext';
import type { Activity, CreateActivityPayload } from '../types/activity';

export const getActivitiesQueryKey = (userId?: string) =>
  ['activities', userId ?? 'anonymous'] as const;

export function useActivities() {
  const { user } = useAuth();

  return useQuery<Activity[], Error>({
    queryKey: getActivitiesQueryKey(user?.id),
    queryFn: () => activityApi.getActivities(),
    enabled: Boolean(user?.id),
  });
}

export function useCreateActivity() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<Activity, Error, CreateActivityPayload>({
    mutationFn: (payload) => activityApi.createActivity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getActivitiesQueryKey(user?.id) });
    },
  });
}

export function useDeleteActivity() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => activityApi.deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getActivitiesQueryKey(user?.id) });
    },
  });
}
