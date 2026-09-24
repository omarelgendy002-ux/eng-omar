import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()
  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches
    if (!fine) return undefined
    document.body.classList.add('custom-cursor-enabled')
    let x = -100, y = -100, rx = -100, ry = -100
    let raf = 0
    const move = (e) => { x = e.clientX; y = e.clientY; }
    const tick = () => {
      rx += (x - rx) * .16; ry += (y - ry) * .16
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move)
    const onOver = (e) => { if (e.target.closest('a,button,.skill-card,.project-card,.service-card,.info-card')) ring.current?.classList.add('cursor-active') }
    const onOut = () => ring.current?.classList.remove('cursor-active')
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    raf = requestAnimationFrame(tick)
    return () => { document.body.classList.remove('custom-cursor-enabled'); cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', onOver); document.removeEventListener('pointerout', onOut) }
  }, [])
  return <><span ref={dot} className="cursor-dot" /><span ref={ring} className="cursor-ring" /></>
}
