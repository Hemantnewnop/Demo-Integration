import './App.css'
import Practice from './components/Practice';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
    
    <Routes>
      <Route path="/p" element={<Practice />} />
    </Routes>
    
    </Router>
  )
}

export default App
