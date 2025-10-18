import { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';

function App() {
   const [message, setMessage] = useState<string>('');

   useEffect(() => {
      fetch('api/hello')
         .then((response) => response.json())
         .then((data) => setMessage(data.message))
         .catch((error) => console.error('Error fetching message:', error));
   }, []);
   return (
      <div className="App">
         <h1 className="text-2xl text-red-400 font-bold">AI App Client</h1>
         <p className="text-lg text-gray-600">Message from server: {message}</p>
         <Button>Click me</Button>
      </div>
   );
}

export default App;
