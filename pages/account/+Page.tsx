export default Page

import { Link } from '../../renderer/Link'
import React, { useEffect, useState } from 'react';
import AccountNav from '../../components/AccountNav';
import InfoCard from '../../components/InfoCard';
import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from '../../utils/axios';

function Page() {

  const [places, setPlaces] = useState([]);

  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getPlaces = async () => {
      if (isAuthenticated) {
        try {
          // Obtain the access token
          const token = await getAccessTokenSilently({authorizationParams:{
            audience: import.meta.env.VITE_AUTH0_AUDIENCE_URL,
          }});
          console.log(token)

          // Make the API request with the token in the Authorization header
          const { data } = await axiosInstance.get('places/user-places', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Set the places data in the state
          setPlaces(data);
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      } else if (!isLoading) {
        // Redirect to login if the user is not authenticated
        loginWithRedirect();
      }
    };

    getPlaces();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center ">
        <Link
          className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
          href={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mx-4 mt-4">
        {places.length > 0 &&
          places.map((place) => <InfoCard place={place} key={place._id} />)}
      </div>
    </div>
  );

}
