export { onRenderHtml }

import { renderToStream } from 'react-streaming/server'
import React from 'react'
import { escapeInject } from 'vike/server'
import { Layout } from './Layout'
import { getPageTitle } from './getPageTitle'
import type { OnRenderHtmlAsync } from 'vike/types'

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const { Page } = pageContext

  const stream = await renderToStream(
    <Layout pageContext={pageContext}>
      <Page/>
    </Layout>,
    // We don't need react-streaming for this app. (We use it merely to showcase that Vike can handle react-streaming with a pre-rendered app. Note that using react-streaming with pre-rendering can make sense if we want to be able to use React's latest <Suspense> techniques.)
    { disable: true }
  )

  const title = getPageTitle(pageContext)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="manifest" href="/manifest.json">
        <link rel="icon" type="image/png" href="logo.jpeg">
        <meta name="theme-color" content="#FF7779">
        <meta name="description" content="Direct Booking your dream home in Santa Teresa with our selection of Airbnb properties and Hotels, featuring detailed listings, high-quality images, and comprehensive property information.">
        <meta name="keywords" content="Santa Teresa Direct Booking, Direct Booking For Airbnb Homes in Santa Teresa, Santa Teresa Hotels, Direct Booking Home and Hotels in Santa Teresa">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="https://santahost.com/">
      </head>
      <body>
        <div id="react-root">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    // See https://vike.dev/streaming#initial-data-after-stream-end
    pageContext: async () => {
      return {
        someAsyncProps: 42
      }
    }
  }
}
