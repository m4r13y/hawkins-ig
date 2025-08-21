import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Hawkins Insurance Group',
  description: 'Our commitment to digital accessibility and ADA compliance for all users.',
}

export default function AccessibilityStatement() {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-white mb-8">Accessibility Statement</h1>
            
            <div className="prose prose-slate prose-invert max-w-none space-y-8">
              <div className="text-slate-300 space-y-6">
                <p className="text-lg">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Accessibility</h2>
                  <p>
                    Hawkins Insurance Group is committed to ensuring digital accessibility for people with disabilities. 
                    We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Conformance Status</h2>
                  <p>
                    The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers 
                    to improve accessibility for people with disabilities. It defines three levels of conformance: 
                    Level A, Level AA, and Level AAA.
                  </p>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 mt-4">
                    <p className="font-medium text-green-300">
                      This website is partially conformant with WCAG 2.1 Level AA standards. 
                      "Partially conformant" means that some parts of the content do not fully conform to the accessibility standard.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Accessibility Features</h2>
                  <p>Our website includes the following accessibility features:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Semantic HTML markup for screen reader compatibility</li>
                    <li>Proper heading hierarchy (H1, H2, H3, etc.)</li>
                    <li>Alternative text for images and graphics</li>
                    <li>Keyboard navigation support</li>
                    <li>Focus indicators for interactive elements</li>
                    <li>High contrast color combinations</li>
                    <li>Resizable text up to 200% without loss of functionality</li>
                    <li>ARIA labels and landmarks for screen readers</li>
                    <li>Accessible forms with proper labels and instructions</li>
                    <li>Skip navigation links</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Accessibility Tools</h2>
                  <p>
                    We provide an accessibility widget on our website that allows users to customize their browsing experience:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Text Size Adjustment:</strong> Increase or decrease font sizes</li>
                    <li><strong>Contrast Options:</strong> High contrast and inverted color schemes</li>
                    <li><strong>Motion Control:</strong> Reduce animations for users sensitive to motion</li>
                    <li><strong>Screen Reader Optimization:</strong> Enhanced compatibility with assistive technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Known Issues</h2>
                  <p>
                    We are aware of some accessibility limitations and are actively working to address them:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Some third-party embedded content may not be fully accessible</li>
                    <li>Certain interactive elements are being enhanced for better keyboard navigation</li>
                    <li>Some form validation messages are being improved for screen reader clarity</li>
                  </ul>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6 mt-4">
                    <p className="text-blue-300">
                      <strong>Note:</strong> We are continuously working to resolve these issues and implement improvements.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Assistive Technologies</h2>
                  <p>Our website is designed to be compatible with the following assistive technologies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                    <li>Voice recognition software (Dragon NaturallySpeaking)</li>
                    <li>Keyboard-only navigation</li>
                    <li>Switch navigation devices</li>
                    <li>Magnification software</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Browser Compatibility</h2>
                  <p>This website has been tested for accessibility with the following browsers:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center">
                      <p className="font-medium text-white">Chrome</p>
                      <p className="text-sm text-slate-400">Latest 2 versions</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center">
                      <p className="font-medium text-white">Firefox</p>
                      <p className="text-sm text-slate-400">Latest 2 versions</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center">
                      <p className="font-medium text-white">Safari</p>
                      <p className="text-sm text-slate-400">Latest 2 versions</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center">
                      <p className="font-medium text-white">Edge</p>
                      <p className="text-sm text-slate-400">Latest 2 versions</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Feedback and Contact Information</h2>
                  <p>
                    We welcome your feedback on the accessibility of our website. Please let us know if you encounter 
                    accessibility barriers or have suggestions for improvement.
                  </p>
                  
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 mt-4">
                    <h3 className="text-xl font-semibold text-white mb-4">Contact Methods:</h3>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Email:</strong> accessibility@hawkinsinsurancegroup.com</li>
                      <li><strong>Phone:</strong> [Your Phone Number]</li>
                      <li><strong>Mail:</strong> [Your Business Address]</li>
                      <li><strong>Response Time:</strong> We aim to respond within 2 business days</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Formal Complaints</h2>
                  <p>
                    If you are not satisfied with our response to your accessibility concern, you may file a complaint with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>U.S. Department of Health and Human Services</strong><br />
                      Office for Civil Rights<br />
                      Website: <a href="https://www.hhs.gov/civil-rights/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">hhs.gov/civil-rights</a>
                    </li>
                    <li>
                      <strong>U.S. Department of Justice</strong><br />
                      Disability Rights Section<br />
                      Website: <a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">ada.gov</a>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Assessment and Testing</h2>
                  <p>
                    Hawkins Insurance Group assessed the accessibility of this website using the following methods:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Self-evaluation using automated accessibility testing tools</li>
                    <li>Manual testing with keyboard navigation</li>
                    <li>Screen reader testing with NVDA and VoiceOver</li>
                    <li>Color contrast analysis</li>
                    <li>Third-party accessibility audit (planned)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Ongoing Efforts</h2>
                  <p>
                    We are committed to continuous improvement of our website's accessibility. Our ongoing efforts include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Regular accessibility audits and testing</li>
                    <li>Staff training on accessibility best practices</li>
                    <li>User testing with people who have disabilities</li>
                    <li>Incorporating accessibility into our development process</li>
                    <li>Staying current with accessibility standards and guidelines</li>
                  </ul>
                </section>

                <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 mt-8">
                  <p className="text-sm text-slate-400">
                    This accessibility statement was created on {new Date().toLocaleDateString()} and is reviewed regularly to ensure accuracy and currency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
