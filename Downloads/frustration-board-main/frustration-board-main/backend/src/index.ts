import { Hono } from 'hono'
import { cors } from 'hono/cors'
import postgres from 'postgres'
import 'dotenv/config'
import { serve } from '@hono/node-server'
import { z } from 'zod'

const app = new Hono()

app.use('/*', cors())

const sql = postgres(process.env.DATABASE_URL!)

interface Studio {
  id: number;
  name: string;
  ups: number;
  downs: number;
}

app.get('/studios', async (c) => {
const studios = await sql<Studio[]>`
    SELECT s.id, s.name,
      COUNT(CASE WHEN v.vote_type = 1 THEN 1 END)::int as ups,
      COUNT(CASE WHEN v.vote_type = -1 THEN 1 END)::int as downs
    FROM studios s
    LEFT JOIN votes v ON s.id = v.studio_id
    GROUP BY s.id
  `
  return c.json(studios)
})
const voteSchema = z.object({
  studio_id: z.number().int().positive(), 
  vote_type: z.union([z.literal(1), z.literal(-1)]), 
  user_name: z.string().min(1).max(50),
  note: z.string().max(500).default(""), 
})


app.post('/vote', async (c) => {
  try {
    const body = await c.req.json() 
    const parsedData = voteSchema.parse(body)
    await sql`
      INSERT INTO votes (studio_id, vote_type, user_name, note) 
      VALUES (${parsedData.studio_id}, ${parsedData.vote_type}, ${parsedData.user_name}, ${parsedData.note})
    `
    return c.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, errors: error.errors }, 400)
    }
    return c.json({ success: false, message: "Internal Server Error" }, 500)
  }
})
const port = Number(process.env.PORT) || 3000
serve({
fetch: app.fetch,
port,
})
console.log(`Backend działa na porcie ${port}`)
export default app