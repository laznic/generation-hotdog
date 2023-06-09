// @ts-nocheck
import supabase from "@/supabase"
import { useEffect, useState } from "react"

export default function useFetchAllHotdogs () {
  const [data, setData] = useState([])
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(function fetchData() {
    async function fetchHotdogs() {
      setLoading(true)

      const { data: hotdogs, error } = await supabase.from('hotdogs')
        .select(`id, image`)
        .eq('status', 'FINISHED')
        .order('id')

      setData(hotdogs ?? [])

      if (error) setError(error)

      setLoading(false)
    }

    fetchHotdogs()
  }, [])

  return {
    data,
    error,
    loading
  }
}