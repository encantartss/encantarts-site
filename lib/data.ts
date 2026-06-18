// Catálogo de dados da loja (mock). Na Fase 2 isso vem do PostgreSQL via Prisma.

export type Category = {
  slug: string
  name: string
  description: string
  image: string
  subcategories?: string[]
}

export type Review = {
  id: string
  name: string
  rating: number
  text: string
  date: string
}

export type Product = {
  slug: string
  name: string
  category: string
  categoryName: string
  price: number
  oldPrice?: number
  image: string
  description: string
  longDescription: string
  productionDays: number
  rating: number
  reviewsCount: number
  badges?: ('mais-vendido' | 'lancamento' | 'promocao')[]
  customFields: CustomField[]
}

export type CustomField = {
  id: string
  label: string
  type: 'text' | 'number' | 'date' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
}

export const categories: Category[] = [
  {
    slug: 'topos-de-bolo',
    name: 'Topos de Bolo',
    description: 'Topos temáticos, florais, luxo e 3D para deixar seu bolo inesquecível.',
    image: '/images/cat-topo-bolo.png',
    subcategories: ['Temáticos', 'Florais', 'Luxo', '3D'],
  },
  {
    slug: 'kits-festa',
    name: 'Kits Festa',
    description: 'Kits completos Simples e Luxo, montados do seu jeito.',
    image: '/images/cat-kit-festa.png',
    subcategories: ['Simples', 'Luxo'],
  },
  {
    slug: 'agendas',
    name: 'Agendas',
    description: 'Femininas, masculinas, escolares e por profissões.',
    image: '/images/cat-agendas.png',
    subcategories: ['Femininas', 'Masculinas', 'Escolares', 'Profissões'],
  },
  {
    slug: 'bottons',
    name: 'Bottons',
    description: 'Bottons personalizados nos tamanhos 32mm, 44mm e 58mm.',
    image: '/images/cat-bottons.png',
    subcategories: ['32 mm', '44 mm', '58 mm'],
  },
  {
    slug: 'chaveiros-espelho',
    name: 'Chaveiros Espelho',
    description: 'Chaveiros espelho personalizados com foto e arte.',
    image: '/images/cat-chaveiros.png',
  },
  {
    slug: 'cadernos',
    name: 'Cadernos',
    description: 'Cadernos personalizados com a sua cara.',
    image: '/images/cat-cadernos.png',
  },
  {
    slug: 'devocionais',
    name: 'Devocionais',
    description: 'Devocionais personalizados para momentos de fé.',
    image: '/images/cat-cadernos.png',
  },
  {
    slug: 'biblia',
    name: 'Bíblia',
    description: 'Bíblias personalizadas com capa exclusiva.',
    image: '/images/cat-cadernos.png',
  },
  {
    slug: 'diario',
    name: 'Diário',
    description: 'Diários personalizados para guardar memórias.',
    image: '/images/cat-cadernos.png',
  },
  {
    slug: 'livro-de-colorir',
    name: 'Livro de Colorir',
    description: 'Livros de colorir criativos e personalizados.',
    image: '/images/cat-cadernos.png',
  },
  {
    slug: 'copa-2026',
    name: 'Copa 2026',
    description: 'Coleção especial Copa 2026 personalizada.',
    image: '/images/cat-bottons.png',
  },
]

const baseFields: CustomField[] = [
  { id: 'nome', label: 'Nome', type: 'text', required: true, placeholder: 'Ex: Maria Clara' },
  { id: 'idade', label: 'Idade', type: 'number', placeholder: 'Ex: 5' },
  { id: 'tema', label: 'Tema', type: 'text', placeholder: 'Ex: Jardim Encantado' },
  { id: 'data-festa', label: 'Data da Festa', type: 'date' },
  {
    id: 'tamanho-bolo',
    label: 'Tamanho do Bolo',
    type: 'select',
    options: ['Não se aplica', 'Pequeno (15cm)', 'Médio (20cm)', 'Grande (25cm)', 'Andar duplo'],
  },
  { id: 'observacoes', label: 'Observações', type: 'textarea', placeholder: 'Detalhes, cores preferidas, referências...' },
]

export const products: Product[] = [
  {
    slug: 'topo-de-bolo-jardim-encantado',
    name: 'Topo de Bolo Jardim Encantado',
    category: 'topos-de-bolo',
    categoryName: 'Topos de Bolo',
    price: 49.9,
    oldPrice: 64.9,
    image: '/images/cat-topo-bolo.png',
    description: 'Topo de bolo floral com nome e idade personalizados em dourado.',
    longDescription:
      'Topo de bolo confeccionado em papel especial com acabamento dourado, perfeito para festas temáticas de jardim. Personalize com nome, idade e cores. Estrutura resistente e fácil de fixar.',
    productionDays: 5,
    rating: 4.9,
    reviewsCount: 128,
    badges: ['mais-vendido'],
    customFields: baseFields,
  },
  {
    slug: 'topo-de-bolo-luxo-dourado',
    name: 'Topo de Bolo Luxo Dourado 3D',
    category: 'topos-de-bolo',
    categoryName: 'Topos de Bolo',
    price: 79.9,
    image: '/images/cat-topo-bolo.png',
    description: 'Topo 3D premium com detalhes em dourado e camadas em relevo.',
    longDescription:
      'Topo de bolo 3D com camadas em relevo e acabamento dourado premium. Ideal para festas luxo. Cada peça é produzida sob medida com altíssimo padrão de acabamento.',
    productionDays: 7,
    rating: 5,
    reviewsCount: 64,
    badges: ['lancamento'],
    customFields: baseFields,
  },
  {
    slug: 'kit-festa-completo-luxo',
    name: 'Kit Festa Completo Luxo',
    category: 'kits-festa',
    categoryName: 'Kits Festa',
    price: 189.9,
    oldPrice: 229.9,
    image: '/images/cat-kit-festa.png',
    description: 'Kit completo: topo, forminhas, toppers, tags, porta bis e mais.',
    longDescription:
      'Kit festa luxo com tudo que você precisa para decorar sua mesa: topo de bolo, forminhas, toppers, tags, porta bis personalizados e acabamentos especiais. Monte do seu jeito no configurador.',
    productionDays: 10,
    rating: 4.8,
    reviewsCount: 92,
    badges: ['mais-vendido'],
    customFields: baseFields,
  },
  {
    slug: 'agenda-feminina-2026',
    name: 'Agenda Feminina 2026 Personalizada',
    category: 'agendas',
    categoryName: 'Agendas',
    price: 89.9,
    image: '/images/cat-agendas.png',
    description: 'Agenda 2026 com capa personalizada e nome em dourado.',
    longDescription:
      'Agenda 2026 com planejamento mensal e semanal, capa dura personalizada com seu nome em foil dourado, marcador de páginas e adesivos exclusivos. Estilo delicado e funcional.',
    productionDays: 6,
    rating: 4.9,
    reviewsCount: 210,
    badges: ['mais-vendido', 'lancamento'],
    customFields: [
      { id: 'nome', label: 'Nome', type: 'text', required: true, placeholder: 'Ex: Ana Beatriz' },
      { id: 'cor', label: 'Cor da capa', type: 'select', options: ['Rosa', 'Tiffany', 'Lilás', 'Branco'] },
      { id: 'observacoes', label: 'Observações', type: 'textarea', placeholder: 'Detalhes adicionais...' },
    ],
  },
  {
    slug: 'botton-44mm',
    name: 'Botton Personalizado 44mm',
    category: 'bottons',
    categoryName: 'Bottons',
    price: 7.9,
    image: '/images/cat-bottons.png',
    description: 'Botton 44mm com sua arte ou foto personalizada.',
    longDescription:
      'Botton de 44mm com acabamento metálico e impressão de alta qualidade. Perfeito para lembrancinhas e brindes. Envie sua arte ou foto.',
    productionDays: 4,
    rating: 4.7,
    reviewsCount: 340,
    customFields: [
      { id: 'tema', label: 'Tema/Arte', type: 'text', placeholder: 'Ex: Aniversário 5 anos' },
      { id: 'quantidade-obs', label: 'Observações', type: 'textarea' },
    ],
  },
  {
    slug: 'chaveiro-espelho-foto',
    name: 'Chaveiro Espelho com Foto',
    category: 'chaveiros-espelho',
    categoryName: 'Chaveiros Espelho',
    price: 12.9,
    image: '/images/cat-chaveiros.png',
    description: 'Chaveiro espelho personalizado com sua foto preferida.',
    longDescription:
      'Chaveiro espelho de bolsa com foto personalizada de um lado e espelho do outro. Acabamento premium. Ótima lembrancinha.',
    productionDays: 5,
    rating: 4.8,
    reviewsCount: 156,
    badges: ['promocao'],
    customFields: [
      { id: 'nome', label: 'Nome (opcional)', type: 'text' },
      { id: 'observacoes', label: 'Observações', type: 'textarea' },
    ],
  },
  {
    slug: 'caderno-personalizado',
    name: 'Caderno Personalizado Premium',
    category: 'cadernos',
    categoryName: 'Cadernos',
    price: 54.9,
    image: '/images/cat-cadernos.png',
    description: 'Caderno com capa dura e nome personalizado.',
    longDescription:
      'Caderno premium com capa dura personalizada, 200 páginas pautadas e acabamento em foil dourado. Ideal para estudos e trabalho.',
    productionDays: 6,
    rating: 4.9,
    reviewsCount: 88,
    badges: ['lancamento'],
    customFields: [
      { id: 'nome', label: 'Nome', type: 'text', required: true },
      { id: 'cor', label: 'Cor', type: 'select', options: ['Rosa', 'Tiffany', 'Lilás', 'Branco'] },
    ],
  },
  {
    slug: 'devocional-personalizado',
    name: 'Devocional Personalizado',
    category: 'devocionais',
    categoryName: 'Devocionais',
    price: 64.9,
    image: '/images/cat-cadernos.png',
    description: 'Devocional com capa personalizada para sua jornada de fé.',
    longDescription:
      'Devocional personalizado com espaço para anotações, versículos e reflexões. Capa dura com seu nome em dourado.',
    productionDays: 7,
    rating: 5,
    reviewsCount: 47,
    customFields: [{ id: 'nome', label: 'Nome', type: 'text', required: true }],
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Juliana Martins',
    rating: 5,
    text: 'Simplesmente perfeito! O topo de bolo da minha filha ficou um sonho. Todo mundo elogiou. Já virei cliente fiel da Encantart\u2019s!',
    date: 'Março 2026',
  },
  {
    id: '2',
    name: 'Patrícia Souza',
    rating: 5,
    text: 'O kit festa luxo superou minhas expectativas. Acabamento impecável e entrega no prazo. Recomendo de olhos fechados.',
    date: 'Fevereiro 2026',
  },
  {
    id: '3',
    name: 'Carla Mendes',
    rating: 5,
    text: 'Atendimento maravilhoso pela Encantinha! Me ajudaram a montar tudo. Minha agenda ficou linda demais.',
    date: 'Janeiro 2026',
  },
  {
    id: '4',
    name: 'Fernanda Lima',
    rating: 5,
    text: 'Já é a terceira festa que faço com eles. Qualidade premium e carinho em cada detalhe. Amo!',
    date: 'Dezembro 2025',
  },
]

export const faqs = [
  {
    q: 'Qual o prazo de produção?',
    a: 'O prazo varia de acordo com o produto e é exibido automaticamente em cada página. Em geral, de 4 a 10 dias úteis após a aprovação da arte.',
  },
  {
    q: 'Como funciona a aprovação de arte?',
    a: 'Após o pedido, você recebe uma prévia da arte na sua área do cliente. Você pode aprovar ou solicitar alterações antes da produção começar.',
  },
  {
    q: 'Vocês entregam para todo o Brasil?',
    a: 'Sim! Enviamos para todo o Brasil via Correios (PAC e Sedex) e transportadoras. O frete é calculado automaticamente pelo seu CEP.',
  },
  {
    q: 'Posso personalizar com foto e logotipo?',
    a: 'Com certeza! Na página de cada produto você pode enviar fotos, logotipos e imagens de referência para deixar tudo com a sua cara.',
  },
  {
    q: 'Quais as formas de pagamento?',
    a: 'Aceitamos PIX, cartão de crédito e boleto através do PagBank, com total segurança.',
  },
  {
    q: 'Posso montar um kit festa do meu jeito?',
    a: 'Sim! Temos um configurador de Kit Festa onde você escolhe cada item e acompanha o preço atualizado em tempo real.',
  },
]

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug)
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getBestSellers() {
  return products.filter((p) => p.badges?.includes('mais-vendido'))
}

export function getNewArrivals() {
  return products.filter((p) => p.badges?.includes('lancamento'))
}

export function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
