import React from 'react'

interface Props {
  ups: number;
  downs: number;
  onVoteClick: (type: number) => void;
}

export const VoteButtons: React.FC<Props> = ({ ups, downs, onVoteClick }) => {
  return (
    <div className="flex gap-3">
      <button 
        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-100 text-green-700 hover:bg-green-500 hover:text-white font-bold text-sm rounded-lg border-2 border-green-400 shadow-xs transition-all cursor-pointer" 
        onClick={() => onVoteClick(1)}
      >
        👍 {ups}
      </button>
      
      <button 
        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-100 text-red-700 hover:bg-red-500 hover:text-white font-bold text-sm rounded-lg border-2 border-red-400 shadow-xs transition-all cursor-pointer" 
        onClick={() => onVoteClick(-1)}
      >
        👎 {downs}
      </button>

    </div>
  )
}