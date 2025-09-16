
import testImg from '../assets/img/test.png'
const Hero = () => {
  return (
    <div className='flex !p-5 justify-between relative' >
      <div className='flex flex-col items-center justify-center !pl-30'>
        <h1 className='font-playfair font-normal text-5xl w-[391px] text-left !mb-[44px]'>“Jewellery as accents of your individuality”</h1>
         <button  className={'shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]'} >
          View Catalog
         </button>
      </div>
      <div>
        <img src={testImg} alt='test' className='w-[912px] h-[692px] '/>
      </div>
      <div className="absolute bottom-0 left-1/2 w-[1000px] border-b-1 border-black -translate-x-1/2"></div>
    </div>
  )
}

export default Hero
