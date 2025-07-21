import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import './Hero.css'

gsap.registerPlugin(TextPlugin)

function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    if (titleRef.current) {
      titleRef.current.textContent = ''
      
      gsap.set(titleRef.current, { opacity: 1 })
      
      tl.to(titleRef.current, {
        duration: 3,
        text: {
          value: "Transforme seu\nnegócio com\nInteligência Artificial",
          delimiter: ""
        },
        ease: "none"
      })
    }

    gsap.set([descriptionRef.current, buttonRef.current, cubeRef.current], {
      opacity: 0,
      y: 30
    })

    tl.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.3")
    .to(cubeRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(cubeRef.current, {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1
        })
      }
    }, "-=0.2")
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title"></h1>
          <p ref={descriptionRef} className="hero-description">
            Soluções inovadoras em IA para revolucionar sua empresa.<br />
            Automatize processos, otimize resultados e conquiste o futuro.
          </p>
          <button 
            ref={buttonRef} 
            className="hero-button"
            onClick={() => {
              const element = document.getElementById('produtos')
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }}
          >
            Descubra nossas soluções
          </button>
        </div>
        
        <div className="hero-visual">
          <div ref={cubeRef} className="cube-container">
            <div className="cube-glow"></div>
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 