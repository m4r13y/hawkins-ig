"use client"

import { motion } from "framer-motion"
import { Star, ArrowRight, Shield, Heart, Users, TrendingDown } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"

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
  const featureCardRef = useRef<HTMLDivElement>(null)

  const handleStoryClick = (index: number) => {
    setActiveStory(index)
    // Scroll to the feature card with offset
    if (featureCardRef.current) {
      const y = featureCardRef.current.getBoundingClientRect().top + window.pageYOffset - 150
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Hero Header Section */}
      <section className="pt-32 pb-8 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Protecting Families, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Securing Futures</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              See how we've helped families and businesses secure the insurance coverage they need at prices they can afford.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pt-5 pb-20 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleStoryClick(index)}
              className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                activeStory === index
                  ? "bg-card/80 border-border shadow-lg"
                  : "bg-card/50 border-border hover:border-border/80 hover:bg-card/70"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <Image 
                    src={story.image} 
                    alt={story.company}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    priority={index === 0} // Priority load for first image
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-foreground">{story.company}</h3>
                  <p className="text-sm text-muted-foreground">{story.industry}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{story.results.revenue}</div>
                  <div className="text-xs text-muted-foreground">Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground dark:text-foreground/80">{story.results.leads}</div>
                  <div className="text-xs text-muted-foreground">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground dark:text-foreground/80">{story.results.conversion}</div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
              </div>

              <div className="flex items-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-foreground dark:text-foreground/90 text-sm leading-relaxed mb-4">"{story.quote}"</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium text-sm">{story.author}</p>
                  <p className="text-muted-foreground text-xs">{story.position}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        <motion.div
          ref={featureCardRef}
          key={activeStory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-3xl p-8 border border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">{stories[activeStory].company} Success Story</h3>
              <p className="text-foreground dark:text-foreground/90 text-lg leading-relaxed mb-6">"{stories[activeStory].quote}"</p>

              <div className="space-y-4">
                {stories[activeStory].metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/50">
                    <span className="text-muted-foreground font-medium">{metric.label}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground dark:text-muted-foreground/70">{metric.before}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground dark:text-muted-foreground/70" />
                      <span className="text-primary font-bold">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
                <Image
                  src={stories[activeStory].image || "/placeholder.svg"}
                  alt={`${stories[activeStory].company} results`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-center-top"
                  priority={true} // Priority load for main display image
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
    </>
  )
}

