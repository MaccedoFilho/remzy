import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Navbar.css'

function Navbar() {
  const navbarRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(navbarRef.current, 
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }
      )
    }

    const handleSmoothScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }

    const handleScroll = () => {
      const sections = ['home', 'sobre', 'produtos', 'processo', 'faq', 'contato']
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]) || 
                       (sections[i] === 'home' ? document.querySelector('.hero') : null)
        
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    const links = navbarRef.current?.querySelectorAll('a[href^="#"]')
    links?.forEach(link => {
      link.addEventListener('click', handleSmoothScroll)
    })

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      links?.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll)
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav ref={navbarRef} className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <span className="logo-text">remzy</span>
        </div>
        
        <div className="navbar-menu">
          <a href="#home" className={`nav-pill ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
          <a href="#sobre" className={`nav-pill ${activeSection === 'sobre' ? 'active' : ''}`}>Sobre</a>
          <a href="#produtos" className={`nav-pill ${activeSection === 'produtos' ? 'active' : ''}`}>Produtos</a>
          <a href="#processo" className={`nav-pill ${activeSection === 'processo' ? 'active' : ''}`}>Processo</a>
          <a href="#faq" className={`nav-pill ${activeSection === 'faq' ? 'active' : ''}`}>FAQ</a>
        </div>
        
        <a href="#contato" className="navbar-contact">Contato</a>
      </div>
    </nav>
  )
}

export default Navbar 