import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

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

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      )

      gsap.fromTo(sidebarRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    const emailSubject = `Contato Remzy - ${subject}`
    const emailBody = `
Nome: ${name}
Email: ${email}
Empresa: ${company || 'Não informado'}
Telefone: ${phone || 'Não informado'}
Assunto: ${subject}

Mensagem:
${message}
    `.trim()

    const mailtoLink = `mailto:ricardomacedodev@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    
    window.open(mailtoLink, '_self')
  }

  return (
    <section id="contato" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-hero">
          <h2 ref={titleRef} className="contact-title">Fale Conosco</h2>
          <p className="contact-subtitle">
            Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas para discutir seu projeto de IA.
          </p>
        </div>

        <div className="contact-form-section">
          <div className="contact-content">
            <div className="contact-form-wrapper" ref={formRef}>
            <div className="form-header">
              <h3>Solicite uma Consultoria</h3>
              <p>Nossa equipe especializada em IA analisará suas necessidades e apresentará a melhor solução para seu negócio</p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Seu nome completo" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="seu@email.com" 
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    placeholder="Nome da sua empresa" 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    placeholder="(47) 99977-6326" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <select id="subject" name="subject" required>
                  <option value="">Selecione o assunto</option>
                  <option value="chatbot">Chatbot Inteligente</option>
                  <option value="estoque">Controle de Estoque</option>
                  <option value="transcricao">Assistente Virtual</option>
                  <option value="personalizado">Solução Personalizada</option>
                  <option value="duvidas">Dúvidas Gerais</option>
                  <option value="orcamento">Solicitação de Orçamento</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea 
                  id="message"
                  name="message"
                  placeholder="Descreva seu projeto, necessidades ou dúvidas..."
                  rows={6}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="contact-info-sidebar" ref={sidebarRef}>
            <div className="contact-info-wrapper">
              <div className="info-header">
                <h3>Contatos</h3>
                <p>Entre em contato direto pelos canais abaixo</p>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon email-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>Email de Suporte</h4>
                    <p>contato@remzy.com</p>
                    <span>Resposta em até 24h</span>
                    <a href="mailto:contato@remzy.com" className="email-btn">
                      Enviar email
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon whatsapp-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>WhatsApp</h4>
                    <p>+55 (47) 99977-6326</p>
                    <a href="https://wa.me/5547999776326" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                      Iniciar conversa
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon location-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>Localização</h4>
                    <p>Joinville, SC - Brasil</p>
                    <span>Seg-Sex 8:30h às 20h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 