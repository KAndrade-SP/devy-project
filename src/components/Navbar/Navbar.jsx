import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, X, House, GraduationCap, Question, Info, PaperPlaneTilt, SignOut } from "@phosphor-icons/react"

import { auth } from '../../services/firebase'

import './styles.scss'

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState()
    const [isLogged, setLogged] = useState(false)
    const [toggle,setToggle] = useState(false)

    const handleClick = () => setToggle(!toggle)
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true

        auth.onAuthStateChanged(user => {
            if (isMounted && user) { console.log(user)} 
            setLogged(true)
            setCurrentUser(user)
        })

        return () => { isMounted = false }
    }, [])  

    const signOut = async () => {
        await auth.signOut().then(() => {
            navigate("/")
        })
    }

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

                    {
                    isLogged && currentUser ?
                        <a className='flex justify-end gap-4 items-center cursor-pointer hover:text-[#a0a2ab]'>
                            <p className='lg:m-auto md:text-sm'>{currentUser.displayName}</p>
                            <img src={currentUser.photoURL} className='w-[40px] mr-10 lg:m-auto rounded-full'></img>
                        </a>
                    :
                        <button className='px-8 mr-10 lg:m-auto nav-button'><a href='/login'>Fazer login</a></button>
                    }
                    
                </div>

                <div className='md:hidden mr-10' onClick={handleClick}>
                    {toggle?<X size={24}/>:<List size={24}/>}
                </div>
            </div>

            <div className={toggle?'absolute z-10 w-full px-4 md:hidden':'hidden'}>
                <ul>
                    {
                    isLogged && currentUser ?
                        <a className='flex pl-4 pt-2 items-center'>
                            <img src={currentUser.photoURL} className='w-[24px] rounded-full'></img>
                            <li className='p-4 nav-link'>Perfil</li>
                        </a>
                    :
                        <></>
                    }
                    <div className='flex pl-4 pt-2 items-center'>
                        <House size={24}/>
                        <li className='p-4 nav-link'>Início</li>
                    </div>
                    
                    <div className='flex pl-4 pt-2 items-center'>
                        <GraduationCap size={24}/>
                        <li className='p-4 nav-link'>Cursos</li>
                    </div>
                    
                    <div className='flex pl-4 pt-2 items-center'>
                        <Question size={24}/>
                        <li className='p-4 nav-link'>Ajuda</li>
                    </div>
                    
                    <div className='flex pl-4 pt-2 items-center'>
                        <Info size={24}/>
                        <li className='p-4 nav-link'>Sobre</li>
                    </div>

                    <div className='flex pl-4 pt-2 items-center'>
                        <PaperPlaneTilt size={24}/>
                        <li className='p-4 nav-link'>Contatos</li>
                    </div>
                    
                    {
                    isLogged && currentUser ?
                        <div className='flex pl-4 pt-2 items-center' onClick={signOut}>
                            <SignOut size={24}/>
                            <li className='p-4 nav-link'>Sair</li>
                        </div>
                    :
                        <></>
                    }
                    
                    <div className='flex flex-col my-2 gap-4'>
                        {
                        isLogged && currentUser ?
                            <></>
                        :
                            <button className='px-8 nav-button'><a href='/login'>Fazer login</a></button>
                        }
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Navbar