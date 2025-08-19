import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Award, 
  CheckCircle, 
  Shield, 
  FileCheck, 
  Users, 
  Calendar,
  ExternalLink,
  Star,
  Building2,
  GraduationCap
} from "lucide-react";

export default function CertificationsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Professional Credentials
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Certifications & Credentials
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Demonstrating our commitment to excellence through professional certifications, 
              industry accreditations, and continuous education in insurance services.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Licenses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Insurance Licenses</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our agents hold valid licenses in multiple states, ensuring compliance with 
              all regulatory requirements and industry standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <FileCheck className="h-8 w-8 text-slate-800" />
                  <Badge variant="outline">Active</Badge>
                </div>
                <CardTitle>Life & Health Insurance License</CardTitle>
                <CardDescription>Texas Department of Insurance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>License Number:</span>
                    <span className="font-medium">TX-123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issue Date:</span>
                    <span className="font-medium">January 2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiration:</span>
                    <span className="font-medium">January 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <FileCheck className="h-8 w-8 text-slate-700" />
                  <Badge variant="outline">Active</Badge>
                </div>
                <CardTitle>Property & Casualty License</CardTitle>
                <CardDescription>Texas Department of Insurance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>License Number:</span>
                    <span className="font-medium">TX-987654321</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issue Date:</span>
                    <span className="font-medium">March 2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiration:</span>
                    <span className="font-medium">March 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <FileCheck className="h-8 w-8 text-slate-800" />
                  <Badge variant="outline">Active</Badge>
                </div>
                <CardTitle>Medicare Supplement Certification</CardTitle>
                <CardDescription>Centers for Medicare & Medicaid Services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Certification ID:</span>
                    <span className="font-medium">CMS-456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issue Date:</span>
                    <span className="font-medium">June 2021</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiration:</span>
                    <span className="font-medium">June 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Certifications */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional development and specialized training in various insurance disciplines 
              and emerging industry trends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-slate-800" />
                  <div>
                    <CardTitle>Chartered Life Underwriter (CLU)</CardTitle>
                    <CardDescription>The American College of Financial Services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced professional designation demonstrating expertise in life insurance, 
                  estate planning, and risk management.
                </p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Earned: September 2022</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-slate-700" />
                  <div>
                    <CardTitle>Health Insurance Associate (HIA)</CardTitle>
                    <CardDescription>America's Health Insurance Plans</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Specialized certification in health insurance products, regulations, 
                  and customer service excellence.
                </p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Earned: November 2021</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-slate-800" />
                  <div>
                    <CardTitle>Medicare Specialist Certification</CardTitle>
                    <CardDescription>National Association of Insurance Commissioners</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive training in Medicare Advantage, Supplement, and Part D plans, 
                  including compliance requirements.
                </p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Earned: February 2023</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-slate-600" />
                  <div>
                    <CardTitle>Digital Insurance Innovation</CardTitle>
                    <CardDescription>Insurance Technology Institute</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced certification in digital insurance platforms, customer experience 
                  technology, and modern insurance delivery methods.
                </p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Earned: August 2023</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Accreditations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Company Accreditations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Organizational memberships and accreditations that demonstrate our commitment 
              to industry best practices and ethical standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle>Better Business Bureau</CardTitle>
                <CardDescription>Accredited Business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  A+ Rating with commitment to ethical business practices
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-slate-700 mb-4" />
                <CardTitle>NAIFA Member</CardTitle>
                <CardDescription>National Association of Insurance & Financial Advisors</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-2">Active Member</Badge>
                <p className="text-sm text-muted-foreground">
                  Professional development and ethical standards adherence
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle>IIABA Member</CardTitle>
                <CardDescription>Independent Insurance Agents & Brokers of America</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-2">Certified Agency</Badge>
                <p className="text-sm text-muted-foreground">
                  Independent agency standards and consumer protection
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Continuing Education */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Continuing Education</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to professional development through ongoing education 
              and staying current with industry changes and regulations.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-slate-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Annual CE Requirements</h3>
                    <p className="text-sm text-muted-foreground">
                      Completed 24+ hours of continuing education annually, exceeding state requirements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Advanced Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular participation in advanced insurance education and industry conferences
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-slate-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Regulatory Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Stay current with changing regulations and compliance requirements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technology Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Continuous learning in insurance technology and digital platform development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle className="text-2xl">License Verification</CardTitle>
                <CardDescription>
                  Verify our professional licenses and certifications through official channels
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  All our licenses and certifications can be independently verified through 
                  the appropriate regulatory bodies and professional organizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="https://www.tdi.texas.gov/" className="flex items-center">
                      Texas Department of Insurance
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Request Verification Documents</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust the Professionals</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            With our extensive certifications and commitment to excellence, 
            you can trust that you're working with qualified insurance professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Work With Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800" asChild>
              <Link href="/about">Learn More About Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
