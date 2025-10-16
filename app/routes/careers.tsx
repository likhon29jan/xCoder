import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Open roles',
    body: 'We are hiring mindful builders across engineering, design, and developer relations. Each role includes time for exploration, mentorship, and community contribution.',
    points: [
      'Staff Engineer — AI-guided learning systems',
      'Product Designer — Core building blocks',
      'Developer Advocate — Tutorial ecosystems'
    ]
  },
  {
    heading: 'Life at TutorialKit',
    body: 'Our rituals include focus blocks, silent co-working, and quarterly retreats devoted to craft. Benefits cover wellness, continued education, and sabbaticals.'
  }
]

export default function CareersRoute() {
  return (
    <MarketingPage
      title='Careers'
      description='Join a team that treats software as a practice of attention and intention.'
      sections={sections}
    />
  )
}
