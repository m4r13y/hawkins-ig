"use client"

import { motion } from "framer-motion"
import { Heart, Users, Building, Shield, Phone, Plus } from "lucide-react"

const services = [
  {
    title: "Medicare Plans",
    description: "Comprehensive Medicare coverage including supplements, advantage plans, and prescription drug coverage.",
    icon: <Heart className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    title: "Group Insurance", 
    description: "Competitive group benefits for your employees with access to major national carriers.",
    icon: <Building className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    title: "Family Health",
    description: "Zero-deductible, guaranteed renewable health plans that give families more control over healthcare costs.",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    title: "Dental & Vision",
    description: "Affordable dental and vision coverage to complement your health insurance.",
    icon: <Shield className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    title: "Life Insurance",
    description: "Term and permanent life insurance options to protect your family's financial future.",
    icon: <Phone className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    title: "Additional Coverage",
    description: "Supplement plans including hospital indemnity, cancer insurance, and accident coverage.",
    icon: <Plus className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
]

export default function InsuranceServices() {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Insurance Solutions for Every Need
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive coverage options tailored to protect what matters most to you and your family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`bg-gradient-to-br ${service.gradient} border border-gray-800/50 rounded-3xl p-8 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-300 group`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-white">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Free Consultation</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Multiple Carriers</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Ongoing Support</span>
                  <span className="text-green-400">✓</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-lg py-3 px-6 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
