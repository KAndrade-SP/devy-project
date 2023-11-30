import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { excerpt } from "../../utility/index"
import { Trash, Pen } from "@phosphor-icons/react"

import './styles.scss'

const PostSection = ({ blogs, user }) => {
  return (
    <>
        <div className="section">
            <div className="section-title">Posts diários</div>
        </div>
        
        {blogs?.map((item) => (
            <div className="max-w-[1024px] grid gap-4 place-content-center mx-5 lg:m-auto mb-2 items-center md:px-0" key={item.id}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src={item.imgUrl} alt={item.title} />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                        </a>

                        <span className="flex flex-row gap-3 mb-2">
                            <p className="font-medium">{item.author}</p>
                            {item.timestamp.toDate().toDateString()}
                        </span>

                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">{excerpt(item.description, 120)}</p>
                        
                        <div className="flex flex-row gap-3 place-content-between">
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Ler mais
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <div className="flex flex-row gap-4 items-center">
                                <Trash size={32}></Trash>
                                <Pen size={32}></Pen>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>   
        ))}
    </>
    
    )
}

export default PostSection