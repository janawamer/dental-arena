import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://psgeyddjfhfczdyxwsxo.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_i8F3GvICi5kOU1N1w2hptA_CDpGtMIU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
