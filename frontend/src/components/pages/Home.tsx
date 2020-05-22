import React, { useState } from 'react'
import { useUserQuery } from './query.generated'

export const Home = () => {
  const [userName, setUserName] = useState("")
  // const {loading, data} = useUserQuery()
  // console.log(data)
  return (
    <main>
      <div>
        <input type="text" value={userName} onChange={e => {setUserName(e.target.name)}} placeholder="youya66" />
      </div>
    </main>
  )
}
