import { Link } from '@tanstack/react-router'

export function StudioRow({ studio, onOpenModal }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow mb-3">
      
      <Link 
        to="/studio/$id" 
        params={{ id: studio.id.toString() }}
        className="text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline"
      >
        {studio.name}
      </Link>
      <div className="flex gap-3">
        <button 
          onClick={() => onOpenModal(studio.id, 1)}
          className="flex items-center gap-2 px-4 py-2 border border-green-200 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-bold transition-colors"
        >
          👍 <span>{studio.upvotes || 0}</span>
        </button>
        <button 
          onClick={() => onOpenModal(studio.id, -1)}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-bold transition-colors"
        >
          👎 <span>{studio.downvotes || 0}</span>
        </button>
      </div>
      
    </div>
  )
}