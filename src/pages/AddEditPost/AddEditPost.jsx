import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { db, storage } from "../../services/firebase";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: []
};

const categoryOption = [
  "IoT - Internet das Coisas",
  "Tecnologia Geral",
  "Computação em Nuvem",
  "Desenvolvimento Front-end",
  "Desenvolvimento Back-end",
  "Inteligência Artificial",
];

const AddEditPost = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload pausado");
              break;
            case "running":
              console.log("Realizando upload");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Imagem enviada com sucesso!");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPostDetail = async () => {
    const docRef = doc(db, "posts", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Postagem realizada com sucesso!");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Post atualizado com sucesso!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("Todos os campos devem ser preenchidos.");
    }

    navigate("/");
  };

  return (
    <section className="max-w-[1024px] mx-5 lg:m-auto w-full h-full items-center md:px-0">
      <div className="">
        <div className="">
          <div className="">
            {id ? "Atualizar post" : "Criar post"}
          </div>
        </div>
        <div className="">
          <div className="">
            <form className="" onSubmit={handleSubmit}>
              <div className="">
                <input
                  type="text"
                  className=""
                  placeholder="Título"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                {/* <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                /> */}
              </div>
              <div className="">
                <p className="">É um trending post?</p>
                <div className="">
                  <input
                    type="radio"
                    className=""
                    value="Sim"
                    name="radioOption"
                    checked={trending === "Sim"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="">
                    Sim&nbsp;
                  </label>
                  <input
                    type="radio"
                    className=""
                    value="Não"
                    name="radioOption"
                    checked={trending === "Não"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="">
                    Não
                  </label>
                </div>
              </div>
              <div className="">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className=""
                >
                  <option>Selecionar categoria</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <textarea
                  className=""
                  placeholder="Descrição"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <input
                  type="file"
                  className=""
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="">
                <button
                  className=""
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Atualizar" : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEditPost;