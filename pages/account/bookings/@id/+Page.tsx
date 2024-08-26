export default Page

import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { usePageContext } from '../../../../renderer/usePageContext'
import AddressLink from '../../../../components/AddressLink';
import PlaceGallery from '../../../../components/PlaceGallery';
import BookingDates from '../../../../components/BookingDates';
import AccountNav from '../../../../components/AccountNav';
import axiosInstance from '../../../../utils/axios';

function Page() {

  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const pageContext = usePageContext()
  const id = pageContext.routeParams.id

  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    if (isAuthenticated) {
      try {
        setLoading(true);

        // Obtain the access token
        const token = await getAccessTokenSilently({authorizationParams:{
          audience: import.meta.env.VITE_AUTH0_AUDIENCE_URL,
        }});

        const { data } = await axiosInstance.get('/bookings/',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // filter the data to get current booking
        const filteredBooking = data.booking.filter(
          (booking) => booking._id === id,
        );

        setBooking(filteredBooking[0]);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getBookings();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect]);

  // User Authentication //
  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);
  
  if (loading || isLoading || !isAuthenticated) return <div>Loading...</div>;

  return (
    <div>
      <AccountNav />
      {booking?.place ? (
        <div className="p-4">
          <h1 className="text-3xl">{booking?.place?.title}</h1>

          <AddressLink
            className="my-2 block"
            placeAddress={booking.place?.address}
          />
          <div className="my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row">
            <div className=" ">
              <h2 className="mb-4 text-2xl md:text-2xl">
                Your booking information
              </h2>
              <BookingDates booking={booking} />
            </div>
            <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
              <div className="hidden md:block">Total price</div>
              <div className="flex justify-center text-3xl">
                <span>USD {booking?.price}</span>
              </div>
            </div>
          </div>
          <PlaceGallery place={booking?.place} />
        </div>
      ) : (
        <h1> No data</h1>
      )}
    </div>
  );

}
