import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Calendar,
  Shield,
  Users,
  CheckCircle,
  Star,
  Globe,
  ChevronRight
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Get Started
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Ready to secure your future? Our insurance experts are here to help you find 
              the perfect coverage for your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call Now: (555) 123-4567
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Multiple Ways to Connect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the method that works best for you. We're here to help in whatever way is most convenient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle>Phone</CardTitle>
                <CardDescription>Speak with an expert now</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-800 mb-2">(555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-6PM</p>
                <p className="text-sm text-muted-foreground">Sat: 9AM-2PM</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 mx-auto text-slate-700 mb-4" />
                <CardTitle>Email</CardTitle>
                <CardDescription>Get detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-slate-700 mb-2">info@hawkinsinsurance.com</p>
                <p className="text-sm text-muted-foreground">Typically respond within</p>
                <p className="text-sm text-muted-foreground">2-4 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 mx-auto text-slate-800 mb-4" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Instant assistance online</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-slate-800 mb-2">Available Now</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-6PM</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 mx-auto text-orange-600 mb-4" />
                <CardTitle>Schedule</CardTitle>
                <CardDescription>Book a consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-orange-600 mb-2">Free Consultation</p>
                <p className="text-sm text-muted-foreground">In-person or virtual</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your insurance needs and we'll get back to you with personalized 
                  recommendations and quotes.
                </p>
                
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Enter your last name" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email address" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="insurance-type">Insurance Type</Label>
                        <select 
                          id="insurance-type" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select insurance type</option>
                          <option value="medicare">Medicare Supplement</option>
                          <option value="life">Life Insurance</option>
                          <option value="health">Health Insurance</option>
                          <option value="dental">Dental Insurance</option>
                          <option value="cancer">Cancer Insurance</option>
                          <option value="hospital">Hospital Indemnity</option>
                          <option value="multiple">Multiple Types</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us about your insurance needs, questions, or how we can help you..."
                          rows={5}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="consent" 
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="consent" className="text-sm">
                          I agree to receive communications from Hawkins Insurance Group regarding 
                          insurance quotes and services.
                        </Label>
                      </div>
                      
                      <Button type="submit" className="w-full text-lg py-3">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information & Benefits */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Why Choose Hawkins Insurance?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Licensed Professionals</h4>
                        <p className="text-sm text-muted-foreground">
                          All our agents are fully licensed and certified insurance professionals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Multiple Carrier Options</h4>
                        <p className="text-sm text-muted-foreground">
                          We work with 50+ insurance carriers to find you the best rates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">No-Cost Consultation</h4>
                        <p className="text-sm text-muted-foreground">
                          Initial consultations and quotes are always free with no obligation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Ongoing Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Continued service and support throughout your policy lifetime
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Office Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold">Hawkins Insurance Group</p>
                      <p className="text-muted-foreground">
                        123 Business Street<br />
                        Suite 456<br />
                        City, State 12345
                      </p>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Business Hours</span>
                        </div>
                        <div className="text-sm space-y-1 ml-6">
                          <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                          <p>Saturday: 9:00 AM - 2:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Emergency Claims
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Need to file a claim outside business hours? Our emergency claims hotline 
                      is available 24/7.
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-red-600">Emergency: (555) 999-8888</p>
                      <p className="text-sm text-muted-foreground">Available 24/7 for urgent claims</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quick answers to common questions about our services and process.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How quickly can I get a quote?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most quotes can be generated instantly through our online platform. For more 
                    complex coverage needs, we can provide detailed quotes within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you charge fees for consultations?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No, initial consultations and quotes are always free. We're compensated by 
                    insurance carriers, so our services cost you nothing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can you help with existing policies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolutely! We can review your existing coverage, help with claims, and 
                    recommend improvements or cost savings opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What areas do you serve?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We're licensed to serve clients in multiple states. Contact us to confirm 
                    availability in your area and learn about local insurance options.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Hawkins Insurance made the Medicare process so much easier. Their team 
                  explained everything clearly and found me excellent coverage at a great price."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mary Johnson</p>
                    <p className="text-sm text-muted-foreground">Medicare Client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Outstanding service! They helped me secure life insurance for my family 
                  and provided ongoing support when I needed to make changes."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">RS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Robert Smith</p>
                    <p className="text-sm text-muted-foreground">Life Insurance Client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The online portal makes managing my policies so convenient. Professional 
                  service with modern technology - exactly what I was looking for."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">LB</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Brown</p>
                    <p className="text-sm text-muted-foreground">Health Insurance Client</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied clients who trust Hawkins Insurance Group 
              to protect what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Globe className="mr-2 h-5 w-5" />
                Get Online Quote
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free consultation • No obligation • Licensed professionals
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
