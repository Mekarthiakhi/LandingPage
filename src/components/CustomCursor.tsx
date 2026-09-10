import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    document.body.classList.add('has-cursor')

    const dot = dotRef.current!
    const ring = ringRef.current!

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })
    }

    let rafId: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    // Magnetic effect on interactive elements
    const magnetElements = document.querySelectorAll<HTMLElement>('[data-magnetic]')
    const handleMagneticEnter = () => setIsHovering(true)
    const handleMagneticLeave = () => setIsHovering(false)

    magnetElements.forEach(el => {
      el.addEventListener('mouseenter', handleMagneticEnter)
      el.addEventListener('mouseleave', handleMagneticLeave)
    })

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.classList.remove('has-cursor')
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      magnetElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMagneticEnter)
        el.removeEventListener('mouseleave', handleMagneticLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
            backgroundColor: 'var(--color-bronze-light)',
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? '52px' : '36px',
            height: isHovering ? '52px' : '36px',
            borderColor: 'rgba(201,169,110,0.5)',
            backgroundColor: isHovering ? 'rgba(201,169,110,0.08)' : 'transparent',
          }}
        />
      </div>
    </>
  )
}
