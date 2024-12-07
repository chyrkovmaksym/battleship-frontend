import { api } from "@/app/api";
import { setCredentials } from "./authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
