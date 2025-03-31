import Features from "./Features"
import Hero from "./Hero/Hero"
import HeroImage from "./HeroImage"
import Signup from "./Signup"




const MainPage = () => {
  return (
    <div className="mt-16">
        <Hero/>
        <HeroImage/>
        <div className="p-4 lg:mt-20 lg:p-8">
        <Features/>
        <Signup/>
        </div>
        
        
    </div>
  )
}

export default MainPage