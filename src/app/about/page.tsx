import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Heart, 
  Shield, 
  Target, 
  Award, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Lightbulb,
  TrendingUp,
  CheckCircle
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              About Our Company
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hawkins Insurance Group
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your trusted partner in comprehensive insurance solutions, committed to protecting 
              what matters most to you and your family through personalized service and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded with a simple mission to make insurance accessible, understandable, and 
                  truly protective, Hawkins Insurance Group has grown from a local agency into a 
                  comprehensive insurance solutions provider.
                </p>
                <p>
                  Our journey began with the recognition that insurance should be more than just 
                  policies and premiums—it should be about peace of mind, security, and genuine 
                  protection for the people and assets that matter most to our clients.
                </p>
                <p>
                  Today, we leverage cutting-edge technology through our integrated ecosystem while 
                  maintaining the personal touch and expert guidance that has been our hallmark 
                  from the beginning.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Since 2018</h3>
                    <p className="text-muted-foreground">
                      Serving clients with integrity, expertise, and innovative solutions
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-slate-800">1,000+</div>
                      <div className="text-sm text-muted-foreground">Happy Clients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-700">50+</div>
                      <div className="text-sm text-muted-foreground">Insurance Carriers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">99%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Foundation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and the vision that drives us forward.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Target className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  To provide comprehensive, personalized insurance solutions that protect our 
                  clients' most valuable assets while delivering exceptional service through 
                  innovative technology and expert guidance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Lightbulb className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  To be the most trusted insurance partner in our communities, recognized for 
                  our integrity, innovation, and unwavering commitment to client success and 
                  protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 mx-auto text-slate-700 mb-4" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Integrity, transparency, client-first service, continuous innovation, and 
                  building lasting relationships based on trust and mutual respect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our unique approach combines traditional insurance expertise with modern technology 
              to deliver an unparalleled client experience.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Technology Innovation</Badge>
                <h3 className="text-2xl font-bold mb-4">Modern Insurance Ecosystem</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our integrated platform ecosystem—including client portals, administrative tools, 
                  and public interfaces—provides seamless service delivery and transparent 
                  communication throughout your insurance journey.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-700 flex-shrink-0" />
                    <span>24/7 online policy management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-700 flex-shrink-0" />
                    <span>Real-time claims tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-700 flex-shrink-0" />
                    <span>Instant quote generation</span>
                  </li>
                </ul>
              </div>
              <Card className="p-6">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 mx-auto text-slate-800 mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Digital Excellence</h4>
                  <p className="text-muted-foreground">
                    Cutting-edge technology platforms designed for efficiency and user experience
                  </p>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="p-6 lg:order-1">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto text-slate-800 mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Personal Service</h4>
                  <p className="text-muted-foreground">
                    Dedicated agents who understand your unique needs and provide tailored solutions
                  </p>
                </div>
              </Card>
              <div>
                <Badge variant="outline" className="mb-4">Client-Centered Approach</Badge>
                <h3 className="text-2xl font-bold mb-4">Personalized Insurance Solutions</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Every client receives personalized attention from licensed professionals who take 
                  the time to understand your specific needs, risks, and goals to create customized 
                  insurance strategies.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-700 flex-shrink-0" />
                    <span>Comprehensive risk assessment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-700 flex-shrink-0" />
                    <span>Customized coverage recommendations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-700 flex-shrink-0" />
                    <span>Ongoing policy reviews and updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced professionals committed to your success and protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">JH</span>
                </div>
                <CardTitle>John Hawkins</CardTitle>
                <CardDescription>Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  With over 15 years in the insurance industry, John founded Hawkins Insurance 
                  Group with a vision to revolutionize how insurance services are delivered.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">CLU</Badge>
                  <Badge variant="secondary">Licensed Agent</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">SM</span>
                </div>
                <CardTitle>Sarah Mitchell</CardTitle>
                <CardDescription>Operations Director</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Sarah oversees daily operations and client services, ensuring every interaction 
                  meets our high standards for quality and responsiveness.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">HIA</Badge>
                  <Badge variant="secondary">Operations</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">DT</span>
                </div>
                <CardTitle>David Thompson</CardTitle>
                <CardDescription>Technology Director</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  David leads our technology initiatives, developing and maintaining the 
                  innovative platforms that power our integrated ecosystem.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">Tech Lead</Badge>
                  <Badge variant="secondary">Innovation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our growth and development as a leading insurance provider.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold">2018</h3>
                    <Badge variant="outline">Foundation</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Hawkins Insurance Group founded with a mission to provide personalized, 
                    technology-enhanced insurance solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold">2020</h3>
                    <Badge variant="outline">Expansion</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Expanded service offerings to include Medicare Supplement, Life, and Health 
                    insurance with multiple carrier partnerships.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold">2022</h3>
                    <Badge variant="outline">Innovation</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Launched our integrated digital ecosystem with client and admin portals, 
                    revolutionizing our service delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold">2024</h3>
                    <Badge variant="outline">Recognition</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Achieved industry recognition for innovation in insurance technology and 
                    client service excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Connect With Us</CardTitle>
                <CardDescription>
                  Ready to learn more about how we can protect what matters most to you?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <Phone className="h-8 w-8 mx-auto text-slate-800" />
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                  <div className="space-y-2">
                    <Mail className="h-8 w-8 mx-auto text-slate-700" />
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">info@hawkinsinsurance.com</p>
                  </div>
                  <div className="space-y-2">
                    <MapPin className="h-8 w-8 mx-auto text-slate-800" />
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground">123 Business St<br />City, ST 12345</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="text-center">
                  <Button asChild>
                    <Link href="/contact">Get Started Today</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
