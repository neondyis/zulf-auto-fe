import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import Layout from "@/components/Layout";
import {ChakraProvider} from "@chakra-ui/react";
import theme from '@/themes/base/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={theme}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
  )
}
