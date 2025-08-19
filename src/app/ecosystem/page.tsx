import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  Shield, 
  Globe, 
  Database, 
  Lock, 
  Monitor, 
  Smartphone,
  FileText,
  Settings,
  BarChart3,
  CreditCard,
  Github
} from "lucide-react";

export default function EcosystemPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Integrated Insurance Ecosystem
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Professional Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Three interconnected platforms working together to provide seamless insurance services 
              for clients, administrators, and public engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Insurance Hawk Brand</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              "The Insurance Hawk" represents our commitment to sharp insight, comprehensive coverage, 
              and vigilant protection of our clients' interests across all platforms.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-slate-800" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Client-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated tools and interfaces designed for optimal client experience
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-slate-800" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security across all platforms and touchpoints
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interconnected</h3>
                <p className="text-sm text-muted-foreground">
                  Seamless data flow and communication between all ecosystem components
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Details */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            
            {/* Client Portal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Client Portal</Badge>
                <h3 className="text-3xl font-bold mb-4">HawkNest Client Platform</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  A secure, user-friendly portal where clients can manage their insurance policies, 
                  view documents, track claims, and communicate with their agents.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-slate-800" />
                    <span>Policy document management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-slate-800" />
                    <span>Claims tracking and status updates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-slate-800" />
                    <span>Premium payments and billing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-slate-800" />
                    <span>Secure messaging with agents</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="https://github.com/m4r13y/hawknest">
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </Link>
                  </Button>
                  <Button variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-slate-800" />
                      <span className="font-medium">Client Dashboard</span>
                    </div>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Policy Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Claims Tracking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Document Access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Mobile App (Coming Soon)</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Admin Portal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="p-6 lg:order-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-slate-800" />
                      <span className="font-medium">Admin Control Panel</span>
                    </div>
                    <Badge variant="secondary">Enterprise</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">User Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Policy Administration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Analytics & Reporting</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Compliance Tools</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div>
                <Badge variant="outline" className="mb-4">Admin Portal</Badge>
                <h3 className="text-3xl font-bold mb-4">HawkNest Admin Platform</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Comprehensive administrative tools for managing clients, policies, claims, 
                  and business operations with advanced analytics and reporting capabilities.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-slate-800" />
                    <span>Client and policy database management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-slate-800" />
                    <span>Administrative workflow automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-slate-800" />
                    <span>Advanced analytics and reporting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-slate-800" />
                    <span>Role-based access control</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="https://github.com/m4r13y/hawknest-admin">
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </Link>
                  </Button>
                  <Button variant="outline">
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Public Platform */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Public Platform</Badge>
                <h3 className="text-3xl font-bold mb-4">The Insurance Hawk</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our public-facing platform providing insurance quotes, educational resources, 
                  and the first point of contact for potential clients seeking insurance solutions.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-slate-700" />
                    <span>Instant insurance quotes and comparisons</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-slate-700" />
                    <span>Educational resources and guides</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-5 w-5 text-slate-700" />
                    <span>Responsive design for all devices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="h-5 w-5 text-slate-700" />
                    <span>Lead generation and client onboarding</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="https://github.com/m4r13y/insurance-hawk">
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </Link>
                  </Button>
                  <Button variant="outline">
                    Visit Live Site
                  </Button>
                </div>
              </div>
              
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-slate-700" />
                      <span className="font-medium">Public Interface</span>
                    </div>
                    <Badge variant="secondary">Public</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Quote Generation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Educational Content</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Contact Forms</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">SEO Optimized</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our ecosystem leverages cutting-edge technologies to ensure security, 
              scalability, and exceptional user experience across all platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-6 w-6 text-slate-800" />
                </div>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>
                  React, Next.js, TypeScript, Tailwind CSS for responsive and modern interfaces
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-slate-800" />
                </div>
                <CardTitle>Backend</CardTitle>
                <CardDescription>
                  Node.js, Firebase, serverless functions for scalable and reliable services
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Enterprise-grade security, encryption, and compliance with industry standards
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Our Ecosystem?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discover how our integrated platforms can streamline your insurance operations 
            and enhance client satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800" asChild>
              <Link href="/about">Learn About Our Company</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
