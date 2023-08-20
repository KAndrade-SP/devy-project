import React from 'react'

import devyLogo from '../../assets/images/devy-logo.png'

import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react"

const Footer = () => {
  return (
    <div className='w-full background py-24'>
        <div className='max-w-[1024px] lg:m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2 gap-8 px-4 md:px-0'>         
            <div className='col-span-2'>
                <img src={devyLogo} className="w-48 h-48" />
                
                <h3 className='text-2xl font-bold mt-10'>Contact Us</h3>
                <h3 className='py-2 text-[#6D737A]'>Call : +123 400 123</h3>
                <h3 className='py-2 text-[#6D737A]'>Praesent nulla massa, hendrerit <br></br> vestibulum gravida in, feugiat auctor felis.</h3>
                <h3 className='py-2 text-[#363A3D]'>Email: example@mail.com</h3>
                
                <div className='flex gap-4 py-4'>
                    <div className='p-4 bg-[#E9F8F3] rounded-xl'><FacebookLogo size={25} style={{color:'#4DC39E'}} /></div>
                    <div className='p-4 bg-[#E9F8F3] rounded-xl'><InstagramLogo size={25} style={{color:'#4DC39E'}} /></div>
                </div>
            </div>

            <div>
                <h3 className='text-2xl font-bold'>Explorar</h3>
                <ul className='py-6 text-[#6D737A]'>
                    <li className='py-4 nav-link'>Início</li>
                    <li className='py-4 nav-link'>Cursos</li>
                    <li className='py-4 nav-link'>Ajuda</li>
                    <li className='py-4 nav-link'>Sobre</li>
                    <li className='py-4 nav-link'>Contatos</li>
                </ul>
            </div>

            <div>
                <h3 className='text-2xl font-bold'>Categorias</h3>
                <ul className='py-6 text-[#6D737A]'>
                    <li className='py-4 nav-link'>Design</li>
                    <li className='py-4 nav-link'>Development</li>
                    <li className='py-4 nav-link'>Marketing</li>
                    <li className='py-4 nav-link'>Business</li>
                    <li className='py-4 nav-link'>Lifestyle</li>
                    <li className='py-4 nav-link'>Photography</li>
                    <li className='py-4 nav-link'>Music</li>
                </ul>
            </div>

            <div className='max-[780px]:col-span-2'>
                <h3 className='text-2xl font-bold'>Subscribe</h3>
                <h3 className='py-2 text-[#6D737A]'>Praesent nulla massa, hendrerit <br></br> vestibulum gravida in, feugiat auctor felis.</h3>
                <form className='py-4'>
                    <input 
                        className='bg-[#F2F3F4] p-4 w-full rounded' 
                        placeholder='Insira um e-mail' 
                    />
                    <button className='max-[780px]:w-full my-4 px-5 py-3 rounded-md bg-[#20B486] text-white font-medium'>Subscribe Now</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Footer