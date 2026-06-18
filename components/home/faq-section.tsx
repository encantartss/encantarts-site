import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/data'

export function FaqSection() {
  return (
    <section id="faq" className="bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <div className="mb-8 text-center">
          <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tudo o que você precisa saber antes de encomendar
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-heading text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
