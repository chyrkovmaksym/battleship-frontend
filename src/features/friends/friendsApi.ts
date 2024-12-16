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

export interface FriendRequest {
  _id: string;
  fromUser: string;
  toUser: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  sender: {
    firstName: string;
    lastName: string;
    email: string;
  };
  receiver: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface GetFriendRequestsResponse {
  type: "fromUser" | "toUser";
  requests: FriendRequest[];
}

type GetUserFriendsResponse = User[];

export const friendsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      searchUsers: builder.query<SearchUsersResponse, SearchUsersRequest>({
        query: ({ searchTerm, page = 1, limit = 10 }) => ({
          url: "/api/users/search",
          params: { searchTerm, page, limit },
        }),
        providesTags: ["users"],
      }),
      sendFriendRequest: builder.mutation({
        query: ({ toUserId }: SendFriendRequestRequest) => ({
          url: "/api/friends/send",
          method: "POST",
          body: { toUserId },
        }),
        invalidatesTags: ["users"],
      }),
      respondToFriendRequest: builder.mutation({
        query: ({ requestId, status }: RespondToFriendRequestRequest) => ({
          url: "/api/friends/respond",
          method: "POST",
          body: { requestId, status },
        }),
        invalidatesTags: ["users"],
      }),
      getFriendRequests: builder.query<
        GetFriendRequestsResponse,
        { type: "fromUser" | "toUser" }
      >({
        query: ({ type }) => ({
          url: `/api/friends/requests`,
          params: { type },
        }),
        providesTags: ["users"],
      }),
      getFriends: builder.query<GetUserFriendsResponse, void>({
        query: () => ({
          url: `/api/friends/my`,
        }),
        providesTags: ["users"],
      }),
    }),
  });

export const {
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useRespondToFriendRequestMutation,
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
} = friendsApi;
