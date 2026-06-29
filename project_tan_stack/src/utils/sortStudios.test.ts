import { describe, it, expect } from 'vitest'
import { sortStudios } from './sortStudios'
import { Studio } from '../types'

describe('sortStudios logic', () => {
  const mockStudios: Studio[] = [
    { id: 1, name: 'Słabe Studio', ups: 2, downs: 10 },
    { id: 2, name: 'Super Studio', ups: 15, downs: 0 },
    { id: 3, name: 'Średnie Studio', ups: 5, downs: 2 },
  ]

  it('powinno sortować po +1 malejąco (od największej liczby kciuków w górę)', () => {
    const result = sortStudios(mockStudios, '+1 malejąco')
    expect(result[0].name).toBe('Super Studio') 
    expect(result[1].name).toBe('Średnie Studio') 
    expect(result[2].name).toBe('Słabe Studio') 
  })

  it('powinno sortować po -1 malejąco (od największej liczby kciuków w dół)', () => {
    const result = sortStudios(mockStudios, '-1 malejąco')
    expect(result[0].name).toBe('Słabe Studio') 
    expect(result[1].name).toBe('Średnie Studio') 
    expect(result[2].name).toBe('Super Studio') 
  })
})