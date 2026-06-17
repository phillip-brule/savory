export const site = {
  name: 'Savory Sips & Bites',
  shortName: 'Savory',
  tagline: 'Picaderas para todos tus eventos',
  slogan: 'Ama, come y bebe que la vida es breve',
  city: 'Santiago de los Caballeros',
  country: 'República Dominicana',
  whatsapp: '18092251890',
  whatsappDisplay: '849-266-6066',
  mapsUrl:
    'https://www.google.com/maps/place/Savory+Sips+%26+Bites/@19.4613187,-70.6957289,15.87z/data=!4m6!3m5!1s0x8eb1c5002ee0d1b9:0x8a9afcb2b6c3723c!8m2!3d19.4697144!4d-70.6930965!16s%2Fg%2F11w8wknctv',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3849.8!2d-70.6930965!3d19.4697144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c5002ee0d1b9%3A0x8a9afcb2b6c3723c!2sSavory%20Sips%20%26%20Bites!5e0!3m2!1ses!2sdo!4v1710000000000',
} as const

export function whatsAppUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
