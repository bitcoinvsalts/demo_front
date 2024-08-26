// https://vike.dev/data
export { data }
export type Data = Awaited<ReturnType<typeof data>>

import fetch from 'cross-fetch'
import { filterPlaceData } from './filterPlaceData'
import type { PageContextClient, PageContextServer } from 'vike/types'
import type { PlaceDetails, ApiResponse } from './types';
import { render } from 'vike/abort'

async function data(pageContext: PageContextServer | PageContextClient) {
  const dataUrl = `${import.meta.env.VITE_API_URL}/places/${pageContext.routeParams.id}`
  
  let place: PlaceDetails
  try {

    const response = await fetch(dataUrl)
    const jsonData: ApiResponse = await response.json();
    place = jsonData.place as PlaceDetails
  } catch (err) {
    console.error(err)
    throw render(503, `Couldn't fetch data, because failed HTTP GET request to ${dataUrl}`)
  }

  // We remove data we don't need because the data is passed to the client; we should
  // minimize what is sent over the network.
  place = filterPlaceData(place)

  const { title } = place

  return {
    place,
    // The page's <title>
    title
  }
}
