import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Using TutorialKit',
    body: 'These terms outline the responsibilities of teams building with our AI tooling. Treat generated content as suggestions and maintain human review for critical flows.'
  },
  {
    heading: 'Service commitments',
    body: 'We guarantee transparent communication, secure operations, and clear escalation paths. If we materially change the service, we will notify you at least 30 days in advance.',
    points: [
      'SLA tiers tailored to education and enterprise needs',
      'Acceptable use aligned with Vercel and Google AI policies',
      'Dispute resolution grounded in collaborative remediation'
    ]
  }
]

export default function TermsRoute() {
  return (
    <MarketingPage
      title='Terms'
      description='Understand the agreements that govern your use of TutorialKit.'
      sections={sections}
    />
  )
}
