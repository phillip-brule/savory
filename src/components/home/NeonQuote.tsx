import { motion } from 'framer-motion'

export function NeonQuote() {
  return (
    <section className="relative overflow-hidden bg-stone py-16">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #c4a574 0px, #c4a574 2px, transparent 2px, transparent 12px)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-script text-3xl leading-snug text-neon sm:text-4xl md:text-5xl"
          style={{
            textShadow: '0 0 20px rgba(245, 197, 24, 0.4), 0 0 40px rgba(245, 197, 24, 0.2)',
          }}
        >
          Ama, come y bebe
          <br />
          que la vida es breve
        </motion.p>
      </div>
    </section>
  )
}
