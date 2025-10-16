import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Showcase',
    body: 'Preview interactive tutorials composed with Core UI building blocks and orchestrated by the Vercel AI SDK. Each example highlights accessibility, theming, and analytics hooks.',
    points: [
      'Live demos embedded via WebContainers',
      'Source code excerpts with annotations',
      'Downloadable project starters'
    ]
  },
  {
    heading: 'Community spotlights',
    body: 'See how teams across the globe are teaching complex systems with clarity and care. Submit your own builds to be featured.'
  }
]

export default function GalleryRoute() {
  return (
    <MarketingPage
      title='Gallery'
      description='Curated examples of immersive tutorial experiences crafted with TutorialKit.'
      sections={sections}
    />
  )
}
