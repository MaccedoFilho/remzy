import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FAQ.css'

gsap.registerPlugin(ScrollTrigger)

interface Message {
  type: 'user' | 'bot'
  content: string
  id: number
}

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const faqData = [
    {
      question: "Quanto tempo leva para implementar uma solução?",
      answer: "Entre 1 a 4 semanas, dependendo da complexidade! Projetos simples como chatbots ficam prontos em 1-2 semanas, enquanto soluções mais complexas podem levar 2-4 semanas. Sempre mantemos você informado sobre o progresso."
    },
    {
      question: "Que tipos de dados vocês trabalham?",
      answer: "Trabalhamos com praticamente tudo! Textos, documentos, planilhas, APIs, bancos de dados, imagens, áudios... Nossa especialidade é NLP, então somos experts em dados textuais."
    },
    {
      question: "É seguro? Como protegem nossos dados?",
      answer: "Segurança é nossa prioridade máxima! Usamos criptografia end-to-end, seguimos a LGPD rigorosamente, temos certificações de segurança e NUNCA armazenamos dados sensíveis. Tudo é auditável e transparente."
    },
    {
      question: "Precisa alterar nosso sistema atual?",
      answer: "Não precisa mexer em nada! Nossas soluções se integram via API sem alterar sua infraestrutura. Trabalhamos como um complemento inteligente aos seus sistemas atuais, sem interrupções."
    },
    {
      question: "Qual o investimento necessário?",
      answer: "Fazemos orçamento personalizado baseado no escopo. Oferecemos modelos flexíveis: projeto único, mensalidade ou revenue share. Análise inicial é gratuita!"
    },
    {
      question: "Oferecem suporte após implementação?",
      answer: "Claro! Suporte humanizado de seg-sex das 8:30 as 20:00! Oferecemos atualizações contínuas, monitoramento de performance e melhorias baseadas no uso. Nosso relacionamento é de longo prazo para garantir sua evolução constante."
    }
  ]

  const startConversation = () => {
    const welcomeBot: Message = {
      type: 'bot',
      content: "Olá! Sou a IA da Remzy, posso responder suas principais dúvidas. Clique em uma pergunta para começar!",
      id: 0
    }
    setMessages([welcomeBot])
  }

  const askQuestion = (index: number) => {
    if (index >= faqData.length) return

    const userMessage: Message = {
      type: 'user',
      content: faqData[index].question,
      id: messages.length + 1
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        type: 'bot',
        content: faqData[index].answer,
        id: messages.length + 2
      }
      setIsTyping(false)
      setMessages(prev => [...prev, botMessage])
      setCurrentQuestion(index + 1)
    }, 1500)
  }

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

      gsap.fromTo(chatRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    startConversation()
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <section id="faq" className="faq-section" ref={sectionRef}>
      <div className="faq-container">
        <h2 ref={titleRef} className="faq-title">Perguntas Frequentes</h2>
        
        <div className="chat-container" ref={chatRef}>
          <div className="chat-header">
            <div className="bot-avatar">
              <img src="/src/assets/remzy.png" alt="Remzy AI" />
            </div>
            <div className="bot-info">
              <span className="bot-name">Remzy AI Assistant</span>
              <span className="bot-status">Online</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-time">
                  {new Date().toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-questions">
            <div className="questions-title">Escolha uma pergunta:</div>
            <div className="questions-grid">
              {faqData.map((item, index) => (
                <button
                  key={index}
                  className={`question-btn ${index < currentQuestion ? 'asked' : ''}`}
                  onClick={() => askQuestion(index)}
                  disabled={index < currentQuestion || isTyping}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ 