import React, { useState } from 'react'

function Signin() {
  const [password, setPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <p>
        擬似ログイン
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Fieldset</legend>
          <label htmlFor="token">トークン</label>
          <input type="password" name="token" value={password} onChange={e => setPassword(e.target.value)}/>
          <button type="submit">送信</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Signin