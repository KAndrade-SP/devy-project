import { useEffect, useState } from 'react';
import { GoogleLogo } from "@phosphor-icons/react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../services/firebase';

import './styles.scss';
import { useNavigate } from 'react-router-dom';

export function Login() {

  const navigate = useNavigate()

  //Verifica mudança de estado de usuario, se:
  //- user for verdadeiro, será direcionado para Home.
  useEffect(() => {
    let isMounted = true

    auth.onAuthStateChanged(user => {
      if (isMounted && user) { navigate("/") } else navigate("/login")
    })
    return () => { isMounted = false }
  }, [])

  const [user, setUser] = useState();

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);

      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">

      {/* <div className="user">
        {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}

        <strong>{user.displayName}</strong>
        <small>{user.email}</small>
      </div> */}

      <h1>Acesse sua conta</h1>

      <span>
        Utilizando autenticação social, por exemplo, autenticação com a Google você <br />
        facilita a vida do usuário permitindo utilizar a aplicação sem fazer cadastrado.
      </span>

      <button type="button" onClick={signInWithGoogle} className="button">
        <GoogleLogo />
        Entrar com Google
      </button>
    </div>
  )
}