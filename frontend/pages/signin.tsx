import React, { useState, FormEvent } from 'react'
import axios from 'axios'

function Signin() {
  const [token, setToken] = useState("")
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post('/api/signin', {
      token
    }).then(()=>{
      console.log('success')
    }).catch(()=>{
      console.log('error')
    })
  }
  return (
    <div>
      <p>
        擬似ログイン
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="token">トークン</label>
          <input type="password" name="token" value={token} onChange={e => setToken(e.target.value)}/>
          <button type="submit">送信</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Signin