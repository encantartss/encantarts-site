import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { categories } from '@/lib/data'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/encantinha-mascote.png"
                alt="Encantinha, mascote da Encantart's"
                width={44}
                height={44}
                className="size-10 rounded-full object-cover"
              />
              <span className="font-heading text-xl font-bold text-primary">
                Encantart&apos;s
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A fantástica arte de encantar. Criando momentos especiais através da
              papelaria personalizada há 8 anos.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FacebookIcon className="size-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide">
              Categorias
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categorias/${c.slug}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide">
              Ajuda
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#como-funciona" className="text-muted-foreground hover:text-primary">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-primary">
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link href="/kit-festa" className="text-muted-foreground hover:text-primary">
                  Montar Kit Festa
                </Link>
              </li>
              <li>
                <Link href="/orcamento" className="text-muted-foreground hover:text-primary">
                  Fazer orçamento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                (00) 00000-0000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                contato@encantarts.com.br
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                Atendimento online para todo o Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Encantart&apos;s Papelaria Criativa. Todos os
            direitos reservados.
          </p>
          <p>Feito com carinho para encantar.</p>
        </div>
      </div>
    </footer>
  )
}
