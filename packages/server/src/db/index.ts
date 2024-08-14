import { createClient } from '@supabase/supabase-js'
import { env } from '../utils'
import { Database } from '../database.types'
export const client = createClient<Database>(
    env('PROYECT_URL') || '',
    env('ANON_KEY') || '',
)