import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

const ContentContext = createContext({ content: null, isLoading: true, isError: false })
const apiUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/content`

const contentSchema = z.object({
  brand: z.object({ name: z.string().min(1) }),
  navigation: z.object({
    links: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })).min(1),
    cta: z.string().min(1),
  }),
  hero: z.object({
    badge: z.string(), titleLines: z.array(z.string().min(1)).min(1), subtitle: z.string(),
    primaryCta: z.string(), secondaryCta: z.string(), trustNote: z.string(),
    imageUrl: z.string().min(1), imageAlt: z.string(), experience: z.string(), experienceLabel: z.string(),
  }),
  marquee: z.array(z.string().min(1)).min(1),
  about: z.object({
    eyebrow: z.string(), titleBefore: z.string(), titleAccent: z.string(), bioFirst: z.string(), bioSecond: z.string(),
    imageUrl: z.string().min(1), imageAlt: z.string(), keywords: z.array(z.string()),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  }),
  services: z.object({
    eyebrow: z.string(), titleBefore: z.string(), titleAccent: z.string(), titleAfter: z.string(), intro: z.string(), cta: z.string(),
    items: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).min(1),
  }),
  testimonials: z.object({
    eyebrow: z.string(), titleBefore: z.string(), titleAccent: z.string(), intro: z.string(),
    items: z.array(z.object({ initials: z.string().min(1), tag: z.string(), quote: z.string().min(1) })).min(1),
  }),
  contact: z.object({
    eyebrow: z.string(), titleBefore: z.string(), titleAccent: z.string(), titleAfter: z.string(), intro: z.string(),
    email: z.string(), phone: z.string(), location: z.string(),
  }),
  footer: z.object({ description: z.string(), contactHeading: z.string(), followHeading: z.string(), privacyTitle: z.string(), copyright: z.string() }),
})

async function fetchContent() {
  const { data } = await axios.get(apiUrl, { timeout: 4000 })
  return contentSchema.parse(data)
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
