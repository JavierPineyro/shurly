import { useState, useEffect } from 'react'
import './App.css'

// http://localhost:3333/2cYx2nDbVV4mb0H-r7UUI

function App() {
  const [res, setRes] = useState(0)

  useEffect(() => {
    const data = { originalUrl: 'https://twitter.com' }
    fetch('/api/short', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className='App'>
      {res.originalURL}
    </div>
  )
}

export default App
