import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { defaultContent, mergeContent } from './defaultContent'

const ContentContext = createContext(defaultContent)
const apiUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/content`

async function fetchContent() {
  const { data } = await axios.get(apiUrl, { timeout: 4000 })
  return mergeContent(data)
}

export function ContentProvider({ children }) {
  const { data = defaultContent } = useQuery({
    queryKey: ['site-content'],
    queryFn: fetchContent,
    retry: false,
    staleTime: 5 * 60_000,
  })

  return <ContentContext.Provider value={data}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
