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
    <div className='flex flex-col items-center box-border mt-8 bg-purple-100 w-120 m-auto rounded-xl shadow-md'>
      <h1 className=''>To-do List</h1>
      <div className='flex gap-2 mt-5'>
        <input className='bg-blue-100 rounded-xl relative overflow-hidden' type="text" placeholder='task' value={input} onChange={e => setInput(e.target.value)} />
        <button className='bg-green-400 rounded-xl ' onClick={adicionar}>adicionar</button>
        
        <button className='bg-blue-500 rounded-xl' onClick={() => setFilter("all")}>todas</button>
        <button className='bg-blue-500 rounded-xl' onClick={() => setFilter("done")}>cocluidas</button>
        <button className='bg-blue-500 rounded-xl' onClick={() => setFilter("pending")}>pendentes</button>
      </div>


      {filterTask.map((lista, idx) => (
        <ul key={idx}>
          <li onClick={() => toggle(idx)} className={lista.done ? "riscado" : ""}>{lista.text}</li>
          <button className='bg-red-400 rounded-xl' onClick={() => remover(idx)}>remove</button>
        </ul>
      ))}
      <p className='mt-5'>tot tasks: {list.length}</p>
    </div>
  )
}
export default App