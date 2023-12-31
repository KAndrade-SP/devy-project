import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogo } from "@phosphor-icons/react"

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from '../../services/firebase'

import './styles.scss'
import devyLogo from '../../assets/images/devy-logo.png'

export function Login() {

  const navigate = useNavigate()
  
  useEffect(() => {
    let isMounted = true

    auth.onAuthStateChanged(user => {
      if (isMounted && user) { navigate("/") }
    })
    return () => { isMounted = false }
  }, [])

  const [user, setUser] = useState()

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="container-login">

      <div className="logo-login">
        <img src={devyLogo} alt="Logo da aplicação" />
      </div>

      <div className="login-content">
        <h1>Acesse sua conta</h1>

        <span>
          Utilize uma conta Google para obter acesso completo às funcionalidades da aplicação.
        </span>
      </div>    

      <button type="button" onClick={signInWithGoogle} className="button-login">
        <GoogleLogo />
        Entrar com Google
      </button>
    </div>
  )
}