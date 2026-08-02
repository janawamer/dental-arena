import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSpecialties() {
  const [specialties, setSpecialties] = useState([])
  const [categories, setCategories] = useState({}) // { specialty_id: string[] }
  const [loading, setLoading] = useState(true)

  async function load() {
    const [{ data: specs }, { data: cats }] = await Promise.all([
      supabase.from('specialties').select('*').order('sort_order'),
      supabase.from('specialty_categories').select('*').order('sort_order'),
    ])
    setSpecialties(specs || [])
    const map = {}
    for (const c of cats || []) {
      if (!map[c.specialty_id]) map[c.specialty_id] = []
      map[c.specialty_id].push(c.name)
    }
    setCategories(map)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return { specialties, categories, loading, reload: load }
}
