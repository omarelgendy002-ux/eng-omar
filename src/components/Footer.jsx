import { Send } from 'lucide-react'

export default function Footer({ t, profile, lang, setLang }) {
  return <footer className="footer" id="footer"><div><div className="brand footer-brand"><span>O</span><b>OMAR</b></div><p>{t('footer.student')} · {profile.university}</p></div><div className="footer-links"><a href={profile.whatsappUrl} target="_blank" rel="noreferrer">{t('contact.whatsapp')}</a><a href={profile.telegramUrl} target="_blank" rel="noreferrer"><Send size={14} /> {t('contact.telegram')}</a><button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>{lang === 'en' ? 'العربية' : 'English'}</button></div><div className="footer-bottom">© {new Date().getFullYear()} {profile.name}. {t('footer.rights')} · <a href="#privacy" onClick={(e) => e.preventDefault()}>{t('footer.privacy')}</a></div></footer>
}
