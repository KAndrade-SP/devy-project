import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { excerpt } from "../utility"

const PostSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div>
        <div className="" key={id}>
            <div className="">
                <div className="">
                <div className="">
                    <img src={imgUrl} alt={title} />
                    <div></div>
                </div>
                </div>
            </div>

            <div className="">
                <div className="">
                    <h6 className="">{category}</h6>
                    <span className="">{title}</span>
                    <span className="">
                        <p className="">{author}</p> -&nbsp;
                        {timestamp.toDate().toDateString()}
                    </span>
                </div>
                <div className="">
                    {excerpt(description, 120)}
                </div>
                <Link to={`/detail/${id}`}>
                    <button className="">Ler mais</button>
                </Link>
                {user && user.uid === userId && (
                    <div style={{ float: "right" }}>
                        
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}

export default PostSection