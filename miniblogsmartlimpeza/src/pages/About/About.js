// CSS
import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                Sobre o Smart <span>Limpeza</span>
            </h2>
            <p>
                Esse projeto consite em um blog feito com React no front-end e Firebase no back-end
            </p>
            <Link to="/posts/createPost" class="btn">
                Criar post
            </Link>
        </div>
    )
}

export default About