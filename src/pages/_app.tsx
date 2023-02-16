import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import Layout from "@/components/Layout";
import {ChakraProvider} from "@chakra-ui/react";
import theme from '@/themes/base/theme';
import {AuthProvider} from '@/contexts/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';

export default function App({ Component, pageProps }: AppProps) {
    // Add your protected routes here
    // Replace with Regex later
    const protectedRoutes = ['/','/tables/cars','/tables/clients','/tables/payments','/tables/users','/profile'];

    return (
      <ChakraProvider theme={theme}>
          <AuthProvider >
              <PrivateRoute protectedRoutes={protectedRoutes}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
              </PrivateRoute>
          </AuthProvider>
      </ChakraProvider>
  )
}
