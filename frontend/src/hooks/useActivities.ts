import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activityApi } from '../api/activity';
import type { Activity, CreateActivityPayload } from '../types/activity';

export const ACTIVITIES_QUERY_KEY = ['activities'] as const;

export function useActivities() {
  return useQuery<Activity[], Error>({
    queryKey: ACTIVITIES_QUERY_KEY,
    queryFn: () => activityApi.getActivities(),
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation<Activity, Error, CreateActivityPayload>({
    mutationFn: (payload) => activityApi.createActivity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => activityApi.deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
    },
  });
}
