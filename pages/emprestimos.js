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

    const juros = 10 // 10% fixo (podes mudar depois)
    const valorNum = Number(valor)
    const total = valorNum + (valorNum * juros / 100)

    await addDoc(emprestimosRef, {
      cliente,
      valor: valorNum,
      juros,
      total,
      status: "pendente",
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
        placeholder="Cliente"
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
        <div key={e.id} style={{ marginBottom: 10 }}>
          <b>{e.cliente}</b><br />
          Valor: {e.valor} MZN<br />
          Juros: {e.juros}%<br />
          Total a pagar: {e.total} MZN<br />
          Status: {e.status}
        </div>
      ))}
    </div>
  )
}
