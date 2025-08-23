import { Metadata } from 'next'
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"

export const metadata: Metadata = {
  title: 'Accessibility Statement | Hawkins Insurance Group',
  description: 'Our commitment to digital accessibility and ADA compliance for all users.',
}

export default function AccessibilityStatement() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          {/* Hero Header Section */}
          <section className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                  Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Statement</span>
                </h1>
                <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-slate-400">
                  Our commitment to digital accessibility and ADA compliance for all users
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          {/* Main Content Section */}
          <div className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="space-y-8">

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment to Accessibility</h2>
                    <p className="text-muted-foreground">
                      Hawkins Insurance Group is committed to ensuring digital accessibility for people with disabilities. 
                      We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Conformance Status</h2>
                    <p className="text-muted-foreground mb-4">
                      The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers 
                      to improve accessibility for people with disabilities. It defines three levels of conformance: 
                      Level A, Level AA, and Level AAA.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-6 mt-4">
                      <p className="font-medium text-green-800 dark:text-green-300">
                        This website is partially conformant with WCAG 2.1 Level AA standards. 
                        "Partially conformant" means that some parts of the content do not fully conform to the accessibility standard.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Accessibility Features</h2>
                    <p className="text-muted-foreground mb-4">Our website includes the following accessibility features:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li><strong>Keyboard Navigation:</strong> Full website functionality available via keyboard</li>
                      <li><strong>Screen Reader Support:</strong> Proper heading structure and alternative text for images</li>
                      <li><strong>Color Contrast:</strong> Meeting WCAG AA contrast ratio standards</li>
                      <li><strong>Responsive Design:</strong> Content adapts to different screen sizes and zoom levels</li>
                      <li><strong>Focus Indicators:</strong> Clear visual focus indicators for keyboard users</li>
                      <li><strong>Semantic HTML:</strong> Proper use of HTML elements for better accessibility</li>
                      <li><strong>Contrast Options:</strong> High contrast and inverted color schemes</li>
                      <li><strong>Motion Control:</strong> Reduce animations for users sensitive to motion</li>
                      <li><strong>Screen Reader Optimization:</strong> Enhanced compatibility with assistive technologies</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Known Issues</h2>
                    <p className="text-muted-foreground mb-4">
                      We are aware of some accessibility limitations and are actively working to address them:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Some third-party embedded content may not be fully accessible</li>
                      <li>Certain interactive elements are being enhanced for better keyboard navigation</li>
                      <li>Some form validation messages are being improved for screen reader clarity</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-6 mt-4">
                      <p className="text-blue-800 dark:text-blue-300">
                        <strong>Note:</strong> We are continuously working to resolve these issues and implement improvements.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Assistive Technologies</h2>
                    <p className="text-muted-foreground mb-4">Our website is designed to be compatible with the following assistive technologies:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                      <li>Voice recognition software (Dragon NaturallySpeaking)</li>
                      <li>Keyboard-only navigation</li>
                      <li>Switch navigation devices</li>
                      <li>Magnification software</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Browser Compatibility</h2>
                    <p className="text-muted-foreground mb-4">This website has been tested for accessibility with the following browsers:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                        <p className="font-medium text-foreground">Chrome</p>
                        <p className="text-sm text-muted-foreground">Latest version</p>
                      </div>
                      <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                        <p className="font-medium text-foreground">Firefox</p>
                        <p className="text-sm text-muted-foreground">Latest version</p>
                      </div>
                      <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                        <p className="font-medium text-foreground">Safari</p>
                        <p className="text-sm text-muted-foreground">Latest version</p>
                      </div>
                      <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                        <p className="font-medium text-foreground">Edge</p>
                        <p className="text-sm text-muted-foreground">Latest version</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Feedback and Contact Information</h2>
                    <p className="text-muted-foreground mb-4">
                      We welcome feedback on the accessibility of our website. If you encounter any accessibility barriers 
                      or have suggestions for improvement, please contact us:
                    </p>
                    <div className="bg-muted/50 border border-border rounded-lg p-6">
                      <div className="space-y-2">
                        <p className="font-semibold text-foreground">Hawkins Insurance Group</p>
                        <p className="text-muted-foreground">Email: info@hawkinsig.com</p>
                        <p className="text-muted-foreground">Phone: +1 (817) 800-4253</p>
                        <p className="text-muted-foreground">Location: San Antonio, TX</p>
                        <p className="text-muted-foreground">Business Hours: Mon - Fri: 8AM - 6PM CST</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          When contacting us about accessibility, please include:
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                          <li>The web page URL where you encountered the issue</li>
                          <li>A description of the accessibility barrier</li>
                          <li>Your contact information for follow-up</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Assessment Methods</h2>
                    <p className="text-muted-foreground mb-4">
                      Hawkins Insurance Group assessed the accessibility of this website through the following methods:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Self-evaluation using automated accessibility testing tools</li>
                      <li>Manual testing with keyboard navigation</li>
                      <li>Screen reader testing with NVDA and VoiceOver</li>
                      <li>Color contrast analysis</li>
                      <li>Third-party accessibility audit (planned)</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Ongoing Efforts</h2>
                    <p className="text-muted-foreground mb-4">
                      We are committed to continuous improvement of our website's accessibility. Our ongoing efforts include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Regular accessibility audits and testing</li>
                      <li>Staff training on accessibility best practices</li>
                      <li>User testing with people who have disabilities</li>
                      <li>Incorporating accessibility into our development process</li>
                      <li>Staying current with accessibility standards and guidelines</li>
                    </ul>
                  </section>

                  <div className="bg-muted/50 border border-border rounded-lg p-6 mt-8">
                    <p className="text-sm text-muted-foreground">
                      This accessibility statement was created on {new Date().toLocaleDateString()} and is reviewed regularly to ensure accuracy and currency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <AnimatedFooter />
      </div>
    </div>
  )
}


