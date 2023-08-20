import React, { useState } from 'react'
import { List, Lock, X } from "@phosphor-icons/react"

import './styles.scss'

const Navbar = () => {

    const [toggle,setToggle]=useState(false)
    const handleClick = ()=> setToggle(!toggle)

  return (
    <div className='w-full h-[80px] border-b'>
        <div className='max-w-[1024px] mx-5 lg:m-auto w-full h-full flex justify-between items-center md:px-0 px-4'> 
            
            <p className='text-lg'>DevY</p>
            
            <div className='hidden md:flex items-center '>
                <ul className='flex gap-4'>
                    <li className='nav-link'>Início</li>
                    <li className='nav-link'>Cursos</li>
                    <li className='nav-link'>Ajuda</li>
                    <li className='nav-link'>Sobre</li>
                    <li className='nav-link'>Contatos</li>
                </ul>
            </div>

            <div className='hidden md:flex'>
                <button className='px-8 mr-10 lg:m-auto nav-button'>Fazer login</button>
            </div>

            <div className='md:hidden mr-10' onClick={handleClick}>
                {toggle?<X size={24}/>:<List size={24}/>}
            </div>
        </div>

        <div className={toggle?'absolute z-10 w-full px-8 md:hidden':'hidden'}>
            <ul>
                <li className='p-4 nav-link'>Início</li>
                <li className='p-4 nav-link'>Cursos</li>
                <li className='p-4 nav-link'>Ajuda</li>
                <li className='p-4 nav-link'>Sobre</li>
                <li className='p-4 nav-link'>Contatos</li>
                <div className='flex flex-col my-4 gap-4'>
                    <button className='px-8 rounded-md nav-button'>Fazer login</button>
                </div>
            </ul>
        </div>
    </div>
  )
}

export default Navbar