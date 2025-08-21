"use client"

import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import MedicareDisclaimer from './medicare-disclaimer'

export default function ComplianceFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      {/* Medicare Disclaimer Section */}
      <div className="border-b border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MedicareDisclaimer variant="footer" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Hawkins Insurance Group</h3>
            <p className="text-sm text-slate-400">
              Your trusted partner for Medicare insurance solutions. Licensed independent insurance agency 
              committed to helping you find the right coverage.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-slate-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>[Your Phone Number]</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@hawkinsinsurancegroup.com</span>
              </div>
              <div className="flex items-center text-slate-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>[Your Business Address]</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Medicare Supplement</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Medicare Advantage</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Medicare Part D</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Life Insurance</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Dental Insurance</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Cancer Insurance</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/team" className="text-slate-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/success-stories" className="text-slate-400 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/get-started" className="text-slate-400 hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal & Compliance</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/accessibility" className="text-slate-400 hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link href="/hipaa" className="text-slate-400 hover:text-white transition-colors">HIPAA Notice</Link></li>
              <li>
                <a 
                  href="https://www.medicare.gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Medicare.gov <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance & Legal Notices */}
      <div className="border-t border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-xs text-slate-500">
            
            {/* License Information */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-medium text-slate-300 mb-2">License Information</h4>
              <p>
                Hawkins Insurance Group is a licensed insurance agency. All insurance agents are licensed 
                in their respective states. License numbers available upon request and can be verified 
                through your state's insurance department website.
              </p>
            </div>

            {/* Additional Disclaimers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-medium text-slate-300 mb-2">Insurance Disclosure</h4>
                <p>
                  Insurance plans have limitations and exclusions. Please review plan documents carefully. 
                  Not all plans are available in all areas. Coverage and premiums may vary by location.
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-medium text-slate-300 mb-2">Website Compliance</h4>
                <p>
                  This website complies with ADA accessibility guidelines, HIPAA privacy requirements, 
                  and Medicare marketing regulations. We are committed to providing equal access to all users.
                </p>
              </div>
            </div>

            {/* Copyright and Final Legal */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-700">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p>&copy; {currentYear} Hawkins Insurance Group. All rights reserved.</p>
                <p className="mt-1">
                  Licensed insurance agency. Not affiliated with or endorsed by Medicare or any government agency.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-slate-600">Powered by</span>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors font-medium">
                  Hawkins IG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
