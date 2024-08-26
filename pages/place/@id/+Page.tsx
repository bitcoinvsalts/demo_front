import React from 'react'
import { useData } from '../../../renderer/useData'
import type { Data } from './+data'

import AddressLink from '../../../components/AddressLink';
import PlaceGallery from '../../../components/PlaceGallery';
import PerksWidget from '../../../components/PerksWidget';
import BookingWidget from '../../../components/BookingWidget';

function Page() {
  const { place } = useData<Data>()

  // Ensure place is defined
  if (!place) {
    return <p>Loading...</p>
  }

  // Ensure place.title, place.photos, and place.description are defined
  const { title, photos, description } = place

  return (
    <>
      <div className="mt-4 overflow-x-hidden px-8 pt-20 ">
        <h1 className="text-3xl">{place.title}</h1>

        <AddressLink placeAddress={place.address} />
        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
          <div className="">
            <div className="my-4 ">
              <h2 className="text-2xl font-semibold">Description</h2>
              {place.description}
            </div>
            Max number of guests: {place.maxGuests}
            <PerksWidget perks={place?.perks} />
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="-mx-8 border-t bg-white px-8 py-8">
          <div>
            <h2 className="mt-4 text-2xl font-semibold">Extra Info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

