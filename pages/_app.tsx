import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
