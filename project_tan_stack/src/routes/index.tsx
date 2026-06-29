import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { login, logout } from '../store/authSlice'
import { fetchStudios, postVote } from '../api/studios'
import { sortStudios } from '../utils/sortStudios'
import { LoginForm } from '../components/LoginForm'
import { StudioRow } from '../components/StudioRow'
import { VoteNoteModal } from '../components/VoteNoteModal'
import { Studio } from '../types'
import { toast } from 'sonner'
import { WeatherWidget } from '../components/WeatherWidget'

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      return await fetchStudios()
    } catch (error) {
      console.error('Błąd pobierania:', error)
      return []
    }
  },
  component: Home,
})

function Home() {
  const initialData = Route.useLoaderData() 
  const [currentData, setCurrentData] = useState<Studio[]>(initialData)
  const [studios, setStudios] = useState<Studio[]>(initialData)
  
  // REDUX: Pobieramy dane z globalnego magazynu (One-way data flow)
  const { isLoggedIn, username } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const [sortMode, setSortMode] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("sortMode") || "+1 malejąco"
    return "+1 malejąco"
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [loginInput, setLoginInput] = useState("")

  const [showNoteModal, setShowNoteModal] = useState(false)
  const [pendingVote, setPendingVote] = useState<{id: number, type: number} | null>(null)
  const [noteInput, setNoteInput] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const results = await fetchStudios(searchTerm)
        setCurrentData(results)
        setCurrentPage(1)
      } catch (error) {
        console.error("Błąd wyszukiwania:", error)
      }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
    setStudios(sortStudios(currentData, sortMode))
  }, [sortMode, currentData])

  const handleLogin = () => {
    const USERS = ["admin", "testuser"]
    if (USERS.includes(loginInput)) {
      // ONE-WAY DATA FLOW: Wysyłamy akcję do Reduxa zamiast lokalnego stanu!
      dispatch(login(loginInput))
      toast.success("Zalogowano pomyślnie!") 
    } else {
      toast.error("Nieznany użytkownik") 
    }
  }

  const handleLogout = () => {
    // ONE-WAY DATA FLOW: Wysyłamy akcję wylogowania
    dispatch(logout())
  }

  const handleOpenModal = (id: number, type: number) => {
    setPendingVote({ id, type })
    setShowNoteModal(true)
  }

  const handleSubmitVote = async () => {
    if (!pendingVote) return

    try {
      await postVote({
        studio_id: pendingVote.id,
        vote_type: pendingVote.type,
        user_name: username,
        note: noteInput.trim() ? noteInput : "" 
      })
      
      setNoteInput("")
      setShowNoteModal(false)
      const updated = await fetchStudios(searchTerm)
      setCurrentData(updated)
      toast.success("Twój głos został pomyślnie zapisany w bazie danych!")
      
    } catch (error) {
      console.error("Błąd zapisu w bazie:", error)
      toast.error("Nie udało się zapisać głosu w bazie Neon.")
    }
  }

  if (!isLoggedIn) {
    return <LoginForm loginInput={loginInput} setLoginInput={setLoginInput} handleLogin={handleLogin} />
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudios = studios.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(studios.length / itemsPerPage)

  return (
    <div className="min-h-screen w-full bg-slate-100 py-10 px-4 flex justify-center items-start font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200">
  
        <div className="flex justify-between items-baseline mb-6 pb-4 border-b border-slate-200">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Ranking Studiów</h1>
            <WeatherWidget />
          </div>
          
          <div className="text-right">
            <p className="text-sm text-slate-500 mb-1">
              Cześć, <span className="font-extrabold text-slate-800">{username}</span>!
            </p>
            <button onClick={handleLogout} className="text-xs text-blue-500 hover:text-blue-700 underline">
              Wyloguj się
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Szukaj studia (np. yoga, joga)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-3 text-slate-700 font-medium outline-hidden focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>

        <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-center gap-2 mb-6 border border-slate-200 text-sm font-semibold text-slate-600">
          Sortuj według: 
          <select 
            value={sortMode} 
            onChange={(e) => {
              setSortMode(e.target.value)
              if (typeof window !== "undefined") {
                localStorage.setItem("sortMode", e.target.value)
              }
            }}
            className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 font-bold text-slate-800 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option>+1 malejąco</option>
            <option>+1 rosnąco</option>
            <option>-1 malejąco</option>
            <option>-1 rosnąco</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          {paginatedStudios.length > 0 ? (
            paginatedStudios.map(s => (
              <StudioRow
                key={s.id} 
                studio={s} 
                onOpenModal={handleOpenModal}
              />
            ))
          ) : (
            <p className="text-center text-slate-500 py-4">Nie znaleziono żadnych studiów.</p>
          )}
        </div>

        {studios.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-200">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold disabled:opacity-50"
            >
              &larr; Poprzednia
            </button>
            <span className="text-slate-600 font-medium">
              Strona {currentPage} z {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold disabled:opacity-50"
            >
              Następna &rarr;
            </button>
          </div>
        )}

      </div>

      {showNoteModal && (
        <VoteNoteModal 
          noteInput={noteInput} 
          setNoteInput={setNoteInput} 
          submitVote={handleSubmitVote} 
          onClose={() => setShowNoteModal(false)} 
        />
      )}
    </div>
  )
}