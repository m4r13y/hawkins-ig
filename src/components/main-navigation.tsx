import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MainNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-slate-900">The Insurance Hawk</span>
                <span className="text-xs text-slate-600 font-medium">Hawkins Insurance Group</span>
              </div>
            </Link>
          </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-700 hover:text-slate-900 font-medium text-sm uppercase tracking-wide transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info & CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-slate-800" />
              <span className="font-medium">(555) 123-4567</span>
            </div>
          </div>
          <Button 
            asChild
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded font-medium text-sm uppercase tracking-wide"
          >
            <Link href="/contact">Get Quote</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white">
            <div className="flex flex-col space-y-6 pt-6">
              <Link href="/" className="flex items-center space-x-3 pb-6 border-b">
                <div className="h-10 w-10 bg-slate-800 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-slate-900">The Insurance Hawk</span>
                  <span className="text-xs text-slate-600">Hawkins Insurance Group</span>
                </div>
              </Link>
              
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-700 hover:text-slate-900 font-medium text-base py-2 border-b border-slate-100 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Phone className="h-4 w-4 text-slate-800" />
                  <span className="font-medium">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Mail className="h-4 w-4 text-slate-800" />
                  <span className="text-sm">info@hawkinsinsurance.com</span>
                </div>
                <Button 
                  asChild 
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded font-medium"
                >
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
