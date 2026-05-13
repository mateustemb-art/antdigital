import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useRouter } from "next/router"

export default function Home() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function entrar() {
    try {
      await signInWithEmailAndPassword(auth, email, senha)
      alert("Login realizado com sucesso")
      router.push("/dashboard")
    } catch (erro) {
      alert("Email ou senha inválidos")
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Sistema de Microcrédito</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br /><br />

      <button onClick={entrar}>
        Entrar
      </button>
    </div>
  )
}
