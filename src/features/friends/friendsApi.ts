import { addTagTypes, api } from "@/app/api";

interface SearchUsersRequest {
  searchTerm: string;
  page?: number;
  limit?: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface SearchUsersResponse {
  users: User[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

interface SendFriendRequestRequest {
  toUserId: string;
}

interface RespondToFriendRequestRequest {
  requestId: string;
  status: "accepted" | "rejected";
}

export const friendsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      searchUsers: builder.query<SearchUsersResponse, SearchUsersRequest>({
        query: ({ searchTerm, page = 1, limit = 10 }) => ({
          url: "/users/search",
          params: { searchTerm, page, limit },
        }),
        providesTags: ["users"],
      }),
      sendFriendRequest: builder.mutation({
        query: ({ toUserId }: SendFriendRequestRequest) => ({
          url: "/friends/send",
          method: "POST",
          body: { toUserId },
        }),
        invalidatesTags: ["users"],
      }),
      respondToFriendRequest: builder.mutation({
        query: ({ requestId, status }: RespondToFriendRequestRequest) => ({
          url: "/friends/respond",
          method: "POST",
          body: { requestId, status },
        }),
        invalidatesTags: ["users"],
      }),
    }),
  });

export const {
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useRespondToFriendRequestMutation,
} = friendsApi;
