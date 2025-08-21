"use client"

import { motion } from "framer-motion"
import { Star, ArrowRight, Shield, Heart, Users, TrendingDown } from "lucide-react"
import { useState } from "react"

const stories = [
  {
    company: "The Johnson Family",
    industry: "Medicare Supplement",
    results: {
      revenue: "$2,400",
      leads: "100%",
      conversion: "0%",
    },
    quote:
      "We were both new to Medicare and had delayed enrollment due to our employer coverage. Hawkins Insurance Group helped us fully transition all our insurance for a smooth Medicare transition. We're saving thousands while getting better coverage than we ever had before.",
    author: "Robert & Mary Johnson",
    position: "Retirees",
    image: "/success-stories/HIG-Clients-2.jpg",
    metrics: [
      { label: "Annual Savings", before: "$0", after: "$4,400" },
      { label: "Out-of-Pocket Max", before: "$8,500", after: "$3,200" },
      { label: "Prescription Coverage", before: "Limited", after: "Full" },
    ],
  },
  {
    company: "Linda Thompson",
    industry: "Short Term Care Insurance",
    results: {
      revenue: "25%",
      leads: "100%",
      conversion: "100%",
    },
    quote:
      "Hawkins Insurance Group helped me review my coverage and add a short term care plan to fill my long-term care gap. Now I have peace of mind knowing I'm protected.",
    author: "Linda Thompson",
    position: "Retiree",
    image: "/success-stories/HIG-Clients-3.jpg",
    metrics: [
      { label: "LTC Gap Coverage", before: "None", after: "Complete Coverage" },
      { label: "Care Benefit Amount", before: "$0/day", after: "$1000/day" },
      { label: "Peace of Mind", before: "Worried", after: "Protected" },
    ],
  },
  {
    company: "Ladies in Midland",
    industry: "Medicare & Cancer Insurance",
    results: {
      revenue: "15%",
      leads: "100%",
      conversion: "100%",
    },
    quote: "Hawkins Insurance Group answered all our questions, reviewed our coverages, talked about the importance of cancer insurance, and helped one of us plan for Medicare. We feel so much more prepared now.",
    author: "Sarah & Patricia",
    position: "Midland Residents",
    image: "/success-stories/HIG-Clients-4.jpg",
    metrics: [
      { label: "Coverage Review", before: "Incomplete", after: "Complete" },
      { label: "Cancer Protection", before: "None", after: "Covered" },
      { label: "Medicare Planning", before: "Confused", after: "Prepared" },
    ],
  },
]

export default function SuccessStoriesRedesign() {
  const [activeStory, setActiveStory] = useState(0)

  return (
    <section className="pt-32 pb-16 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Protecting Families, Securing Futures
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            See how we've helped families and businesses secure the insurance coverage they need at prices they can afford.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveStory(index)}
              className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                activeStory === index
                  ? "bg-gradient-to-br from-slate-700/20 to-slate-800/20 border-slate-600/30"
                  : "bg-slate-900/30 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">{story.company}</h3>
                  <p className="text-sm text-slate-400">{story.industry}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{story.results.revenue}</div>
                  <div className="text-xs text-slate-400">Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-300">{story.results.leads}</div>
                  <div className="text-xs text-slate-400">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-300">{story.results.conversion}</div>
                  <div className="text-xs text-slate-400">Satisfaction</div>
                </div>
              </div>

              <div className="flex items-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">"{story.quote}"</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-sm">{story.author}</p>
                  <p className="text-slate-400 text-xs">{story.position}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        <motion.div
          key={activeStory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl p-8 border border-slate-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">{stories[activeStory].company} Success Story</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">"{stories[activeStory].quote}"</p>

              <div className="space-y-4">
                {stories[activeStory].metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                    <span className="text-slate-400">{metric.label}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-500">{metric.before}</span>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                      <span className="text-green-400 font-bold">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden">
                <img
                  src={stories[activeStory].image || "/placeholder.svg"}
                  alt={`${stories[activeStory].company} results`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
