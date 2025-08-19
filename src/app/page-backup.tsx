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
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Ecosystem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrated platforms designed for efficiency, transparency, and exceptional user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Client Portal
                </CardTitle>
                <CardDescription>HawkNest Client Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Secure client dashboard for policy management, claims tracking, and document access.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/m4r13y/hawknest">
                    View Repository <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Admin Portal
                </CardTitle>
                <CardDescription>HawkNest Admin Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive administrative tools for policy management and client services.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/m4r13y/hawknest-admin">
                    View Repository <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Insurance Platform
                </CardTitle>
                <CardDescription>The Insurance Hawk</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Public-facing platform for quotes, information, and initial client engagement.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/m4r13y/insurance-hawk">
                    View Repository <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Professionals</h2>
            <p className="text-xl text-muted-foreground">
              Our certifications and credentials ensure you receive the highest quality service.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto text-slate-800 mb-2" />
              <p className="font-semibold">Licensed</p>
              <p className="text-sm text-muted-foreground">Professional</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-slate-700 mb-2" />
              <p className="font-semibold">Certified</p>
              <p className="text-sm text-muted-foreground">Specialists</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-slate-800 mb-2" />
              <p className="font-semibold">Secure</p>
              <p className="text-sm text-muted-foreground">Platform</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto text-slate-800 mb-2" />
              <p className="font-semibold">Modern</p>
              <p className="text-sm text-muted-foreground">Technology</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/certifications">
                View Our Certifications <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Hawkins Insurance Group for their insurance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
    

    
