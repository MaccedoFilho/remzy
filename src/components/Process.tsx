import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  const step4Ref = useRef<HTMLDivElement>(null)

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

      const steps = [step1Ref.current, step2Ref.current, step3Ref.current, step4Ref.current]
      steps.forEach((step, index) => {
        gsap.fromTo(step,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.3 + (index * 0.2),
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        )

        const stepIcon = step?.querySelector('.step-icon')
        if (stepIcon) {
          gsap.fromTo(stepIcon,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: 0.5 + (index * 0.2),
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
              }
            }
          )
        }
      })

      const connectors = sectionRef.current?.querySelectorAll('.connector-line')
      if (connectors) {
        connectors.forEach((line, index) => {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 1 + (index * 0.2),
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
              }
            }
          )
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="processo" className="process-section" ref={sectionRef}>
      <div className="process-container">
        <h2 ref={titleRef} className="process-title">Como Funciona o Processo</h2>
        
        <div className="process-steps">
          <div className="step-item" ref={step1Ref}>
            <div className="step-icon">
              <span className="step-number">1</span>
            </div>
            <div className="step-content">
              <h3>Análise & Descoberta</h3>
              <p>
                Compreendemos profundamente seus desafios e objetivos através de reuniões 
                estratégicas. Analisamos seus processos atuais e identificamos oportunidades 
                onde a IA pode gerar maior impacto para seu negócio.
              </p>
            </div>
          </div>

          <div className="connector-line"></div>

          <div className="step-item" ref={step2Ref}>
            <div className="step-icon">
              <span className="step-number">2</span>
            </div>
            <div className="step-content">
              <h3>Desenvolvimento Personalizado</h3>
              <p>
                Nossa equipe desenvolve soluções sob medida utilizando as mais avançadas 
                tecnologias de IA. Cada solução é criada especificamente para suas 
                necessidades, garantindo máxima eficiência e integração.
              </p>
            </div>
          </div>

          <div className="connector-line"></div>

          <div className="step-item" ref={step3Ref}>
            <div className="step-icon">
              <span className="step-number">3</span>
            </div>
            <div className="step-content">
              <h3>Implementação & Testes</h3>
              <p>
                Implementamos a solução em ambiente seguro e realizamos testes rigorosos. 
                Ajustamos algoritmos e otimizamos performance antes da implantação final, 
                garantindo funcionamento perfeito.
              </p>
            </div>
          </div>

          <div className="connector-line"></div>

          <div className="step-item" ref={step4Ref}>
            <div className="step-icon">
              <span className="step-number">4</span>
            </div>
            <div className="step-content">
              <h3>Suporte Contínuo</h3>
              <p>
                Oferecemos suporte técnico especializado e melhorias contínuas. Monitoramos 
                performance, implementamos atualizações e garantimos que sua solução evolua 
                junto com seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process 