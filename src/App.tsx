import { useMemo, useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function useFadeUpVariants() {
  return useMemo(() => {
    const fadeUp: Variants = {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    const group: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.08 } },
    }

    return { fadeUp, group }
  }, [])
}

function FadeUpGroup({
  className,
  children,
  once = true,
}: {
  className?: string
  children: React.ReactNode
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: '-12% 0px -12% 0px', once })
  const { fadeUp, group } = useFadeUpVariants()

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={group}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

function FadeUp({
  className,
  children,
  once = true,
}: {
  className?: string
  children: React.ReactNode
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: '-12% 0px -12% 0px', once })
  const { fadeUp } = useFadeUpVariants()

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-svh">
      {/* 1. NAV */}
      <header className="sticky top-0 z-50 border-b border-[color:color-mix(in_oklab,var(--ink)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--cream)_72%,transparent)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a
            href="#"
            className="text-lg font-medium tracking-tight text-[color:var(--ink)]"
            style={{ fontFamily: 'Playfair Display' }}
            aria-label="Celebra."
          >
            celebra<span className="text-[color:var(--gold)]">.</span>
          </a>

          <a
            href="#waitlist"
            className="rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--cream)] shadow-sm transition hover:opacity-90"
            style={{ fontFamily: 'DM Sans' }}
          >
            Quiero acceso anticipado
          </a>
        </div>
      </header>

      <main>
        {/* 2. HERO */}
        <section className="relative overflow-hidden bg-[color:var(--cream)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,147,42,0.34),transparent)] blur-2xl" />
            <div className="absolute -bottom-44 left-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(74,103,65,0.26),transparent)] blur-2xl" />
            <div className="absolute -bottom-56 right-[-160px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(224,92,58,0.22),transparent)] blur-2xl" />
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-20">
            <FadeUpGroup className="space-y-8">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[color:color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[color:color-mix(in_oklab,var(--gold-light)_22%,transparent)] px-4 py-2 text-sm text-[color:var(--warm-dark)]">
                <span aria-hidden="true">✦</span> Para líderes de Recursos Humanos
              </div>

              <h1
                className="max-w-3xl text-balance text-[clamp(3.2rem,5.6vw,6rem)] font-black leading-[0.92] tracking-tight text-[color:var(--ink)]"
                style={{ fontFamily: 'Playfair Display', fontWeight: 900 }}
              >
                El sistema que celebra{' '}
                <span className="italic text-[color:var(--gold)]">por ti.</span>
              </h1>

              <p className="max-w-[560px] text-pretty text-lg font-light leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_78%,transparent)]">
                Automatiza los cumpleaños, aniversarios y kits de bienvenida de tu
                equipo — con regalos físicos personalizados, mensajes reales y
                cero carga operativa para tu área de HR.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-medium text-[color:var(--cream)] shadow-soft transition hover:opacity-90"
                >
                  Validar mi acceso gratis →
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_oklab,var(--ink)_28%,transparent)] bg-transparent px-6 py-3 text-sm font-medium text-[color:var(--ink)] transition hover:bg-[color:color-mix(in_oklab,var(--ink)_5%,transparent)]"
                >
                  ¿Cómo funciona?
                </a>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-[color:color-mix(in_oklab,var(--ink)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--card-bg)_70%,transparent)] p-4 sm:flex-row sm:items-center sm:gap-6">
                {[
                  'Onboarding de 5 minutos',
                  'Regalos físicos entregados',
                  'Cero seguimiento manual',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2 w-2 rounded-full bg-[color:var(--sage-light)]"
                      aria-hidden="true"
                    />
                    <span className="text-[color:color-mix(in_oklab,var(--ink)_78%,transparent)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUpGroup>
          </div>
        </section>

        {/* 3. SECCIÓN PAIN */}
        <section className="bg-[color:var(--cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <FadeUpGroup className="space-y-10">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--coral)_18%,transparent)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--coral)]">
                  El problema
                </div>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-[color:var(--ink)] md:text-5xl">
                  Olvidar un cumpleaños en tu equipo{' '}
                  <span className="text-[color:var(--gold)]">
                    no es un error menor.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  {
                    icon: '⏳',
                    title: 'Tiempo que vale oro, gastado en lo operativo',
                    body: 'Coordinar regalos, recordar fechas, pedirle mensajes al equipo, hablar con proveedores. HR termina siendo el asistente de festejos de la empresa.',
                  },
                  {
                    icon: '😶',
                    title: 'El silencio duele más que un mal regalo',
                    body: 'Cuando no se celebra, la persona lo nota. La desconexión con la cultura, con el equipo, se instala lentamente. Y eso sí tiene un costo.',
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="relative rounded-2xl border border-[color:color-mix(in_oklab,var(--ink)_12%,transparent)] bg-[color:var(--card-bg)] p-6 text-left shadow-sm"
                  >
                    <div className="absolute left-0 top-0 h-[3px] w-full rounded-t-2xl bg-[linear-gradient(90deg,var(--coral),color-mix(in_oklab,var(--coral)_40%,transparent))]" />
                    <div className="flex items-start gap-4">
                      <div className="text-2xl" aria-hidden="true">
                        {c.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold leading-tight text-[color:var(--ink)]">
                          {c.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_78%,transparent)]">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative rounded-2xl border border-[color:color-mix(in_oklab,var(--cream)_14%,transparent)] bg-[color:var(--ink)] p-8 text-left shadow-soft">
                <div className="absolute left-0 top-0 h-[3px] w-full rounded-t-2xl bg-[linear-gradient(90deg,var(--coral),color-mix(in_oklab,var(--coral)_40%,transparent))]" />
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <div className="text-2xl" aria-hidden="true">
                    🔥
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black leading-tight text-[color:var(--cream)]">
                      El problema que parece pequeño pero no lo es
                    </h3>
                    <p className="max-w-3xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--cream)_82%,transparent)]">
                      Reconocer a las personas en sus momentos importantes es una
                      de las palancas más directas del sentido de pertenencia.
                      No es nice-to-have. Es cultura.
                    </p>
                    <p
                      className="max-w-2xl text-pretty text-lg italic text-[color:var(--gold-light)]"
                      style={{ fontFamily: 'Playfair Display' }}
                    >
                      "Parece simple, pero dejarlo hacer es dolorosísimo."
                    </p>
                  </div>
                </div>
              </div>
            </FadeUpGroup>
          </div>
        </section>

        {/* 4. SECCIÓN HOW IT WORKS */}
        <section
          id="como-funciona"
          className="bg-[color:var(--warm-dark)] text-[color:var(--cream)]"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <FadeUpGroup className="space-y-10">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--gold-light)_16%,transparent)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--gold-light)]">
                  Cómo funciona
                </div>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  Una sola vez.{' '}
                  <span className="text-[color:var(--gold-light)]">
                    Funciona para siempre.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  {
                    heading: '🎂 Ruta Cumpleaños',
                    sub: 'Automatizada con toque humano',
                    steps: [
                      'El colaborador registra su fecha y gustos personales una sola vez en el onboarding.',
                      'Se asigna automáticamente un compañero celebrador que recibirá el recordatorio a tiempo.',
                      'El sistema dispara recordatorios a 12 y 7 días para que el celebrador escriba su mensaje.',
                      'Se genera una eCard personalizada y se activa la orden al proveedor de regalo físico.',
                      'El día del cumpleaños, el mensaje y el regalo llegan solos. HR no hace nada.',
                    ],
                  },
                  {
                    heading: '⭐ Ruta Aniversario',
                    sub: 'Progresiva por años de antigüedad',
                    steps: [
                      'El sistema rastrea la fecha de inicio de cada colaborador desde el onboarding.',
                      'Según los años cumplidos, se activa el nivel de regalo correspondiente — diferente para años 1, 2, 3, 4+.',
                      'El celebrador asignado escribe un mensaje que se incluye en el regalo físico del proveedor.',
                      'El proveedor recibe las instrucciones y coordina la entrega sin que HR intervenga.',
                      'Se dispara la celebración en los canales internos del equipo el día del aniversario.',
                    ],
                  },
                ].map((col) => (
                  <div
                    key={col.heading}
                    className="rounded-2xl border border-[color:color-mix(in_oklab,var(--cream)_14%,transparent)] bg-[color:color-mix(in_oklab,var(--ink)_30%,transparent)] p-6"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black leading-tight">
                        {col.heading}
                      </h3>
                      <p className="text-sm font-light text-[color:color-mix(in_oklab,var(--cream)_78%,transparent)]">
                        {col.sub}
                      </p>
                    </div>

                    <ol className="mt-5 space-y-4">
                      {col.steps.map((s, i) => (
                        <li key={s} className="flex gap-3">
                          <span
                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_oklab,var(--gold)_55%,transparent)] text-xs text-[color:var(--gold-light)]"
                            aria-label={`Paso ${i + 1}`}
                          >
                            {i + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--cream)_84%,transparent)]">
                            {s}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </FadeUpGroup>
          </div>
        </section>

        {/* 5. SECCIÓN FEATURES */}
        <section className="bg-[color:var(--cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <FadeUpGroup className="space-y-10">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--coral)_18%,transparent)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--coral)]">
                  Todo incluido
                </div>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-[color:var(--ink)] md:text-5xl">
                  Lo que hace{' '}
                  <span className="text-[color:var(--gold)]">Celebra por ti</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: '📋 Registro único en onboarding',
                    body: 'Cada persona llena su perfil una sola vez: fecha de cumpleaños, gustos, hobbies y preferencias de regalo. Ya. Nunca más te preguntan qué regalarle a alguien.',
                  },
                  {
                    title: '🔔 Recordatorios automáticos',
                    body: 'El sistema avisa al celebrador con días de anticipación para que prepare su mensaje. HR no tiene que hacer seguimiento de nada.',
                  },
                  {
                    title: '💌 eCards personalizadas',
                    body: 'Se generan tarjetas digitales de cumpleaños y aniversario únicas para cada persona, listas para compartirse en los canales del equipo.',
                  },
                  {
                    title: '🎁 Regalos físicos con proveedor',
                    body: 'Conectamos con tu proveedor de confianza para que entregue un regalo personalizado dentro del budget aprobado, con carta escrita a mano incluida.',
                  },
                  {
                    title: '📣 Activación en canales internos',
                    body: 'La celebración se dispara en WhatsApp, Slack u otros canales internos el día del evento. El equipo se entera y participa sin esfuerzo.',
                  },
                  {
                    title: '🤝 Kit de bienvenida automático',
                    body: 'Al superar el periodo de prueba, el nuevo colaborador recibe su kit de bienvenida coordinado directamente con el proveedor, sin demoras.',
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className={cx(
                      'group relative rounded-2xl border border-[color:color-mix(in_oklab,var(--ink)_12%,transparent)] bg-[color:var(--card-bg)] p-6 text-left transition duration-200',
                      'hover:-translate-y-[3px] hover:border-[color:var(--gold)] hover:shadow-soft-hover',
                    )}
                  >
                    <h3 className="text-xl font-bold leading-tight text-[color:var(--ink)]">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_78%,transparent)]">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUpGroup>
          </div>
        </section>

        {/* 6. SECCIÓN TIERS DE ANIVERSARIO */}
        <section className="bg-[color:var(--cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <FadeUpGroup className="space-y-10">
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--coral)_18%,transparent)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--coral)]">
                  Ruta de aniversario
                </div>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-[color:var(--ink)] md:text-5xl">
                  Cada año, un reconocimiento diferente
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    year: '1',
                    parity: 'Año impar',
                    gift: 'Tiquete + dulce artesanal + carta personalizada del equipo',
                    tone: 'gold',
                  },
                  {
                    year: '2',
                    parity: 'Año par',
                    gift: 'Artículo representativo de la organización + carta personalizada',
                    tone: 'sage',
                  },
                  {
                    year: '3',
                    parity: 'Año impar',
                    gift: 'Tiquete + experiencia adicional + carta personalizada del celebrador',
                    tone: 'gold',
                  },
                  {
                    year: '4+',
                    parity: 'Año par',
                    gift: 'Regalo premium de la organización + carta personalizada del equipo',
                    tone: 'sage',
                  },
                ].map((t) => {
                  const isGold = t.tone === 'gold'
                  const toneVar = isGold ? 'var(--gold)' : 'var(--sage)'
                  const badgeBg = isGold
                    ? 'color-mix(in_oklab,var(--gold-light)_18%,transparent)'
                    : 'color-mix(in_oklab,var(--sage-light)_20%,transparent)'
                  const badgeTextVar = isGold ? '--gold' : '--sage'
                  return (
                    <div
                      key={t.year}
                      className="rounded-2xl border bg-[color:var(--card-bg)] p-6 text-left shadow-sm"
                      style={{
                        borderColor: `color-mix(in oklab, ${toneVar} 45%, transparent)`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="text-5xl font-black leading-none tracking-tight"
                          style={{
                            color: toneVar,
                            fontFamily: 'Playfair Display',
                            fontWeight: 900,
                          }}
                        >
                          {t.year}
                        </div>
                        <div
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: badgeBg,
                            color: `var(${badgeTextVar})`,
                            border: `1px solid color-mix(in oklab, ${toneVar} 30%, transparent)`,
                          }}
                        >
                          {t.parity}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_78%,transparent)]">
                        {t.gift}
                      </p>
                    </div>
                  )
                })}
              </div>
            </FadeUpGroup>
          </div>
        </section>

        {/* 7. SECCIÓN KIT DE BIENVENIDA */}
        <section className="bg-[linear-gradient(180deg,color-mix(in_oklab,var(--sage)_55%,var(--warm-dark)),var(--warm-dark))] text-[color:var(--cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <FadeUpGroup className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--sage-light)_20%,transparent)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--sage-light)]">
                  Kit de bienvenida
                </div>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  El primer{' '}
                  <span className="text-[color:var(--sage-light)]">
                    gran momento también está automatizado.
                  </span>
                </h2>
                <p className="max-w-xl text-pretty text-sm font-light leading-relaxed text-[color:color-mix(in_oklab,var(--cream)_84%,transparent)] md:text-base">
                  Desde que el líder confirma que alguien supera su periodo de
                  prueba, el sistema coordina con el proveedor el envío del kit
                  de bienvenida. Sin correos manuales, sin listas de chequeo,
                  sin que nadie tenga que recordarlo.
                </p>
              </div>

              <div className="rounded-2xl border border-[color:color-mix(in_oklab,var(--cream)_14%,transparent)] bg-[color:color-mix(in_oklab,var(--ink)_30%,transparent)] p-6 shadow-soft">
                <div className="space-y-4">
                  {[
                    {
                      icon: '📧',
                      title: 'Líder confirma el work trial',
                      sub: 'Un correo activa todo el proceso',
                    },
                    {
                      icon: '📦',
                      title: 'Proveedor recibe la orden',
                      sub: 'Prepara el kit con los insumos designados',
                    },
                    {
                      icon: '🚚',
                      title: 'Entrega coordinada',
                      sub: 'El nuevo integrante recibe su kit a tiempo',
                    },
                    {
                      icon: '🎉',
                      title: 'Bienvenida activada',
                      sub: 'Primer día con el mejor primer impacto',
                    },
                  ].map((step, idx, arr) => (
                    <div key={step.title} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:color-mix(in_oklab,var(--sage-light)_45%,transparent)] bg-[color:color-mix(in_oklab,var(--sage)_20%,transparent)] text-lg">
                          <span aria-hidden="true">{step.icon}</span>
                        </div>
                        {idx < arr.length - 1 ? (
                          <div className="my-2 h-8 w-px bg-[color:color-mix(in_oklab,var(--cream)_20%,transparent)]" />
                        ) : null}
                      </div>
                      <div className="pt-1">
                        <div className="text-sm font-medium text-[color:var(--cream)]">
                          {step.title} →{' '}
                          <span className="font-light text-[color:color-mix(in_oklab,var(--cream)_78%,transparent)]">
                            "{step.sub}"
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUpGroup>
          </div>
        </section>

        {/* 8. SECCIÓN CTA / WAITLIST */}
        <section
          id="waitlist"
          className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-48 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,147,42,0.32),transparent)] blur-2xl" />
          </div>

          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <FadeUpGroup className="space-y-8">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--gold-light)_16%,transparent)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--gold-light)]">
                  Acceso anticipado
                </div>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  ¿Listo para dejar de{' '}
                  <span className="text-[color:var(--gold-light)]">
                    regalar con miedo?
                  </span>
                </h2>
                <p className="max-w-xl text-pretty text-sm font-light leading-relaxed text-[color:color-mix(in_oklab,var(--cream)_84%,transparent)] md:text-base">
                  Déjame tu correo y te cuento cómo esto puede funcionar en tu
                  organización esta semana.
                </p>
              </div>

              <form
                className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (waitlistSubmitted) return
                  if (!email.trim()) return
                  setWaitlistSubmitted(true)
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={waitlistSubmitted}
                  placeholder="tu@correo.com"
                  className="h-12 w-full rounded-full border border-[color:color-mix(in_oklab,var(--cream)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--cream)_6%,transparent)] px-5 text-sm text-[color:var(--cream)] outline-none transition placeholder:text-[color:color-mix(in_oklab,var(--cream)_55%,transparent)] focus:border-[color:color-mix(in_oklab,var(--gold-light)_55%,transparent)] disabled:opacity-60 sm:max-w-md"
                />
                <button
                  type="submit"
                  disabled={waitlistSubmitted}
                  className={cx(
                    'h-12 rounded-full px-6 text-sm font-medium transition disabled:cursor-not-allowed',
                    waitlistSubmitted
                      ? 'bg-[color:var(--gold)] text-[color:var(--ink)]'
                      : 'bg-[color:var(--gold-light)] text-[color:var(--ink)] hover:opacity-90',
                  )}
                >
                  {waitlistSubmitted ? '¡Anotado! 🎉' : 'Quiero acceso →'}
                </button>
              </form>

              <p className="text-left text-sm font-light text-[color:color-mix(in_oklab,var(--cream)_72%,transparent)]">
                Sin spam. Sin compromisos. Solo una conversación honesta sobre tu
                equipo.
              </p>
            </FadeUpGroup>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <footer className="bg-[color:var(--cream)] py-10">
        <FadeUp className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-sm font-light text-[color:color-mix(in_oklab,var(--ink)_78%,transparent)]">
            Celebra. — Hecho con intención para líderes de HR que creen que la
            cultura se construye en los detalles.
          </p>
        </FadeUp>
      </footer>
    </div>
  )
}

export default App
