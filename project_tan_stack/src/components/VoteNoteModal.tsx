interface VoteNoteModalProps {
  noteInput: string;
  setNoteInput: (val: string) => void;
  submitVote: () => void;
  onClose: () => void;
}

export function VoteNoteModal({ noteInput, setNoteInput, submitVote, onClose }: VoteNoteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Dodaj notatkę (opcjonalnie)
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Dlaczego taka ocena?
        </p>
        <textarea
          className="w-full border border-slate-300 rounded-xl p-3 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm resize-none mb-6"
          rows={4}
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Wpisz swój komentarz tutaj..."
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={submitVote}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Wyślij
          </button>
        </div>
      </div>
      
    </div>
  );
}