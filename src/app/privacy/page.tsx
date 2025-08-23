import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"

export const metadata: Metadata = {
  title: 'Privacy Policy | Hawkins Insurance Group',
  description: 'Privacy Policy for Hawkins Insurance Group - How we protect your personal and health information.',
}

export default function PrivacyPolicy() {
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
                  Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Policy</span>
                </h1>
                <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-slate-400">
                  How we protect your personal and health information
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
                  {/* Table of Contents */}
                  <div className="bg-muted/50 border border-border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Table of Contents</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <a href="#overview" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Overview</a></li>
                      <li>• <a href="#hipaa-glba" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Applicability of HIPAA and GLBA</a></li>
                      <li>• <a href="#personal-info" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Personal Information We Collect / Sources of Personal Information</a></li>
                      <li>• <a href="#use-info" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Use of Personal Information</a></li>
                      <li>• <a href="#disclosing-info" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Disclosing Personal Information</a></li>
                      <li>• <a href="#cookie-policy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Cookie Policy</a></li>
                      <li>• <a href="#children" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Children Under the Age of 16</a></li>
                      <li>• <a href="#state-rights" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Your State Privacy Rights</a></li>
                      <li>• <a href="#retention" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Retention of Data</a></li>
                      <li>• <a href="#security" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Data Security</a></li>
                      <li>• <a href="#third-party" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Third-Party Applications and Integrations</a></li>
                      <li>• <a href="#updates" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Updates to This Privacy Policy</a></li>
                      <li>• <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Contact Information</a></li>
                    </ul>
                  </div>

                  {/* Overview */}
                  <section id="overview">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Overview</h2>
                    <div className="space-y-4 text-muted-foreground">
                  <p>
                    This Privacy Policy describes the collection, use, and disclosure practices with respect to Hawkins Insurance Group 
                    and The Insurance Hawk brand ("we," "us", "our," or the "Company") and its website, theinsurancehawk.com, 
                    and any other websites or platforms that the Company may create in the future (the "Platform").
                  </p>
                  <p>
                    The purpose of the Platform is to provide information and tools to licensed insurance agents and prospective 
                    insurance agents ("Agents"). We also receive information about individuals who are interested in insurance or 
                    financial products ("Consumers") and make such information available to licensed insurance agents who assist 
                    individuals with the purchase of the products. We may also work with "Lead Vendors" – companies that collect 
                    inquiries from Consumers and pass such inquiries to Agents and Company representatives. Lead Vendors must obtain 
                    appropriate consent from Consumers to be contacted regarding specific products before providing us with such 
                    Consumers' information.
                  </p>
                  <p>
                    This Privacy Policy uses the term "Personal Information" to describe information that identifies, relates to, 
                    describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, 
                    with a particular consumer or household.
                  </p>
                </div>
              </section>

                  {/* HIPAA and GLBA */}
                  <section id="hipaa-glba">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Applicability of HIPAA and GLBA</h2>
                    <div className="space-y-4 text-muted-foreground">
                  <p>
                    Since we facilitate the sale of a diverse range of insurance products, our processing of some information on 
                    behalf of our agents may fall under another state or federal regulatory framework, like the Health Insurance 
                    Portability and Accountability Act ("HIPAA") and related state laws, or the Gramm-Leach-Bliley Act ("GLBA") 
                    and related state laws.
                  </p>
                  <p>
                    Specifically, we act as a Business Associate (as defined by HIPAA) if we receive client Protected Health 
                    Information ("PHI") from lead vendors or on behalf of a health plan that is a Covered Entity (as defined by HIPAA). 
                    In our role as a Business Associate we collect, use, and disclose PHI to provide services for or on behalf of 
                    health plans. For more information about how PHI is used and disclosed, please review the applicable health plan's 
                    Notice of Privacy Practices.
                  </p>
                  <p>
                    When we receive client information pertaining to certain insurance or financial products, we may collect non-public 
                    personal financial information, which is regulated by GLBA. For more information about how non-public personal 
                    financial information is used and disclosed, please review the GLBA Notice provided by the financial institution 
                    that issued the clients' policies or products.
                  </p>
                  <p>
                    This Privacy Policy applies to personal information that is not covered by HIPAA or GLBA.
                  </p>
                </div>
              </section>

                  {/* Personal Information We Collect */}
                  <section id="personal-info">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Personal Information We Collect / Sources of Personal Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                  <p>
                    The table below details the categories of Personal Information that we may collect or obtain through the operation 
                    of the Platform. In addition to the sources listed below, we may collect this information from third-party service 
                    providers or vendors, including data analytics providers.
                  </p>
                  
                      <div className="overflow-x-auto">
                        <table className="w-full border border-border rounded-lg">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">Category</th>
                              <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Contact Information</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">Consumers' and Agents' name, phone number, and email address, as well as Consumers' postal address. We may collect this information about Consumers from Lead Vendors, Agents, insurance carriers, data brokers, and agencies.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Login Credentials</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">This includes username and password when Agents or Consumers choose to create an account with us.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Identification Information*</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">Agents' National Producer Number and Social Security number. Consumers' driver's license, Social Security, and/or similar government-issued identification numbers.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Demographic Information*</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">Consumers' age, date of birth, marital status, language preference, ethnicity, race, and sex or gender.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Health Information*</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">Consumers' health information provided in the course of discussions with an Agent or representative, which is relevant to the processing of an application for an insurance or financial product.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Commercial Information</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">Information about the products requested by Consumers, including information entered into insurance and/or financial product applications.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Internet Activity</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">Automatically collected information on users' interaction with the Platform, including browsing history, duration of browsing session, device ID, and IP address.</td>
                            </tr>
                            <tr>
                              <td className="border-b border-border px-4 py-3 font-medium text-foreground">Geolocation Data</td>
                              <td className="border-b border-border px-4 py-3 text-muted-foreground">We collect geolocation, which may include precise geolocation, from users automatically and may also collect this from advertising networks.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                  
                  <p className="text-sm">
                    <em>Some or all of the types of Personal Information marked with an asterisk (*) may be considered "sensitive" 
                    personal information according to some state laws.</em>
                  </p>
                </div>
              </section>

                  {/* How We Use Personal Information */}
                  <section id="use-info">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use the Personal Information We Collect</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>We may use or disclose the Personal Information that we collect for one or more of the following purposes:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Operate the Platform</li>
                        <li>Communicate with you regarding the Platform</li>
                        <li>Contact Consumers through our employed agents regarding insurance and/or financial products in which the Consumer expressed interest</li>
                        <li>Address users' and Consumers' inquiries</li>
                        <li>Process transactions</li>
                        <li>Tailor the content and information that we may send or display to you</li>
                        <li>Analyze use of our products and services</li>
                        <li>Develop new products and services</li>
                        <li>Comply with legal obligations</li>
                        <li>Protect our rights, property, and safety or the rights, property, and safety of others</li>
                      </ul>
                    </div>
                  </section>

                  {/* How We Share Personal Information */}
                  <section id="disclosing-info">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Share the Personal Information We Collect</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We may disclose all categories of Personal Information described above to the third parties listed below for 
                        the purpose of facilitating the sale of insurance and/or financial products to individuals who are interested 
                        in purchasing such products.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>With Our Service Providers:</strong> We may share Personal Information with third parties who perform services for us or on our behalf.</li>
                        <li><strong>With Our Business Partners:</strong> This includes our affiliates in the insurance or financial industry, insurance carriers, and marketing organizations.</li>
                        <li><strong>With Law Enforcement:</strong> We may share Personal Information to comply with the law or assist in law enforcement.</li>
                        <li><strong>With Our Independent Agents and Advisors:</strong> Agents and advisors have access to Personal Information about Consumers.</li>
                        <li><strong>With Data Analytics Providers:</strong> Third-party providers may collect Personal Information for targeted advertising purposes.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Cookie Policy */}
                  <section id="cookie-policy">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookie Policy</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        The website on which the Platform is hosted may use cookies, pixel tags, web beacons, and similar technologies 
                        to track and enhance user experience, including technologies placed on the website by third parties, such as 
                        advertising network partners.
                      </p>
                      <p>
                        You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, 
                        some parts of the Platform may not function properly. Our Platform does not recognize "Do Not Track" signals, 
                        but it may recognize other opt-out preference signals, such as the Global Privacy Control (GPC).
                      </p>
                    </div>
                  </section>

                  {/* Children Under 16 */}
                  <section id="children">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Children Under the Age of 16</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        The Platform is not intended for children under 16 years of age. We do not collect information about individuals 
                        under the age of 16. No one under age 16 may provide any information through the Platform. We do not knowingly 
                        collect Personal Information from children under 16, and we do not have actual knowledge that we sell or share 
                        the Personal Information of children under 16.
                      </p>
                      <p>
                        If you are under 16, do not use or provide any information through the Platform. If we learn we have collected 
                        or received Personal Information from a child under 16 without verification of parental consent, we will delete 
                        that information. If you believe we might have any information from or about a child under 16, please contact us.
                      </p>
                    </div>
                  </section>

                  {/* State Privacy Rights */}
                  <section id="state-rights">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Your State Privacy Rights</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        State consumer privacy laws may provide their residents with additional rights regarding our use of their 
                        Personal Information. Depending on your state of residence, you may have the following rights:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Right to know what personal information we collect about you</li>
                        <li>Right to delete personal information</li>
                        <li>Right to correct inaccurate personal information</li>
                        <li>Right to opt out of the sale or sharing of personal information</li>
                        <li>Right to opt out of targeted advertising</li>
                        <li>Right to data portability</li>
                        <li>Right to non-discrimination for exercising your privacy rights</li>
                      </ul>
                      <p>
                        To exercise any of these rights, please contact us using the information provided in the Contact Information section below.
                      </p>
                    </div>
                  </section>

                  {/* Data Retention */}
                  <section id="retention">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Retention of Data</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We retain Personal Information where we have an ongoing legitimate business or legal need to do so. Our retention 
                        periods will vary depending on the type of data involved, but, generally, we refer to these criteria in order 
                        to determine retention period:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Whether we have a legal or contractual need to retain the data</li>
                        <li>Whether the data is necessary to provide our Platform</li>
                        <li>Whether our Consumers or Agents would reasonably expect that we would retain the data until they remove it or until their accounts are closed or terminated</li>
                      </ul>
                    </div>
                  </section>

                  {/* Data Security */}
                  <section id="security">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        No security is foolproof, and the Internet is an insecure medium. We cannot guarantee absolute security, but we 
                        work hard to protect our Company and you from unauthorized access to or unauthorized alteration, disclosure, or 
                        destruction of Personal Information that we collect and store.
                      </p>
                    </div>
                  </section>

                  {/* Third Party Applications */}
                  <section id="third-party">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Third Party Applications and Integrations</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Our Platform uses third-party applications and integrations to enhance its experience. We disclaim any and all 
                        liability and responsibility for the use of these applications and integrations, and encourage you to review 
                        their individual privacy policies before using our Platform or otherwise engaging with us.
                      </p>
                    </div>
                  </section>

                  {/* Updates to Privacy Policy */}
                  <section id="updates">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Updates to This Privacy Policy</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We may revise this Privacy Policy from time to time. If we make material changes to this Privacy Policy, we will 
                        notify you by email or by posting a notice on our Platform prior to or on the effective date of the changes. 
                        By continuing to access or use the Platform after those changes become effective, you acknowledge the revised 
                        Privacy Policy.
                      </p>
                    </div>
                  </section>

                  {/* Contact Information */}
                  <section id="contact">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        If you have any questions or comments about this notice, or the ways in which we collect and use your personal 
                        information, please do not hesitate to contact us at:
                      </p>
                      <div className="bg-muted/50 border border-border rounded-lg p-4">
                        <p><strong>Phone:</strong> +1 (817) 800-4253</p>
                        <p><strong>Email:</strong> info@hawkinsig.com</p>
                        <p><strong>Location:</strong> San Antonio, TX</p>
                        <p><strong>Business Hours:</strong> Mon - Fri: 8AM - 6PM CST</p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Back to Home */}
                <div className="mt-12 pt-8 border-t border-border">
                  <Link 
                    href="/" 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    ← Back to Home
                  </Link>
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


