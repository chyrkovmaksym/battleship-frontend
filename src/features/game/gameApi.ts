import { api } from "@/app/api";

interface SendGameRequestRequest {
  toUserId: string;
  gameId: string;
}

interface SendGameRequestResponse {
  message: string;
}

export const gameApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendGameRequest: builder.mutation<
      SendGameRequestResponse,
      SendGameRequestRequest
    >({
      query: ({ toUserId, gameId }) => ({
        url: "/api/gameRequest/send",
        method: "POST",
        body: { toUserId, gameId },
      }),
    }),
  }),
});

export const { useSendGameRequestMutation } = gameApi;
