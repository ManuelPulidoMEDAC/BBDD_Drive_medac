import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hymezzujedlfzbepeepe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bWV6enVqZWRsZnpiZXBlZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTg4NDQsImV4cCI6MjA2MDg5NDg0NH0.iu7fUD5MGqPMlYOi4lDP3vQ8IMZMXWO5G6x9RLHVjbA'

export const supabase = createClient(supabaseUrl, supabaseKey)
