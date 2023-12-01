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
import { db } from "../../services/firebase"
import { toast } from "react-toastify"
import React, { useState, useEffect } from "react"

import PostSection from "../../components/PostSection/PostSection"


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

    const handleDelete = async (id) => {
      if (window.confirm("Você tem certeza que deseja excluir este post?")) {
        try {
          setLoading(true)
          await deleteDoc(doc(db, "blogs", id))
          setLoading(false)
        } catch(err) {
          console.log(err)
        }
      }
    }

    console.log("blogs", blogs)

    return (
        <>
            <main className="l-main">
              {/* --===== POSTS SECTION =====-- */}
              <section className="posts" id="posts">
                <PostSection 
                  blogs={blogs} 
                  user={user} 
                  handleDelete={handleDelete}
                />
              </section>
            </main>
        </>
    )
}

export default Home;