import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { logger } from './logger'

const app = new Hono()

app.use('/*', cors())

const sql = neon(process.env.DATABASE_URL!)

app.get('/studios', async (c) => {
  try {
    const offset = parseInt(c.req.query('offset') || '0')
    const limit = parseInt(c.req.query('limit') || '1000')
    logger.info(`Pobieranie studiów: offset=${offset}, limit=${limit}`)

    const studios = await sql`
      SELECT 
        s.*, 
        COALESCE(SUM(CASE WHEN v.vote_type = 1 THEN 1 ELSE 0 END), 0)::int AS upvotes,
        COALESCE(SUM(CASE WHEN v.vote_type = -1 THEN 1 ELSE 0 END), 0)::int AS downvotes
      FROM studios s
      LEFT JOIN votes v ON s.id = v.studio_id
      GROUP BY s.id
      ORDER BY s.id ASC
    `
    return c.json(studios)
  } catch (error) {
    logger.error('Błąd podczas pobierania z bazy Neon:', error)
    return c.json({ error: 'Błąd serwera' }, 500)
  }
})

app.post('/votes', async (c) => {
  try {
    const body = await c.req.json()
    logger.info(`Otrzymano nowy głos od: ${body.user_name}`)
    await sql`
      INSERT INTO votes (studio_id, vote_type, user_name, note) 
      VALUES (${body.studio_id}, ${body.vote_type}, ${body.user_name}, ${body.note})
    `

    return c.json({ success: true, message: 'Głos został zapisany' })
  } catch (error) {
    logger.error('Błąd podczas zapisywania głosu:', error)
    return c.json({ error: 'Nie udało się zapisać głosu' }, 500)
  }
})

app.get('/history/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const history = await sql`
      SELECT v.*, s.name as studio_name 
      FROM votes v
      LEFT JOIN studios s ON v.studio_id = s.id
      WHERE v.studio_id = ${id}
    `
    return c.json(history)
  } catch (error) {
    logger.error('Błąd podczas pobierania historii:', error)
    return c.json({ error: 'Błąd serwera' }, 500)
  }
})

const port = 3000
console.log(`🚀 Backend (Hono) ruszył na porcie ${port}`)

serve({
  fetch: app.fetch,
  port
})