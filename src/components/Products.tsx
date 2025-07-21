import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const product1Ref = useRef<HTMLDivElement>(null)
  const product2Ref = useRef<HTMLDivElement>(null)
  const product3Ref = useRef<HTMLDivElement>(null)
  const chatbotAnimRef = useRef<HTMLDivElement>(null)
  const stockAnimRef = useRef<HTMLDivElement>(null)
  const assistantAnimRef = useRef<HTMLDivElement>(null)

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

      const products = [product1Ref.current, product2Ref.current, product3Ref.current]
      gsap.fromTo(products,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      )

      const animations = [chatbotAnimRef.current, stockAnimRef.current, assistantAnimRef.current]
      gsap.fromTo(animations,
        { opacity: 0, x: 100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      )

      const chatBubbles = chatbotAnimRef.current?.querySelectorAll('.chat-bubble')
      if (chatBubbles) {
        gsap.fromTo(chatBubbles,
          { opacity: 0, scale: 0, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.4,
            delay: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        )
      }

      const typingDots = chatbotAnimRef.current?.querySelectorAll('.typing-dot')
      if (typingDots) {
        gsap.to(typingDots, {
          y: -5,
          duration: 0.5,
          stagger: 0.1,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut"
        })
      }

      const stockBars = stockAnimRef.current?.querySelectorAll('.stock-bar')
      if (stockBars) {
        gsap.fromTo(stockBars,
          { width: '0%' },
          {
            width: (index) => [75, 60, 90][index] + '%',
            duration: 1.5,
            stagger: 0.2,
            delay: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        )
      }

      const stockNumbers = stockAnimRef.current?.querySelectorAll('.stock-number')
      if (stockNumbers) {
        stockNumbers.forEach((number, index) => {
          const finalValue = [1250, 890, 450][index]
          gsap.fromTo(number, 
            { innerHTML: 0 },
            {
              innerHTML: finalValue,
              duration: 2,
              delay: 1.8 + (index * 0.2),
              ease: "power2.out",
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
              }
            }
          )
        })
      }

      const highlightItems = assistantAnimRef.current?.querySelectorAll('.highlight-item')
      if (highlightItems) {
        gsap.fromTo(highlightItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            delay: 2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        )
      }

      const recordIcon = assistantAnimRef.current?.querySelector('.record-icon')
      if (recordIcon) {
        gsap.to(recordIcon, {
          scale: 1.2,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut"
        })
      }

      const saibaMaisBtns = sectionRef.current?.querySelectorAll('.saiba-mais-btn')
      if (saibaMaisBtns) {
        gsap.fromTo(saibaMaisBtns,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
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
    <section id="produtos" className="products-section" ref={sectionRef}>
      <div className="products-container">
        <h2 ref={titleRef} className="products-title">Nossos Produtos</h2>
        
        <div className="products-list">
          <div className="product-item" ref={product1Ref}>
            <div className="product-text">
              <h3>Chatbot Inteligente</h3>
              <p>
                Nossa solução de chatbot utiliza processamento de linguagem natural avançado para 
                compreender e responder às consultas dos clientes de forma natural e precisa. 
                Integra-se perfeitamente com seus sistemas existentes, oferecendo suporte 24/7 
                e reduzindo significativamente o tempo de resposta. O sistema aprende continuamente 
                com cada interação, melhorando suas respostas e proporcionando uma experiência 
                cada vez mais personalizada para seus usuários.
              </p>
              <button 
                className="saiba-mais-btn"
                onClick={() => {
                  const element = document.getElementById('contato')
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                    setTimeout(() => {
                      const select = document.getElementById('subject') as HTMLSelectElement
                      const textarea = document.getElementById('message') as HTMLTextAreaElement
                      if (select) {
                        select.value = 'chatbot'
                        select.dispatchEvent(new Event('change'))
                      }
                      if (textarea) {
                        textarea.value = 'Olá! Tenho interesse no Chatbot Inteligente da Remzy. Gostaria de saber mais sobre como essa solução pode ser implementada na minha empresa, incluindo funcionalidades, tempo de implementação e investimento necessário.'
                        textarea.dispatchEvent(new Event('input'))
                      }
                    }, 800)
                  }
                }}
              >
                Saiba mais
              </button>
            </div>
            <div className="product-animation" ref={chatbotAnimRef}>
              <div className="chatbot-container">
                <div className="chat-bubble user-bubble">
                  Olá, tudo bem?
                </div>
                <div className="chat-bubble bot-bubble">
                  Olá! Como posso ajudar?
                </div>
                <div className="chat-bubble user-bubble">
                  Preciso saber mais sobre vocês
                </div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-item" ref={product2Ref}>
            <div className="product-text">
              <h3>Controle de Estoque Inteligente</h3>
              <p>
                Sistema automatizado de gestão de estoque que utiliza algoritmos de machine learning 
                para prever demandas futuras e otimizar níveis de inventário. Monitora em tempo real 
                movimentações, identifica padrões de consumo e sugere ações preventivas para evitar 
                rupturas ou excessos. A plataforma integra dados de vendas, sazonalidade e tendências 
                de mercado para fornecer insights precisos sobre quando e quanto comprar, garantindo 
                eficiência operacional e redução de custos.
              </p>
              <button 
                className="saiba-mais-btn"
                onClick={() => {
                  const element = document.getElementById('contato')
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                    setTimeout(() => {
                      const select = document.getElementById('subject') as HTMLSelectElement
                      const textarea = document.getElementById('message') as HTMLTextAreaElement
                      if (select) {
                        select.value = 'estoque'
                        select.dispatchEvent(new Event('change'))
                      }
                      if (textarea) {
                        textarea.value = 'Olá! Tenho interesse na solução de Controle de Estoque Inteligente. Gostaria de entender como o sistema pode se integrar com nossos processos atuais e quais são os benefícios específicos para otimização do nosso inventário.'
                        textarea.dispatchEvent(new Event('input'))
                      }
                    }, 800)
                  }
                }}
              >
                Saiba mais
              </button>
            </div>
                         <div className="product-animation" ref={stockAnimRef}>
               <div className="stock-container">
                 <div className="stock-header">
                   <h4>Estoque Inteligente • IA 🧠</h4>
                 </div>
                 <div className="stock-table">
                   <div className="table-header">
                     <span>Item</span>
                     <span>Qtde</span>
                     <span>Próx. Repor</span>
                   </div>
                   <div className="table-row">
                     <span>Produto A</span>
                     <span className="stock-number">0</span>
                     <div className="restock-info">
                       <span>em 4 dias</span>
                       <div className="progress-bar">
                         <div className="stock-bar"></div>
                       </div>
                       <span className="percentage positive">+10%</span>
                     </div>
                   </div>
                   <div className="table-row">
                     <span>Produto B</span>
                     <span className="stock-number">0</span>
                     <div className="restock-info">
                       <span>em 10 dias</span>
                       <div className="progress-bar">
                         <div className="stock-bar"></div>
                       </div>
                       <span className="percentage negative">-5%</span>
                     </div>
                   </div>
                   <div className="table-row">
                     <span>Produto C</span>
                     <span className="stock-number">0</span>
                     <div className="restock-info">
                       <span>em 2 dias</span>
                       <div className="progress-bar">
                         <div className="stock-bar"></div>
                       </div>
                       <span className="percentage positive">+25%</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div className="product-item" ref={product3Ref}>
            <div className="product-text">
              <h3>Assistente Virtual para Reuniões</h3>
              <p>
                Assistente de IA especializado em transcrição e análise de reuniões em tempo real. 
                Captura automaticamente conversas, identifica participantes, extrai pontos-chave 
                e gera resumos executivos instantâneos. Funciona com múltiplos idiomas e dialetos, 
                oferece busca inteligente por tópicos discutidos e cria listas de ações automáticas. 
                Integra-se com principais plataformas de videoconferência e mantém total 
                confidencialidade dos dados processados.
              </p>
              <button 
                className="saiba-mais-btn"
                onClick={() => {
                  const element = document.getElementById('contato')
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                    setTimeout(() => {
                      const select = document.getElementById('subject') as HTMLSelectElement
                      const textarea = document.getElementById('message') as HTMLTextAreaElement
                      if (select) {
                        select.value = 'transcricao'
                        select.dispatchEvent(new Event('change'))
                      }
                      if (textarea) {
                        textarea.value = 'Olá! Tenho interesse no Assistente Virtual para Reuniões. Gostaria de saber mais sobre as funcionalidades de transcrição, como funciona a integração com plataformas de videoconferência e quais são as opções de implementação.'
                        textarea.dispatchEvent(new Event('input'))
                      }
                    }, 800)
                  }
                }}
              >
                Saiba mais
              </button>
            </div>
                         <div className="product-animation" ref={assistantAnimRef}>
               <div className="assistant-container">
                 <div className="assistant-header">
                   <h4>🎙️ Assistente Virtual para Reuniões • IA 🧠</h4>
                 </div>
                 <div className="assistant-content">
                   <div className="transcription-line">
                     <span className="play-icon">►</span>
                     <span className="transcription-text">"Bom dia <span className="highlight">a</span> todos, hoje vamos falar sobre..."</span>
                   </div>
                   <div className="recording-line">
                     <span className="record-icon">⏺</span>
                     <span className="recording-text">Transcrevendo <span className="highlight">em</span> tempo real...</span>
                   </div>
                   <div className="highlights-section">
                     <div className="highlights-title">
                       <span className="search-icon">🔍</span>
                       <span>Destaques</span>
                     </div>
                     <div className="highlights-list">
                       <span className="highlight-item">• Orçamento</span>
                       <span className="highlight-item">• Prazos</span>
                       <span className="highlight-item">• Riscos</span>
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

export default Products 