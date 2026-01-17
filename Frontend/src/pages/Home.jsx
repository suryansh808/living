import { useRef } from "react"
// import Header from './Components/Header'
import Hero from '../Components/Hero'
import About from '../Components/About'
import OurWebsites from '../Components/OurWebsites'
import Section1 from '../Components/Section1'
import Section2 from '../Components/Section2'
import InquiryForm from '../Components/InquiryForm'
import FAQ from '../Components/FAQ'
import Footer from '../Components/Footer'
import Header from "../Components/Header"

const Home = () => {

    const heroRef = useRef(null)
    const aboutRef = useRef(null)
    const ourWebsitesRef = useRef(null)
    const inquiryFormRef = useRef(null)

    const scrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
          <div>
         <Header
             OnHero={() => scrollTo(heroRef)}
             OnAbout={() => scrollTo(aboutRef)}
             OnOurWebsite={() => scrollTo(ourWebsitesRef)}
             OnInquriyForm={() => scrollTo(inquiryFormRef)}     
         />
         <div ref={heroRef}><Hero/></div>
         <div ref={aboutRef}><About/></div>
         <div ref={ourWebsitesRef}> <OurWebsites/></div>
         <Section1/>
         <Section2/>
         <div ref={inquiryFormRef}><InquiryForm/></div>
         <FAQ/>
         <Footer 
              OnHero={() => scrollTo(heroRef)}
             OnAbout={() => scrollTo(aboutRef)}
             OnOurWebsite={() => scrollTo(ourWebsitesRef)}
             OnInquriyForm={() => scrollTo(inquiryFormRef)}
         />
    </div>
  )
}

export default Home
