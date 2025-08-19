import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">The Insurance Hawk</span>
                <span className="text-xs text-slate-400">Hawkins Insurance Group</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner for comprehensive insurance solutions. Licensed professionals 
              providing expert guidance and personalized service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-slate-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-200 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/ecosystem" className="text-slate-400 hover:text-white transition-colors">Ecosystem</Link></li>
              <li><Link href="/certifications" className="text-slate-400 hover:text-white transition-colors">Certifications</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Insurance Services</h3>
            <ul className="space-y-2">
              <li><span className="text-slate-400">Medicare Supplement</span></li>
              <li><span className="text-slate-400">Life Insurance</span></li>
              <li><span className="text-slate-400">Health Insurance</span></li>
              <li><span className="text-slate-400">Dental Coverage</span></li>
              <li><span className="text-slate-400">Cancer Insurance</span></li>
              <li><span className="text-slate-400">Hospital Indemnity</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">info@hawkinsinsurance.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">123 Business St, City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2024 Hawkins Insurance Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
