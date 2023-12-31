import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TagsInput } from "react-tag-input-component"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore"
import { toast } from "react-toastify"

import { db, storage } from "../../services/firebase"
import './styles.scss'

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: []
}

const categoryOption = [
  "IoT - Internet das Coisas",
  "Tecnologia Geral",
  "Computação em Nuvem",
  "Desenvolvimento Front-end",
  "Desenvolvimento Back-end",
  "Inteligência Artificial",
]

const AddEditPost = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)

  const { id } = useParams()
  const { title, tags, category, trending, description } = form

  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {

      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          
          console.log("Upload está " + progress + "% completo")
          
          setProgress(progress)

          switch (snapshot.state) {
            case "paused":
              console.log("Upload pausado")
              break
            case "running":
              console.log("Realizando upload")
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Imagem enviada com sucesso!")
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  useEffect(() => {
    id && getPostDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getPostDetail = async () => {
    const docRef = doc(db, "blogs", id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() })
    }
    setActive(null)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTags = (tags) => {
    setForm({ ...form, tags })
  }

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value })
  }

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Postagem realizada com sucesso!")
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Post atualizado com sucesso!")
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      return toast.error("Todos os campos devem ser preenchidos.")
    }
    navigate("/")
  }

  return (
    <>
      <section className="section">
        <h2 className="section-title">{id ? "Atualizar post" : "Criar post"}</h2>
      </section>

      <div className="max-w-[1024px] mx-5 lg:m-auto mb-2 items-center md:px-0">
          <form className="post__form" onSubmit={handleSubmit}>
              <div className="post__inputs">
                  <input
                    type="text"
                    className="post__input mb-4"
                    placeholder="Título"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />

                  <span className="block mb-2">É um trending post?</span>

                  <div className="container">
                    <div className="radio m-4">
                      <input 
                        id="radio-1" 
                        name="radio" 
                        type="radio" 
                        value="Sim"
                        checked={trending === "Sim"}
                        onChange={handleTrending}
                      />
                      <label htmlFor="radio-1" className="radio-label">Sim</label>
                    </div>

                    <div className="radio m-4">
                      <input 
                        id="radio-2" 
                        name="radio" 
                        type="radio"
                        value="Não"
                        checked={trending === "Não"}
                        onChange={handleTrending}
                      />
                      <label htmlFor="radio-2" className="radio-label">Não</label>
                    </div>
                  </div>
              </div>

              <div className="post__input-tag mb-4">
                <TagsInput
                  value={tags}
                  placeHolder="Tags"
                  onChange={handleTags}
                />
              </div>

              <select 
                id="countries" 
                className="post__dropdown mb-4 cursor-pointer rounded-lg block w-full p-2.5"
                value={category}
                onChange={onCategoryChange}
              >
                <option defaultValue>Selecionar categoria</option>
                {categoryOption.map((option, index) => (
                  <option value={option || ""} key={index}>
                    {option}
                  </option>
                ))}
              </select>

              <label 
                htmlFor="message" 
                className="block mb-4">
                Descrição
              </label>
              <textarea 
                id="message" 
                rows="4" 
                className="post__area block mb-4"
                placeholder="Descrição da postagem"
                value={description}
                name="description"
                onChange={handleChange}
              />

              <div className="mb-4 flex items-center justify-center w-full">
                  <label 
                    htmlFor="file" 
                    className="post__upload-area flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"
                  >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 pr-2 pl-2">
                          <svg 
                            className="w-8 h-8 mb-4" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 20 16">
                              <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                          </svg>
                          <p className="post__upload-text mb-2 text-center">
                            <span className="font-semibold">Clique para escolher uma imagem</span> ou arraste e solte
                          </p>
                          <p className="post__upload-text text-center">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input 
                        id="file" 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                  </label>
              </div>

              <div>
                <button
                  className="post__upload-button"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Atualizar" : "Enviar"}
                </button>
              </div>
          </form>
      </div>
    </>
  )
}

export default AddEditPost