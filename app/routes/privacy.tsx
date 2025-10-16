import { MarketingPage } from '../components/layout/marketing-page'

const sections = [
  {
    heading: 'Your data, respected',
    body: 'We only collect data necessary to power AI-assisted authoring and improve product quality. Sensitive code, prompts, and outputs stay encrypted end-to-end.'
  },
  {
    heading: 'Control and transparency',
    body: 'Access audit logs, manage retention windows, and export data anytime. We comply with GDPR, SOC 2, and regional education privacy regulations.',
    points: [
      'Granular workspace retention policies',
      'Role-based access control with hardware key support',
      'Optional on-premise model deployment'
    ]
  }
]

export default function PrivacyRoute() {
  return (
    <MarketingPage
      title='Privacy'
      description='We safeguard your ideas with encryption, transparency, and choice.'
      sections={sections}
    />
  )
}
