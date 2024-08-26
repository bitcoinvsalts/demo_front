export { data }
export type Data = Awaited<ReturnType<typeof data>>

import { filterPlacesData, getPlaces, getTitle } from './getPlaces'

async function data() {
  const places = await getPlaces()
  return {
    // We remove data we don't need because the data is passed to the client; we should
    // minimize what is sent over the network.
    places: filterPlacesData(places),
    // The page's <title>
    title: getTitle(places),
  }
}
