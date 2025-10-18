import { useEffect, useState } from 'react';
import './App.css';
import Layout from './components/layout/main-layout';
import { ChatBox } from './components/chat-box';

function App() {
   const [message, setMessage] = useState<string>('');

   useEffect(() => {
      fetch('api/hello')
         .then((response) => response.json())
         .then((data) => setMessage(data.message))
         .catch((error) => console.error('Error fetching message:', error));
   }, []);
   return (
      <Layout>
         <div className="flex flex-1 items-center justify-center">
            <ChatBox />
         </div>
      </Layout>
   );
}

export default App;
