import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ContentContext = createContext({ content: null, isLoading: true, isError: false })
const apiUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/content`

async function fetchContent() {
  const { data } = await axios.get(apiUrl, { timeout: 4000 })
  if (!data || Object.keys(data).length === 0) {
    throw new Error('The content API returned no content')
  }
  return data
}

export function ContentProvider({ children }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: fetchContent,
    retry: false,
    staleTime: 5 * 60_000,
  })

  return (
    <ContentContext.Provider value={{ content: data ?? null, isError, isLoading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext).content
}

export function useContentState() {
  return useContext(ContentContext)
}
