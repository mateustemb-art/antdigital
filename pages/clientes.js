import { useState } from "react"

export default function Clientes() {

  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [lista, setLista] = useState([])

  function adicionarCliente() {
    if (!nome || !telefone) {
      alert("Preenche todos os campos")
      return
    }

    const novoCliente = {
      nome,
      telefone
    }

    setLista([...lista, novoCliente])

    setNome("")
    setTelefone("")
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Clientes</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <button onClick={adicionarCliente}>
        Adicionar Cliente
      </button>

      <hr />

      <h3>Lista de Clientes</h3>

      {lista.map((c, index) => (
        <div key={index}>
          {c.nome} - {c.telefone}
        </div>
      ))}
    </div>
  )
}
