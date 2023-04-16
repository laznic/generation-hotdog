import supabase from "@/supabase"
import { useEffect, useState } from "react"

export default function useFetchAllHotdogs () {
  const [data, setData] = useState([])
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(function fetchData() {
    async function fetchHotdogs() {
      setLoading(true)

      const { data } = await supabase.functions.invoke('fetch-all-hotdogs')
      const { data: hotdogs, error } = data

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