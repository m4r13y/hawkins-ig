import { Metadata } from 'next'
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"

export const metadata: Metadata = {
  title: 'HIPAA Notice of Privacy Practices | Hawkins Insurance Group',
  description: 'Our HIPAA Notice of Privacy Practices explaining how we protect your health information.',
}

export default function HIPAANotice() {
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
                  HIPAA Notice of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Privacy Practices</span>
                </h1>
                <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-slate-400">
                  How we protect your health information and your privacy rights
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-500">Effective Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          {/* Main Content Section */}
          <div className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="space-y-8">

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-3">Your Rights Regarding Your Health Information</h2>
                    <p className="text-muted-foreground">
                      This notice describes how medical information about you may be used and disclosed and how you can get access to this information. 
                      <strong className="text-blue-600 dark:text-blue-300"> Please review it carefully.</strong>
                    </p>
                  </div>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Our Legal Duty</h2>
                    <p className="text-muted-foreground">
                      We are required by applicable federal and state law to maintain the privacy of your health information. 
                      We are also required to give you this notice about our privacy practices, our legal duties, and your rights 
                      concerning your health information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">How We May Use and Disclose Health Information About You</h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">For Treatment</h3>
                    <p className="text-muted-foreground">
                      We may use or disclose your health information to facilitate medical treatment or services by providers. 
                      This includes coordination of care and consultation between providers regarding your treatment.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">For Payment</h3>
                    <p className="text-muted-foreground">
                      We may use and disclose your health information to obtain payment for services provided to you. 
                      This may include determining eligibility or coverage under a health plan and obtaining prior authorization.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">For Health Care Operations</h3>
                    <p className="text-muted-foreground">
                      We may use or disclose your health information for health care operations purposes. These activities include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Quality assessment and improvement activities</li>
                      <li>Reviewing competence or qualifications of health care professionals</li>
                      <li>Underwriting, premium rating, and other insurance activities</li>
                      <li>Conducting or arranging for medical reviews, audits, or legal services</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Special Situations</h2>
                    
                    <div className="space-y-4">
                      <div className="bg-muted/50 border border-border rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">As Required by Law</h3>
                        <p className="text-sm text-muted-foreground">
                          We will disclose your health information when required to do so by federal, state, or local law.
                        </p>
                      </div>

                      <div className="bg-muted/50 border border-border rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Business Associates</h3>
                        <p className="text-sm text-muted-foreground">
                          We may disclose your health information to contractors, agents, and other business associates 
                          who need the information to provide services to us.
                        </p>
                      </div>

                      <div className="bg-muted/50 border border-border rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Public Health Activities</h3>
                        <p className="text-sm text-muted-foreground">
                          We may disclose your health information for public health activities and purposes including 
                          disease prevention, injury reporting, and FDA notifications.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                    
                    <div className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Right to Inspect and Copy</h3>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You have the right to inspect and copy your health information that may be used to make decisions about your care.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Right to Amend</h3>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          If you feel that your health information is incorrect or incomplete, you may ask us to amend the information.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Right to an Accounting of Disclosures</h3>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You have the right to request an accounting of disclosures of your health information made by us.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Right to Request Restrictions</h3>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You have the right to request a restriction or limitation on how we use or disclose your health information.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Right to Request Confidential Communications</h3>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You have the right to request that we communicate with you about health matters in a certain way or at a certain location.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Right to a Paper Copy</h3>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You have the right to obtain a paper copy of this notice from us upon request.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Notice</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to change this notice and to make the revised or changed notice effective for 
                      health information we already have about you as well as any information we receive in the future.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Complaints</h2>
                    <p className="text-muted-foreground">
                      If you believe your privacy rights have been violated, you may file a complaint with us or with the 
                      Secretary of the Department of Health and Human Services.
                    </p>
                    
                    <div className="bg-muted/50 border border-border rounded-lg p-6 mt-4">
                      <h3 className="text-xl font-semibold text-foreground mb-4">How to File a Complaint:</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className="text-foreground">With Hawkins Insurance Group:</strong>
                          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                            <li>Email: info@hawkinsig.com</li>
                            <li>Phone: +1 (817) 800-4253</li>
                            <li>Location: San Antonio, TX</li>
                          </ul>
                        </div>
                        
                        <div>
                          <strong className="text-foreground">With HHS Office for Civil Rights:</strong>
                          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                            <li>Online: <a href="https://www.hhs.gov/civil-rights/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">hhs.gov/civil-rights</a></li>
                            <li>Phone: 1-800-368-1019</li>
                            <li>TDD: 1-800-537-7697</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-4 mt-4">
                        <p className="text-blue-800 dark:text-blue-300 text-sm">
                          <strong>Important:</strong> All complaints must be submitted in writing. You will not be penalized for filing a complaint.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                    <div className="bg-muted/50 border border-border rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Hawkins Insurance Group Privacy Officer</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Email:</strong> info@hawkinsig.com</p>
                        <p><strong>Phone:</strong> +1 (817) 800-4253</p>
                        <p><strong>Location:</strong> San Antonio, TX</p>
                        <p><strong>Business Hours:</strong> Mon - Fri: 8AM - 6PM CST</p>
                      </div>
                    </div>
                  </section>

                  <div className="bg-muted/50 border border-border rounded-lg p-6 mt-8">
                    <p className="text-sm text-muted-foreground">
                      This notice was published and becomes effective on {new Date().toLocaleDateString()}. 
                      We are required by law to maintain the privacy and security of your protected health information.
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


