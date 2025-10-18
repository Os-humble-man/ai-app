import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch('api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching message:', error))
  }, [])
  return(
    <div className="App">
      <h1>AI App Client</h1>
      <p>Message from server: {message}</p>
    </div>
  )
}

export default App
