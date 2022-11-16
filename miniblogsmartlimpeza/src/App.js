import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// mapeia se a autenticação foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import { useState, useEffect } from "react"
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

// PAGES
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Logion from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import CreatPost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  })

  if (loadingUser) {
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/login" element={!user ? <Logion /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
              <Route path="/posts/createpost" element={user ? <CreatPost /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
