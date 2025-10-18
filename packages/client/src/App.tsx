import './App.css';
import Layout from './components/layout/main-layout';
import { ChatBox } from './components/chat-box';

function App() {
   return (
      <Layout>
         <div className="flex flex-1 items-center justify-center">
            <ChatBox />
         </div>
      </Layout>
   );
}

export default App;
