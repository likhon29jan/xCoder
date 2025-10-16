import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Latest dispatches',
    body: 'Dive into essays on design systems, AI-assisted pedagogy, and resilience engineering. Each article is peer reviewed by our craft council before publication.'
  },
  {
    heading: 'Engineering field notes',
    body: 'Learn how we blend formal methods with practical DX. Expect notebook-style write-ups on failure modes, mitigations, and observability wins.',
    points: [
      'Deep dives into AI SDK experimentation',
      'Guides to UnoCSS-powered design systems',
      'Retrospectives on incidents and fixes'
    ]
  }
]

export default function BlogRoute() {
  return (
    <MarketingPage
      title='Blog'
      description='Stories and studies from the TutorialKit team.'
      sections={sections}
    />
  )
}
