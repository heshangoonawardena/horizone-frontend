import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window?.Clerk?.session?.getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => `hotels`,
    }),
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`,
    }),
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: `hotels`,
        method: "POST",
        body: hotel,
      }),
    }),
    getHotelsForOwners: builder.query({
      query: () => `hotels/owner`,
    }),
    getBookingsForUser: builder.query({
      query: () => `bookings/user`,
    }),
    getBookingsForOwner: builder.query({
      query: () => `bookings/owner`,
    }),
    createBooking: builder.mutation({
      query: (booking) => ({
        url: `bookings`,
        method: "POST",
        body: booking,
      }),
    }),
    patchBookingStatus: builder.mutation({
      query: ({ id, status, message }) => ({
        url: `bookings/${id}`,
        method: "PATCH",
        body: { status, message },
      }),
    }),
    addFavorite: builder.mutation({
      query: (hotelId) => ({
        url: `favorites`,
        method: "POST",
        body: { hotelId },
      }),
    }),
    removeFavorite: builder.mutation({
      query: (hotelId) => ({
        url: `favorites`,
        method: "DELETE",
        body: { hotelId },
      }),
    }),
    getFavorites: builder.query({
      query: () => `favorites`,
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useGetHotelsForOwnersQuery,
  useGetBookingsForUserQuery,
  useGetBookingsForOwnerQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  usePatchBookingStatusMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} = api;
