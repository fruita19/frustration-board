export interface Studio { 
  id: number; 
  name: string; 
  ups: number; 
  downs: number; 
}

export interface VoteHistory { 
  user_name: string; 
  vote_type: number; 
  note: string; 
  created_at: string; 
}
