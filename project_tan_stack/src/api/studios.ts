import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const fetchStudios = async (search: string = '') => {
  const res = await axios.get(`${API_URL}/studios`, {
    params: { search }
  })
  return res.data
}

export const fetchStudioHistory = async (id: number | string) => {
  const res = await axios.get(`${API_URL}/history/${id}`)
  return res.data
}

export const postVote = async (voteData: {
  studio_id: number;
  vote_type: number;
  user_name: string;
  note: string;
}) => {
  const res = await axios.post(`${API_URL}/votes`, voteData)
  return res.data
}