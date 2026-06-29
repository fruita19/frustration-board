import { Link } from '@tanstack/react-router'
import { VoteButtons } from './VoteButtons'

interface Props {
  studio: any
  onOpenModal: (id: number, type: number) => void
}

export const StudioRow = ({ studio, onOpenModal }: Props) => {
  return (
    <div className="w-full flex justify-between items-center py-4 border-b border-slate-100 last:border-0 transition-all">
      <Link
        to="/studio/$id"
        params={{ id: String(studio.id) }}
        className="font-bold text-blue-600 hover:text-blue-800 text-base tracking-wide"
      >
        {studio.name}
      </Link>
      <VoteButtons
        ups={studio.ups}
        downs={studio.downs}
        onVoteClick={(type) => onOpenModal(studio.id, type)}
      />
      
    </div>
  )
}