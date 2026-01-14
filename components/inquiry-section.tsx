"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function InquirySection() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    toast.success("Request sent! We'll locate this pair for you.")
    // Reset form logic here would go here
  }

  return (
    <section className="py-32 relative overflow-hidden bg-black border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full pointer-events-none translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div>
              <span className="text-primary tracking-widest text-sm font-bold uppercase mb-4 block">The Concierge</span>
              <h2 className="text-5xl md:text-7xl font-display text-white tracking-wide leading-[0.9]">
                CAN'T FIND <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">YOUR GRAIL?</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              From unreleased samples to regional exclusives, our sourcing team in Manila and Tokyo can track down any pair. Tell us what you need.
            </p>

            <div className="flex flex-col gap-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                   <Send className="w-5 h-5 -rotate-12" />
                </div>
                <div>
                   <h4 className="text-white font-bold uppercase tracking-wide">Direct Sourcing</h4>
                   <p className="text-sm text-muted-foreground">We respond within 24 hours with a quote.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 w-full max-w-xl">
             <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/60">Your Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/60">Contact EmailOr Number</label>
                      <input 
                        required
                        type="text" 
                        placeholder="john@example.com"
                        className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-white/60">Product Details</label>
                   <input 
                      required
                      type="text" 
                      placeholder="e.g. Jordan 1 Lost & Found, Size 10"
                      className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-white/60">Budget / Notes</label>
                   <textarea 
                      rows={4}
                      placeholder="Any specific condition or budget requirements?"
                      className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 resize-none"
                   />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 bg-primary text-black font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Submit Inquiry"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </Button>
             </form>
          </div>

        </div>
      </div>
    </section>
  )
}
