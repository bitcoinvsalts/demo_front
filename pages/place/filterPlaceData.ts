import type { PlaceDetails } from './types'

export { filterPlaceData }

function filterPlaceData(place: PlaceDetails & Record<string, unknown>): PlaceDetails {
  const { title, _id, photos, address, description, perks, extraInfo, maxGuests, price } = place
  return { title, _id, photos, address, description, perks, extraInfo, maxGuests, price }
}
