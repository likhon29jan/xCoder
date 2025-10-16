import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Mindful automation, end to end',
    body: 'xCoder orchestrates Core Building Blocks apps so your teams can prototype, ship, and scale AI-native experiences from a single mindful workspace.'
  },
  {
    heading: 'Geist-aligned interface system',
    body: 'Every screen is composed with the Geist Design System—fluid spacing, soft gradients, and high-contrast typography for accessible clarity.',
    points: [
      'Adaptive layouts that honor focus and flow',
      'WCAG 2.1 AA compliant color and type scales',
      'Reusable primitives ready for Core Building Blocks'
    ]
  },
  {
    heading: 'Formal methods in daily practice',
    body: 'We pair generative intelligence with verifiable workflows, combining automated reasoning, traceable reviews, and iterative quality gates.'
  },
  {
    heading: 'TDD rituals for resilient teams',
    body: 'From scenario planning to vitest coverage, every artifact is born from tests that illuminate intent before implementation.',
    points: [
      'Guided prompts to define acceptance criteria',
      'Live previews that stream build status in real time',
      'Analytics loops that learn from every deployment'
    ]
  }
]

export default function PlatformRoute() {
  return (
    <MarketingPage
      title='Platform'
      description='Discover how xCoder unifies mindful engineering, Core Building Blocks, and the Geist Design System into one platform.'
      sections={sections}
    />
  )
}
