import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )

      const textParagraphs = contentRef.current?.querySelectorAll('p')
      if (textParagraphs) {
        gsap.fromTo(textParagraphs,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            delay: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        )
      }

      const cards = cardsRef.current?.querySelectorAll('.differential-card')
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            delay: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sobre" className="about">
      <div className="about-container">
        <h2 ref={titleRef} className="about-title">Sobre a Remzy</h2>
        
        <div ref={contentRef} className="about-content">
          <div className="about-text">
            <p className="about-intro">
              Fundada em <strong>19 de junho de 2024</strong>, a Remzy nasceu com uma 
              visão clara: fazer a tecnologia andar ao lado do ser humano, maximizando 
              seu potencial de produtividade e criando um futuro no qual inovação e 
              humanidade se complementem perfeitamente.
            </p>
            
            <p className="about-mission">
              Nossa missão é desenvolver soluções em inteligência artificial que 
              não substituem o ser humano, mas potencializam suas capacidades. 
              Especializados em <strong>Processamento de Linguagem Natural (PLN)</strong>, 
              criamos ferramentas que transformam a forma como as empresas se comunicam, 
              analisam dados e automatizam processos complexos.
            </p>
            
            <p className="about-philosophy">
              Acreditamos que cada empresa é única, com desafios e necessidades 
              específicas. Por isso, nosso trabalho é sempre <strong>sob medida</strong>, 
              desenvolvendo soluções personalizadas que se adaptam perfeitamente 
              ao contexto e aos objetivos de cada organização. Não oferecemos produtos 
              genéricos; cada projeto é uma criação única.
            </p>
            
            <p className="about-commitment">
              Nosso compromisso vai além da entrega: acompanhamos você em cada 
              etapa do processo, desde a concepção inicial até a implementação 
              completa, oferecendo suporte contínuo e dedicado para garantir que 
              sua solução evolua junto com seu negócio.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="about-differentials">
          <div className="differential-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Análise Profunda</h3>
            <p>Mergulhamos no seu negócio para entender cada nuance e criar soluções verdadeiramente personalizadas</p>
            <div className="card-number">01</div>
          </div>
          
          <div className="differential-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16M8 8H16M8 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Desenvolvimento Ágil</h3>
            <p>Utilizamos metodologias modernas para entregar resultados rápidos, sempre mantendo a qualidade excepcional</p>
            <div className="card-number">02</div>
          </div>
          
          <div className="differential-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Evolução Contínua</h3>
            <p>Sua solução cresce com seu negócio através de suporte dedicado e atualizações constantes</p>
            <div className="card-number">03</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 