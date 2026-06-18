import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingAssistant } from '@/components/floating-assistant'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { ProductCarousel } from '@/components/home/product-carousel'
import { KitFestaSection } from '@/components/home/kit-festa-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FaqSection } from '@/components/home/faq-section'
import { getBestSellers, getNewArrivals } from '@/lib/data'

export default function HomePage() {
  const bestSellers = getBestSellers()
  const newArrivals = getNewArrivals()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <ProductCarousel
          title="Mais vendidos"
          subtitle="Os queridinhos das nossas clientes"
          products={bestSellers}
          ctaHref="/categorias"
          className="bg-muted/40"
        />
        <KitFestaSection />
        <ProductCarousel
          title="Lançamentos"
          subtitle="Novidades fresquinhas para encantar"
          products={newArrivals}
          ctaHref="/categorias"
        />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <FloatingAssistant />
    </div>
  )
}
