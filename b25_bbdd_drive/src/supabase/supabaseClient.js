import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hymezzujedlfzbepeepe.supabase.co'

// Clave pública (uso normal del usuario)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bWV6enVqZWRsZnpiZXBlZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTg4NDQsImV4cCI6MjA2MDg5NDg0NH0.iu7fUD5MGqPMlYOi4lDP3vQ8IMZMXWO5G6x9RLHVjbA'
export const supabase = createClient(supabaseUrl, supabaseKey)

// Clave secreta (da acceso a toda la base de datos)
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bWV6enVqZWRsZnpiZXBlZXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxODg0NCwiZXhwIjoyMDYwODk0ODQ0fQ.YyFn_aPP5SVP18ZlBOOfaQ3yIiQ9J9U34867N5EIDDg'
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
