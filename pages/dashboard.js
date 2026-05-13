import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Dashboard() {

  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user")

    if (!user) {
      router.push("/")
    }
  }, [])

  function logout() {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard Microcrédito</h1>

      <p>Bem-vindo ao sistema</p>

      <button onClick={logout}>
        Sair
      </button>

      <hr />

      <h3>Módulos:</h3>

      <ul>
        <li>Clientes</li>
        <li>Empréstimos</li>
        <li>Pagamentos</li>
      </ul>
    </div>
  )
}
