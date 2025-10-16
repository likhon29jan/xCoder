import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Customer care',
    body: 'Our support engineers pair with your team to diagnose issues with environments, web containers, or AI pipelines. Expect thoughtful follow-ups and reproducible steps.'
  },
  {
    heading: 'Community office hours',
    body: 'Join weekly rituals to co-design features, review PRs, and share learnings. Every session is recorded and summarized with the Gemini 2.5 Pro toolkit.',
    points: [
      'Live debugging in StackBlitz WebContainers',
      'Guided walkthroughs of new AI SDK releases',
      'Space for mindful Q&A and pairing'
    ]
  }
]

export default function SupportRoute() {
  return (
    <MarketingPage
      title='Support'
      description='Mindful humans ready to help you keep tutorials flowing and systems resilient.'
      sections={sections}
    />
  )
}
