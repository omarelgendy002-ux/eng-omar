import { Bot, Check, ChevronDown, MessageCircle, RefreshCw, Send, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

function getReply(message, lang, profile) {
  const q = message.toLowerCase()
  const ar = lang === 'ar'
  if (/(name|who|اسم|مين)/i.test(q)) return ar ? `اسمه ${profile.nameAr}، وهو طالب في مجال الذكاء الاصطناعي.` : `Omar is ${profile.name}, an Artificial Intelligence student.`
  if (/(study|university|college|دراسة|جامعة|كلية)/i.test(q)) return ar ? `عمر يدرس الذكاء الاصطناعي في ${profile.universityAr}.` : `Omar studies Artificial Intelligence at ${profile.university}.`
  if (/(skill|skills|مهار|بتعرف|program)/i.test(q)) return ar ? `أبرز المجالات: ${profile.skillsAr.slice(0, 4).join('، ')}.` : `Key areas: ${profile.skills.slice(0, 4).join(', ')}.`
  if (/(contact|whatsapp|رقم|تواصل|واتساب)/i.test(q)) return ar ? `يمكن التواصل عبر واتساب على ${profile.phone}.` : `You can contact Omar on WhatsApp at ${profile.phone}.`
  if (/(location|where|مكان|عنوان|فين|منوفية)/i.test(q)) return ar ? `الموقع المذكور في البروفايل: ${profile.locationAr}.` : `The profile lists: ${profile.location}.`
  if (/(project|مشروع)/i.test(q)) return ar ? 'الموقع لا يخترع مشاريع غير حقيقية؛ البطاقات الحالية placeholders إلى أن تتم إضافة مشاريع موثقة.' : 'The portfolio does not invent projects. The current cards are placeholders until verified projects are added.'
  if (/(hello|hi|hey|اهلا|أهلا|هاي|ازيك)/i.test(q)) return ar ? 'أهلًا! اسألني عن الدراسة أو المهارات أو التواصل مع عمر.' : 'Hi! Ask me about Omar’s study field, skills, projects, or contact details.'
  return ar ? 'أقدر أساعدك بمعلومات موجودة في البروفايل عن عمر، دراسته، مهاراته وطرق التواصل معه.' : 'I can help with verified profile information about Omar, his study field, skills, projects and contact details.'
}

export default function AIChat({ open, setOpen, t, profile, lang }) {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const welcome = useMemo(() => ({ id: 'welcome', role: 'assistant', text: t('ai.welcome') }), [t])

  useEffect(() => {
    setMessages([welcome])
  }, [welcome])

  const send = () => {
    const text = value.trim()
    if (!text || typing) return
    setMessages((prev) => [...prev, { id: `${Date.now()}u`, role: 'user', text }])
    setValue('')
    setTyping(true)
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: `${Date.now()}a`, role: 'assistant', text: getReply(text, lang, profile) }])
      setTyping(false)
    }, 650)
  }

  if (!open) return <button className="floating-ai" onClick={() => setOpen(true)} aria-label={t('assistant.open')}><MessageCircle size={20} /><span>{t('assistant.title')}</span></button>
  return <div className="ai-window" role="dialog" aria-label={t('ai.name')}>
    <header><div className="ai-head"><span className="ai-orb"><Bot size={18} /></span><div><strong>{t('ai.name')}</strong><small><Check size={12} /> LOCAL DEMO</small></div></div><div className="ai-actions"><button onClick={() => setOpen(false)} aria-label={t('ai.minimize')}><ChevronDown size={17} /></button><button onClick={() => setOpen(false)} aria-label={t('ai.close')}><X size={17} /></button></div></header>
    <div className="ai-messages">{messages.map((m) => <div className={`ai-message ${m.role}`} key={m.id}><span>{m.text}</span></div>)}{typing && <div className="ai-message assistant typing"><span><RefreshCw size={13} /> {t('ai.typing')}</span></div>}</div>
    <div className="ai-footer"><div className="ai-input-row"><input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={t('ai.placeholder')} aria-label={t('ai.placeholder')} /><button onClick={send} aria-label={t('ai.send')}><Send size={17} /></button></div><button className="ai-clear" onClick={() => setMessages([welcome])}>{t('ai.clear')}</button></div>
  </div>
}
