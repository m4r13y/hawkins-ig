import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hawkins Insurance Group',
  description: 'Privacy Policy for Hawkins Insurance Group - How we protect your personal and health information.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate prose-invert max-w-none space-y-8">
              <div className="text-slate-300 space-y-6">
                <p className="text-lg">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Your Privacy</h2>
                  <p>
                    Hawkins Insurance Group is committed to protecting your privacy and safeguarding your personal and health information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website or use our insurance services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                  <p>We may collect the following types of personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, address, phone number, and email address</li>
                    <li>Date of birth and Social Security number (for insurance applications)</li>
                    <li>Medicare number and health insurance information</li>
                    <li>Financial information relevant to insurance coverage</li>
                    <li>Health information as necessary for insurance enrollment</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Website Usage Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring websites and search terms</li>
                    <li>Device information and operating system</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
                  <p>We use your information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide insurance quotes and enrollment services</li>
                    <li>To communicate with you about your insurance needs and options</li>
                    <li>To process insurance applications and claims</li>
                    <li>To comply with legal and regulatory requirements</li>
                    <li>To improve our website and services</li>
                    <li>To send you relevant insurance information and updates (with your consent)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing and Disclosure</h2>
                  <p>We may share your information in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Insurance Carriers:</strong> To obtain quotes and enroll you in insurance plans</li>
                    <li><strong>Service Providers:</strong> To third parties who assist us in providing our services</li>
                    <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                  <p className="mt-4">
                    <strong>We do not sell your personal information to third parties.</strong>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">HIPAA Compliance</h2>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Protected Health Information (PHI)</h3>
                    <p>
                      As an insurance agency, we may have access to your Protected Health Information (PHI) as defined by HIPAA. We are committed to protecting your PHI and will only use and disclose it as permitted by law and necessary for insurance purposes.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>We maintain administrative, physical, and technical safeguards for PHI</li>
                      <li>Access to PHI is limited to authorized personnel only</li>
                      <li>You have rights regarding your PHI as outlined in our HIPAA Notice of Privacy Practices</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                  <p>We implement appropriate security measures to protect your information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Access controls and authentication measures</li>
                    <li>Regular security assessments and updates</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking Technologies</h2>
                  <p>Our website uses cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Improve website functionality and user experience</li>
                  </ul>
                  <p className="mt-4">
                    You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Choices</h2>
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your information (subject to legal requirements)</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">California Privacy Rights (CCPA)</h2>
                  <p>
                    If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete personal information, and the right to opt-out of the sale of personal information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
                  <p>
                    Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                    <p><strong>Hawkins Insurance Group</strong></p>
                    <p>Privacy Officer</p>
                    <p>Email: privacy@hawkinsinsurancegroup.com</p>
                    <p>Phone: [Your Phone Number]</p>
                    <p>Address: [Your Business Address]</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
