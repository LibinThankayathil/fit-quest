import { axiosClient } from './axiosClient';
import type {
  Activity,
  ActivitiesResponse,
  CreateActivityPayload,
  SingleActivityResponse,
} from '../types/activity';

export const activityApi = {
  async getActivities(): Promise<Activity[]> {
    const response = await axiosClient.get<ActivitiesResponse>('/activities');
    return response.data.data.activities;
  },

  async createActivity(payload: CreateActivityPayload): Promise<Activity> {
    const response = await axiosClient.post<SingleActivityResponse>('/activities', payload);
    return response.data.data.activity;
  },

  async deleteActivity(id: string): Promise<void> {
    await axiosClient.delete(`/activities/${id}`);
  },
};
