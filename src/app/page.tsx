import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Shield, Users, Globe, Award, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Professional Insurance Solutions
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-6">
              Hawkins Insurance Group
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in comprehensive insurance solutions. Expert guidance, 
              competitive rates, and personalized service for Medicare, Life, Health, and specialty coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 text-lg font-semibold" asChild>
                <Link href="/contact">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-800 text-slate-800 hover:bg-slate-50 px-8 py-4 text-lg font-semibold" asChild>
                <Link href="/ecosystem">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
              <div className="flex flex-col items-center space-y-2">
                <Shield className="h-8 w-8 text-slate-800" />
                <span className="text-sm font-medium text-slate-700">Licensed & Bonded</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Award className="h-8 w-8 text-slate-800" />
                <span className="text-sm font-medium text-slate-700">A+ BBB Rating</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-8 w-8 text-slate-800" />
                <span className="text-sm font-medium text-slate-700">1,000+ Clients</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <CheckCircle className="h-8 w-8 text-slate-800" />
                <span className="text-sm font-medium text-slate-700">50+ Carriers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Choose Hawkins Insurance Group?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We combine decades of expertise with innovative technology to deliver exceptional insurance solutions tailored to your unique needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-800 transition-colors duration-300">
                <Shield className="h-8 w-8 text-slate-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Comprehensive Coverage</h3>
              <p className="text-slate-600 leading-relaxed">
                Full spectrum of insurance solutions including Medicare, Life, Health, Dental, and specialty coverage tailored to your specific needs.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-800 transition-colors duration-300">
                <Users className="h-8 w-8 text-slate-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Expert Team</h3>
              <p className="text-slate-600 leading-relaxed">
                Licensed professionals with decades of combined experience providing personalized guidance and ongoing support throughout your insurance journey.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-800 transition-colors duration-300">
                <Globe className="h-8 w-8 text-slate-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Digital Innovation</h3>
              <p className="text-slate-600 leading-relaxed">
                Modern technology platform connecting clients, administrators, and partners for seamless policy management and superior service delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Integrated Ecosystem</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three powerful platforms working together to provide seamless insurance solutions for clients, agents, and administrators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle className="text-slate-900">HawkNest Client Portal</CardTitle>
                <CardDescription>Self-service platform for policyholders</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Manage policies, view documents, make payments, and access support tools through our intuitive client portal.
                </p>
                <Badge variant="secondary" className="mb-2">Policy Management</Badge>
                <Badge variant="secondary" className="mb-2">Document Access</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle className="text-slate-900">HawkNest Admin Platform</CardTitle>
                <CardDescription>Administrative tools for agents</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Comprehensive administrative platform with client management, policy tools, and business analytics.
                </p>
                <Badge variant="secondary" className="mb-2">Client Management</Badge>
                <Badge variant="secondary" className="mb-2">Analytics</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle className="text-slate-900">The Insurance Hawk</CardTitle>
                <CardDescription>Public-facing professional site</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Professional website showcasing services, expertise, and providing easy access to quotes and information.
                </p>
                <Badge variant="secondary" className="mb-2">Professional Presence</Badge>
                <Badge variant="secondary" className="mb-2">Lead Generation</Badge>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-slate-800 hover:bg-slate-900 text-white">
              <Link href="/ecosystem">Explore Our Ecosystem</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our commitment to excellence and client satisfaction has earned us recognition and trust throughout the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-800">1,000+</div>
              <div className="text-slate-600">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-800">50+</div>
              <div className="text-slate-600">Insurance Carriers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-800">15+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-800">99%</div>
              <div className="text-slate-600">Satisfaction Rate</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">BBB A+ Rating</h3>
              <p className="text-slate-600">Accredited business with the Better Business Bureau</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Licensed & Bonded</h3>
              <p className="text-slate-600">Fully licensed professionals with comprehensive bonding</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Industry Recognition</h3>
              <p className="text-slate-600">Award-winning service and innovation in insurance technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Protected?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your free insurance quote today and discover how we can help protect what matters most to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-slate-800 hover:bg-slate-100" asChild>
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800" asChild>
              <Link href="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
