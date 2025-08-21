import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Hawkins Insurance Group',
  description: 'Terms of Service for Hawkins Insurance Group - Medicare insurance services and compliance.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="prose prose-slate prose-invert max-w-none space-y-8">
              <div className="text-slate-300 space-y-6">
                <p className="text-lg">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using the Hawkins Insurance Group website and services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our website, insurance services, and any related applications or services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Medicare Insurance Services</h2>
                  <p>
                    Hawkins Insurance Group is an independent insurance agency licensed to sell Medicare insurance products. We are not connected with or endorsed by the U.S. Government or the federal Medicare program.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We represent multiple insurance carriers and can offer a variety of Medicare plans</li>
                    <li>Our services include Medicare Supplement, Medicare Advantage, and Medicare Part D plans</li>
                    <li>We provide educational resources and enrollment assistance</li>
                    <li>All insurance products are subject to availability and carrier approval</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                  <p>When using our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information during enrollment or consultation</li>
                    <li>Maintain the confidentiality of your account information</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not interfere with or disrupt our services or servers</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Privacy and Data Protection</h2>
                  <p>
                    Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Medicare Compliance Disclaimers</h2>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Important Medicare Notices:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area.</li>
                      <li>Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.</li>
                      <li>Not connected with or endorsed by the United States government or the federal Medicare program.</li>
                      <li>Medicare has neither reviewed nor endorsed this information.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by law, Hawkins Insurance Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Insurance License Information</h2>
                  <p>
                    Hawkins Insurance Group and its agents are licensed insurance professionals. License information is available upon request and can be verified through your state's insurance department.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Modifications to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of any modifications.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Information</h2>
                  <p>
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                    <p><strong>Hawkins Insurance Group</strong></p>
                    <p>Email: info@hawkinsinsurancegroup.com</p>
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
