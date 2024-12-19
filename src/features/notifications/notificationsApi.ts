import { api, addTagTypes } from "@/app/api";
import {
  setNotifications,
  markAsRead,
  Notification,
} from "@/features/notifications/notificationsSlice";

export const notificationsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getNotifications: builder.query<Notification[], void>({
        query: () => ({
          url: "/api/notifications/my",
        }),
        providesTags: ["notifications"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data: notifications } = await queryFulfilled;
            dispatch(setNotifications(notifications));
          } catch (error) {
            console.error("Error fetching notifications:", error);
          }
        },
      }),
      markNotificationAsRead: builder.mutation<
        void,
        { notificationId: string }
      >({
        query: ({ notificationId }) => ({
          url: `/api/notifications/${notificationId}/mark-read`,
          method: "PATCH",
        }),
        invalidatesTags: ["notifications"],
        async onQueryStarted({ notificationId }, { dispatch, queryFulfilled }) {
          try {
            dispatch(markAsRead(notificationId));

            await queryFulfilled;
          } catch (error) {
            console.error("Error marking notification as read:", error);
          }
        },
      }),
    }),
  });

export const { useGetNotificationsQuery, useMarkNotificationAsReadMutation } =
  notificationsApi;
