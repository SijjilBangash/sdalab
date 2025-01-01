import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for creativity and a desire to make fashion accessible to everyone. We’re dedicated to curating a diverse collection that blends timeless elegance with modern trends, ensuring there’s something for everyone in our store.</p>
          <p>At Forever, we believe that fashion is more than just clothing—it's an expression of your unique personality and confidence. Our mission is to bring you stylish, high-quality apparel that resonates with your individuality, whether you’re looking for everyday essentials or statement pieces for special occasions.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At Forever, our mission is to empower individuals to express themselves through fashion by offering high-quality, stylish, and affordable clothing. We are committed to creating an inclusive shopping experience, celebrating diversity, and providing exceptional customer service that inspires confidence and connection.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20  flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Forever, we deliver stylish, durable clothing through premium fabrics, rigorous checks, and precise craftsmanship, ensuring excellence you can trust.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20  flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Forever offers a seamless shopping experience with easy navigation, secure payments, and efficient delivery, making fashion just a click away.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20  flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our support team ensures prompt, personalized assistance for a hassle-free shopping journey, because your satisfaction is our success.</p>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About;