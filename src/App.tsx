import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Process from './components/Process'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './components/Footer.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default App