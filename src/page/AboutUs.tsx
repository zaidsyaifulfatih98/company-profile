import Navbar from "../components/Navbar"
import image1 from '../assets/about1.jpg'
import image2 from '../assets/about2.jpg'
import Footer from "../components/Footer"

export default function AboutUs (){
    return (
        <>
        <Navbar/>

         <section className="min-h-screen bg-[#fafbfb] flex flex-col items-center pt-12 pb-5 px-4">
      
            <div className="flex flex-col lg:flex-row w-full max-w-5xl justify-center items-center gap-12 mt-2">
                {/* Foto */}
                <div className="flex-1 flex items-center justify-center">
                <img
                    src={image1}
                    alt="Anomali Coffee Shop"
                    className="rounded-xl shadow-lg w-[460px] h-auto object-cover"
                />
                </div>
        {/* Deskripsi */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-[#222] text-[18px] font-semibold leading-relaxed max-w-lg">
                        <p>
                        Established in 2007, Anomali Coffee is a coffee roaster company providing specialty coffee that signify a designated premium quality of the coffee in your cup. Anomali Coffee offers variety of coffee beans from all over Indonesia, each region has its own original coffee.
                        </p>
                        <br />
                        <p>
                        Our mission is to Promoting and Curating Indonesia Specialty Coffee through Educations and Experience.
                        </p>
                        <br />
                        <p>
                        Since then, Anomali Coffee has established itself as a prominent coffee producer specializing in freshly roasted coffee, with the highest standard made by our home roasters, focused on helping all of keys players in this journey from seed to cup.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="min-h-screen bg-[#F4F0E4] flex flex-col items-center pt-25  px-4">
      
            <div className="flex flex-col lg:flex-row w-full max-w-5xl justify-center items-center gap-20 mt-2">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-[#222] text-[18px] font-semibold leading-relaxed max-w-lg">
                        <p>
                        As a coffee roaster company , Anomali Coffee presents variant flavour of Indonesia Specialty Coffee with unique authentic taste and aroma. The products are made passionately using only the best quality ingredients. Anomali Coffee faithfully promote and curate Indonesia Specialty Coffee through experience and education, introduce them as one of Indonesian heritage.


                        </p>
                        <br />
                        <p>
                        Our coffee is destined for coffee connoi seurs and also for the Hotel, Restaurant, and Café sector, household and office consumption.
                        </p>
                        
                    </div>
                </div>
                
                
                {/* Foto */}
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src={image2}
                        alt="Anomali Coffee Shop"
                        className="rounded-xl shadow-lg w-[460px] h-auto object-cover"
                    />
                </div>
        
                
            </div>
        </section>

        <Footer/>
        </>
    )
}