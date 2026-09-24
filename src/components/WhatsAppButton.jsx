import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton({ profile, label }) {
  const open = () => {
    const win = window.open(profile.whatsappUrl, '_blank', 'noopener,noreferrer')
    if (!win) window.location.href = profile.whatsappUrl
  }
  return <button className="whatsapp-float" onClick={open} title={profile.phone} aria-label={`${label} ${profile.phone}`}><MessageCircle size={20} /></button>
}
