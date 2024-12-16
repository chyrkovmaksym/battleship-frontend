import { api } from "@/app/api";
import { setUser } from "./userSlice";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setUser({
              id: data.user._id,
              email: data.user.email,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
            })
          );
        } catch (error) {
          console.error("Failed to fetch current user:", error);
        }
      },
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
