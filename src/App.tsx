import { useEffect } from 'react'
import { Outlet } from 'react-router'
import supabase from './supabase'

function App() {
  useEffect(function fetchDataOnMount () {
    async function fetchHotDogs () {
      const { data: hotdogs, error } = await supabase.from('hotdogs').select(`
        *,
        creators (
          id,
          name
        )
      `)

      console.log(hotdogs, error)
    }

    fetchHotDogs()
  }, [])

  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App
