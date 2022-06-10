import { reduxAPI } from "./reduxAPI";

export const authAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    changeProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/change-profile",
        method: "PUT",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInMutation,
  useChangeProfileMutation,
  useChangePasswordMutation,
} = authAPI;
