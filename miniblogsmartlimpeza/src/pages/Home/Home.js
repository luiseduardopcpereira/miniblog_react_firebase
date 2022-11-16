// CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";


// components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("")
  const { documents: posts, loading } = useFetchDocuments("posts")

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_Form}>
        <input type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Experiencias</h1>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontradas experiencias</p>
            <Link to="/posts/createPost" className="btn">
              Criar primeira experiencia
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home