import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'

export default function PrivacyConsent({ t }) {
  const [show, setShow] = useState(false)
  useEffect(() => { if (localStorage.getItem('omar-privacy-choice') === null) setShow(true) }, [])
  const choose = (value) => {
    localStorage.setItem('omar-privacy-choice', value ? 'agree' : 'decline')
    if (value && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(() => {}, () => {}, { maximumAge: 60000, timeout: 5000 })
    }
    setShow(false)
  }
  if (!show) return null
  return <div className="consent"><div className="consent-icon"><ShieldCheck size={20} /></div><div><strong>{t('privacy.title')}</strong><p>{t('privacy.text')}</p></div><div className="consent-actions"><button onClick={() => choose(false)}>{t('privacy.decline')}</button><button className="btn primary" onClick={() => choose(true)}>{t('privacy.agree')}</button></div></div>
}
