export { getPlaces }
export { filterPlacesData }
export { getTitle }

import fetch from 'node-fetch'
import type { Place, PlaceDetails } from './types'

async function getPlaces(): Promise<PlaceDetails[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/places`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const jsonData = (await response.json()) as ApiResponse; // Use type assertion here
  let places: PlaceDetails[] = jsonData.places;
  console.log("====> places: ", places.length)
  places = places.map((place: PlaceDetails, i: number) => ({
    ...place, 
    id: String(i + 1)
  }))
  return places
}

function filterPlacesData(places: PlaceDetails[]): Place[] {
  return places.map((place: PlaceDetails) => {
    const { title, _id, photos, address, description, perks, extraInfo, maxGuests, price } = place
    return { title, _id, photos, address, description, perks, extraInfo, maxGuests, price }
  })
}

function getTitle(places: Place[] | PlaceDetails[]): string {
  const title = `SantaHost: Direct Booking for ${places.length} Places`
  return title
}
