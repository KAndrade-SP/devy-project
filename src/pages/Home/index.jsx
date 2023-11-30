import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    query,
    orderBy,
    where,
    startAfter,
  } from "firebase/firestore"
import { db } from "../firebase"
import { toast } from "react-toastify"
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"

import PostSection from "../../components/PostSection/PostSection"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = ({ setActive, user, active }) => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(
          collection(db, "blogs"),
          (snapshot) => {
            let list = []
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() })
            })
            setBlogs(list)
          },
          (error) => {
            console.log(error)
          }
        )
    
        return () => {
          unsub()
        }
      }, [])

    return (
        <>
            <div>
                <PostSection></PostSection>
            </div>
        </>
    )
}