import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'System health',
    body: 'Track the uptime of orchestrators, AI pipelines, and collaborative editing services. Historical data is retained for 365 days and annotated with root-cause analyses.',
    points: [
      'Realtime monitors for WebContainer availability',
      'Gemini API latency and error metrics',
      'Incident postmortems with preventive actions'
    ]
  },
  {
    heading: 'Scheduled maintenance',
    body: 'Stay ahead of platform upgrades. We publish maintenance windows two weeks in advance with clear mitigation guidance.'
  }
]

export default function StatusRoute() {
  return (
    <MarketingPage
      title='Status'
      description='Transparent visibility into TutorialKit infrastructure.'
      sections={sections}
    />
  )
}
