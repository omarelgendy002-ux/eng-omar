import { MessageSquareWarning, X } from 'lucide-react'
import { useState } from 'react'

export default function ComplaintForm({ open, setOpen, t, profile, lang }) {
  const [form, setForm] = useState({ name: '', phone: '', type: t('forms.complaintTypes')[0], subject: '', description: '' })
  if (!open) return null
  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.subject || !form.description) return window.alert(t('forms.required'))
    const message = lang === 'ar' ? `مرحبًا عمر،\n\nلدي شكوى:\n\nالاسم: ${form.name}\nرقم الهاتف: ${form.phone}\nنوع الشكوى: ${form.type}\nالعنوان: ${form.subject}\nالتفاصيل: ${form.description}` : `Hello Omar,\n\nI have a complaint:\n\nName: ${form.name}\nPhone: ${form.phone}\nComplaint type: ${form.type}\nSubject: ${form.subject}\nDetails: ${form.description}`
    window.open(`${profile.whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}><div className="modal"><header><div><span className="section-kicker"><MessageSquareWarning size={14} /> COMPLAINT</span><h3>{t('forms.complaintTitle')}</h3></div><button onClick={() => setOpen(false)} aria-label={t('forms.close')}><X /></button></header><form onSubmit={submit}><label>{t('forms.name')}<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label><label>{t('forms.phone')}<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></label><label>{t('forms.type')}<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{t('forms.complaintTypes').map((x) => <option key={x}>{x}</option>)}</select></label><label>{t('forms.subject')}<input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required /></label><label>{t('forms.description')}<textarea rows="5" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></label><button className="btn primary full" type="submit">{t('forms.sendWhatsApp')}</button></form></div></div>
}
