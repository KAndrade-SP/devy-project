import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { excerpt } from "../../utility/index"
import { Trash, Pen } from "@phosphor-icons/react"

import './styles.scss'

const PostSection = ({ blogs, user }) => {
  return (
    <div>
        <div className="blog-heading text-start mb-4"> Daily Posts</div>
        {blogs?.map((item) => (
            <div className="" key={item.id}>
                <div>
                    <div className="hover-blogs-img">
                        <div className="blogs-img">
                            <img src={item.imgUrl} alt="{item.title}"/>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-start">
                        <h6 className="category catg-color">{item.category}</h6>
                        <span className="title">{item.title}</span>
                        <span className="meta-info">
                            <p className="author">{item.author}</p>
                            {item.timestamp.toDate().toDateString()}
                        </span>
                    </div>

                    <div className="short-description">
                        {excerpt(item.description, 120)}
                    </div>

                    <button className="btn btn-read">Ler mais</button>
                    <div style={{float: "right"}}>
                        <Trash
                          style={{margin: "15px", cursor: "pointer"}}
                          size={32}
                        />
                        <Pen
                          style={{cursor: "pointer"}}
                          size={32}
                        />
                    </div>
                </div>
            </div>   
        ))}
    </div>
    )
}

export default PostSection