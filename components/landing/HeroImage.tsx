import Image from 'next/image';


const HeroImage = () => {
  

  return (
    <div className="flex flex-col space-y-16 justify-center items-center min-h-[60vh] w-full lg:my-12 px-4">
        


      <div 
        className={`relative transform transition-all duration-300 ease-in-out 
        }`}
       
      >
        <Image
          src="/hero.png"
          alt="Hero Image"
          width={1200}
          height={500}
          priority
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className='text-2xl text-center lg:text-4xl'>
  A <span className='font-bold italic'>link in bio</span> with  
  <span className='font-bold italic bg-yellow-200 px-1 ml-2'>all your tools and products</span>
</div>
    </div>
  );
};

export default HeroImage;
