import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"

export default function Emprestimos() {

  const [cliente, setCliente] = useState("")
  const [valor, setValor] = useState("")
  const [lista, setLista] = useState([])

  const emprestimosRef = collection(db, "emprestimos")

  async function adicionarEmprestimo() {
    if (!cliente || !valor) {
      alert("Preenche todos os campos")
      return
    }

    await addDoc(emprestimosRef, {
      cliente,
      valor: Number(valor),
      data: new Date().toISOString()
    })

    setCliente("")
    setValor("")
    carregarEmprestimos()
  }

  async function carregarEmprestimos() {
    const data = await getDocs(emprestimosRef)

    setLista(
      data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    )
  }

  useEffect(() => {
    carregarEmprestimos()
  }, [])

  return (
    <div style={{ padding: 30 }}>
      <h1>Empréstimos</h1>

      <input
        placeholder="Nome do cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Valor do empréstimo"
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <br /><br />

      <button onClick={adicionarEmprestimo}>
        Criar Empréstimo
      </button>

      <hr />

      <h3>Lista de Empréstimos</h3>

      {lista.map((e) => (
        <div key={e.id}>
          {e.cliente} - {e.valor} MZN
        </div>
      ))}
    </div>
  )
}
