export default Page

import { Link } from '../../../renderer/Link'
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import AccountNav from '../../../components/AccountNav';
import PlaceImg from '../../../components/PlaceImg';
import BookingDates from '../../../components/BookingDates';
import axiosInstance from '../../../utils/axios';

function Page() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getBookings = async () => {
      if (isAuthenticated) {
        try {
          // Obtain the access token
          const token = await getAccessTokenSilently({authorizationParams:{
            audience: import.meta.env.VITE_AUTH0_AUDIENCE_URL,
          }});

          // Make the API request with the token in the Authorization header
          const { data } = await axiosInstance.get('bookings/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Set the places data in the state
          setBookings(data.booking);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching places:", error);
          setLoading(false);
        }
      } else if (!isLoading) {
        // Redirect to login if the user is not authenticated
        loginWithRedirect();
      }
    };

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
    <div className="flex flex-col items-center">
      <AccountNav />
      <div>
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <Link
              href={`/account/bookings/${booking._id}`}
              className="mx-4 my-8 flex h-28 gap-4 overflow-hidden rounded-2xl bg-gray-200 md:h-40 lg:mx-0"
              key={booking._id}
            >
              <div className="w-2/6 md:w-1/6">
                {booking?.place?.photos[0] && (
                  <PlaceImg
                    place={booking?.place}
                    className={'h-full w-full object-cover'}
                  />
                )}
              </div>
              <div className="grow py-3 pr-3">
                <h2 className="md:text-2xl">{booking?.place?.title}</h2>
                <div className="md:text-xl">
                  <div className="flex gap-2 border-t "></div>
                  <div className="md:text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-4 hidden items-center text-gray-600  md:flex"
                    />

                    <div className="my-2 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-7 w-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-xl md:text-2xl">
                        Total price: USD {booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="">
            <div className="flex flex-col justify-start">
              <hr className="border border-gray-300" />
              <h3 className="pt-6 text-2xl font-semibold">
                No booking yet.
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

