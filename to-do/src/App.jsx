import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('all')


  /* adicionar */
  function adicionar() {
    if (!input) {
      return
    }
    setList([...list, { text: input, done: false }])
    setInput('')
  }

  /* remover */
  function remover(id) {
    const newList = list.filter((_, tasks) => tasks !== id)
    setList(newList)
  }

  /* logica do risco */
  function toggle(id) {
    const up = list.map((marcado, idx) => {
      if (idx === id) {
        return { ...marcado, done: !marcado.done }
      }
      return marcado
    })
    setList(up)
  }
  /* mostrar os resultados */
  const filterTask = list.filter(task => {
    if (filter === "all") return true
    if (filter === "done") return task.done
    if (filter === "pending") return !task.done
  })

  return (
    <div className='div-geral'>
      <h1>To-do List</h1>
      <div className='container-opcoes'>
        <div className='add-div'>
          <input type="text" placeholder='task' value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={adicionar}>adicionar</button>
        </div>

        <div className='buttons'>
          <button onClick={() => setFilter("all")}>todas</button>
          <button onClick={() => setFilter("done")}>cocluidas</button>
          <button onClick={() => setFilter("pending")}>pendentes</button>
        </div>
        {filterTask.map((lista, idx) => (
          <ul key={idx}>
            <li onClick={() => toggle(idx)} className={lista.done ? "riscado" : ""}>{lista.text}</li>
            <button onClick={() => remover(idx)}>remove</button>
          </ul> 
        ))}
      </div>
    

      <p >tot tasks: {list.length}</p>
    </div>
  )
}
export default App