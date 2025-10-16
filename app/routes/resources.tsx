import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Reference implementations',
    body: 'Discover end-to-end tutorial flows crafted with the Vercel AI SDK, UnoCSS, and mindful testing strategies. Each example is annotated with the rituals and safeguards applied.',
    points: [
      'Component recipes for onboarding, assessments, and adaptive journeys',
      'Downloadable templates for Remix, Next.js, and Astro environments',
      'Quality gates covering accessibility, localization, and observability'
    ]
  },
  {
    heading: 'Process playbooks',
    body: 'Bring your team along with facilitation guides, review checklists, and retrospective prompts designed for calm, focused collaboration.'
  }
]

export default function ResourcesRoute() {
  return (
    <MarketingPage
      title='Resources'
      description='Everything you need to align rituals, systems, and AI-assisted delivery.'
      sections={sections}
    />
  )
}
