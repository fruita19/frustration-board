import { Studio } from '../types'

export const sortStudios = (studios: any[], sortMode: string) => {
  const sorted = [...studios];
  
  switch (sortMode) {
    case "+1 malejąco":
      return sorted.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      
    case "+1 rosnąco":
      return sorted.sort((a, b) => (a.upvotes || 0) - (b.upvotes || 0));
      
    case "-1 malejąco":
      return sorted.sort((a, b) => (b.downvotes || 0) - (a.downvotes || 0));
      
    case "-1 rosnąco":
      return sorted.sort((a, b) => (a.downvotes || 0) - (b.downvotes || 0));
      
    default:
      return sorted;
  }
};