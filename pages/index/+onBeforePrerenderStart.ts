// https://vike.dev/onBeforePrerenderStart
export { onBeforePrerenderStart }

import type { OnBeforePrerenderStartAsync } from 'vike/types'
import type { Data as DataPlaces } from './+data'
import type { Data as DataPlace } from '../place/@id/+data'
import { filterPlaceData } from './filterPlaceData'
import { filterPlacesData, getPlaces, getTitle } from './getPlaces'

type Data = DataPlace | DataPlaces

const onBeforePrerenderStart: OnBeforePrerenderStartAsync<Data> = async (): ReturnType<
  OnBeforePrerenderStartAsync<Data>
> => {
  const places = await getPlaces()

  return [
    {
      url: '/',
      // We already provide `pageContext` here so that Vike
      // will *not* have to call the `data()` hook defined
      // above in this file.
      pageContext: {
        data: {
          places: filterPlacesData(places),
          title: getTitle(places)
        }
      }
    },
    ...places.map((place) => {
      const url = `/place/${place._id}`
      return {
        url,
        // Note that we can also provide the `pageContext` of other pages.
        // This means that Vike will not call any
        // `data()` hook and the Star Wars API will be called
        // only once (in this `onBeforePrerenderStart()` hook).
        pageContext: {
          data: {
            place: filterPlaceData(place),
            title: place.title
          }
        }
      }
    })
  ]
}
