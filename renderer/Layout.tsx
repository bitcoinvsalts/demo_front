export { Layout }

import React from 'react'
import { Auth0Provider } from "@auth0/auth0-react";
import { PageContextProvider } from './usePageContext'
import { Link } from './Link'
import type { PageContext } from 'vike/types'
import './css/index.css'
import './Layout.css'
import "./css/tailwind.css";
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_ISSUER_BASE_URL}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: import.meta.env.VITE_BASE_URL,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE_URL
        }}
      >
        <PageContextProvider pageContext={pageContext}>
          <Header pageContext={pageContext} />
          <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
            {children}
          </div>
          <Footer />
        </PageContextProvider>
      </Auth0Provider>
      <ToastContainer autoClose={2000} transition={Slide} />
    </React.StrictMode>
  )
}

