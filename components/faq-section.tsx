import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    question: "Do all products listed come with a guarantee of authenticity?",
    answer: "Yes. We guarantee that every item we sell is 100% authentic. We source our products directly from authorized retailers and trusted partners."
  },
  {
    question: "How long does shipping take?",
    answer: "For in-stock items, we ship within 1-2 business days. Delivery within Metro Manila takes 2-3 days, while provincial orders take 5-7 days. Pre-order/Vault items have their own specific release and shipping timelines."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns for size exchanges within 7 days of delivery, provided the item is unworn and in its original packaging. All Vault/Pre-order sales are final."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we primarily serve the Philippines market. International shipping is available on a case-by-case basis. Please contact support for a quote."
  },
  {
    question: "How do Vault drops work?",
    answer: "Vault drops are exclusive pre-order releases for highly sought-after pairs. You secure your pair by paying in advance. Since slots are limited, these are first-come, first-served."
  }
]

export function FaqSection() {
  return (
    <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="container mx-auto max-w-4xl">
         <div className="text-center mb-16">
            <span className="text-primary tracking-widest text-sm font-bold uppercase mb-2 block">Support</span>
            <h2 className="text-4xl md:text-5xl font-display tracking-wider text-white">
                Frequently Asked <span className="text-muted-foreground">Questions</span>
            </h2>
         </div>
         
         <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-4 md:px-6 py-2 rounded-sm bg-white/5 data-[state=open]:bg-white/10 transition-colors">
                <AccordionTrigger className="text-lg font-medium text-left hover:text-primary transition-colors hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
         </Accordion>
      </div>
    </section>
  )
}
