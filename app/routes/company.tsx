import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Our practice',
    body: 'TutorialKit is crafted by designers, engineers, and educators who believe process is the product. We steward the Geist Design System with intention and rigor.'
  },
  {
    heading: 'Principles',
    body: 'We pursue clarity over noise, automation over repetition, and curiosity over certainty.',
    points: [
      'Meditation before ideation',
      'Formal methods guiding quality',
      'Continuous learning and mentorship'
    ]
  }
]

export default function CompanyRoute() {
  return (
    <MarketingPage
      title='Company'
      description='Meet the team behind TutorialKit and learn how we practice mindful engineering.'
      sections={sections}
    />
  )
}
