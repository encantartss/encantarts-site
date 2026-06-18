'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const quickReplies = [
  'Quero fazer um orçamento',
  'Qual o prazo de produção?',
  'Como personalizo meu pedido?',
  'Quero montar um Kit Festa',
]

const botAnswers: Record<string, string> = {
  'Quero fazer um orçamento':
    'Que delícia! Posso te ajudar a montar tudo. Me conta: qual o tema e a data da sua festa? Você também pode usar nosso configurador de Kit Festa.',
  'Qual o prazo de produção?':
    'O prazo aparece em cada produto, viu? Em geral leva de 4 a 10 dias úteis após a aprovação da arte. Capricho leva um tempinho!',
  'Como personalizo meu pedido?':
    'Na página de cada produto você preenche nome, idade, tema e ainda envia fotos e referências. Fica com a sua cara!',
  'Quero montar um Kit Festa':
    'Adoro! No nosso configurador você escolhe topo, forminhas, toppers e muito mais, e vê o preço atualizar na hora. Quer que eu te leve até lá?',
}

type Msg = { from: 'bot' | 'user'; text: string }

export function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: 'bot',
      text: 'Oi, eu sou a Encantinha! Sou a assistente da Encantart\u2019s e vou te ajudar a criar algo encantador. Como posso ajudar?',
    },
  ])
  const [input, setInput] = useState('')

  function send(text: string) {
    if (!text.trim()) return
    const answer =
      botAnswers[text] ??
      'Que pergunta especial! Vou chamar nossa equipe para te atender com todo o carinho pelo WhatsApp. Enquanto isso, dá uma olhada nas categorias!'
    setMessages((m) => [...m, { from: 'user', text }, { from: 'bot', text: answer }])
    setInput('')
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        <a
          href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Vim%20do%20site%20da%20Encantart's"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="size-7" />
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir assistente Encantinha"
          className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-primary shadow-lg ring-2 ring-background transition-transform hover:scale-105"
        >
          {open ? (
            <X className="size-6 text-primary-foreground" />
          ) : (
            <Image
              src="/images/encantinha-mascote.png"
              alt="Encantinha"
              width={56}
              height={56}
              className="size-full object-cover"
            />
          )}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <Image
              src="/images/encantinha-mascote.png"
              alt="Encantinha"
              width={40}
              height={40}
              className="size-10 rounded-full bg-white/20 object-cover"
            />
            <div>
              <p className="font-heading text-sm font-bold">Encantinha</p>
              <p className="text-xs opacity-90">Assistente virtual • online</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-primary/40 bg-background px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
            />
            <Button type="submit" size="icon" aria-label="Enviar" className="rounded-full">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
