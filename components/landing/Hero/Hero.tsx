

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"
import Link from "next/link"
import SignUpButton from "../SignUpButton"

const Hero = () => {
  return (
    <HeroHighlight
      
        className="text-3xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto  flex flex-col items-center justify-center space-y-4"
      >
        <div>
       Build. Share. Inspire. 
        <Highlight className="text-black dark:text-white mx-2">Showcase your creations and tech</Highlight>
        with a vibrant community of innovators.
        </div>
        <SignUpButton/>
        
      
    </HeroHighlight>
  )
}

export default Hero