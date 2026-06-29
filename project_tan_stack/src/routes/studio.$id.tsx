import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { LoginForm } from '../components/LoginForm'
import { toast } from 'sonner'

export const Route = createFileRoute('/studio/$id')({
  component: StudioDetails,
})

function StudioDetails() {
  const { id } = Route.useParams()
  const [history, setHistory] = useState<any[]>([])
  const [studioName, setStudioName] = useState("")

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("isLoggedIn") === "true"
    return false
  })
  const [loginInput, setLoginInput] = useState("")

  const handleLogin = () => {
    const USERS = ["admin", "testuser"]
    if (USERS.includes(loginInput)) {
      setIsLoggedIn(true)
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("username", loginInput)
      }
      toast.success("Zalogowano pomyślnie!")
    } else {
      toast.error("Nieznany użytkownik")
    }
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/history/${id}`)
        setHistory(res.data)
        if (res.data.length > 0) {
          setStudioName(res.data[0].studio_name || "Studio")
        }
      } catch (err) {
        console.error("Błąd ładowania szczegółów", err)
      }
    }
    fetchDetails()
  }, [id, isLoggedIn])

  if (!isLoggedIn) {
    return <LoginForm loginInput={loginInput} setLoginInput={setLoginInput} handleLogin={handleLogin} />
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-900 bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
        <Link to="/" className="absolute top-4 right-5 text-slate-400 hover:text-red-500 font-bold transition-colors text-lg">
          ✕ Zamknij
        </Link>

        <h2 className="text-2xl font-extrabold text-center mb-6 text-slate-800 mt-4">
          Historia: <span className="text-blue-600">{studioName || `Studio ${id}`}</span>
        </h2>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-80 overflow-y-auto">
          {history.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {history.map((item, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <div className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 mb-2">
                    👤 {item.user_name || 'Użytkownik'}
                  </div>
                  <div className="text-sm text-slate-600">
                    {item.note || 'Brak notatki'}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-slate-500 py-6">
              Brak głosów w historii dla tego studia.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}