import sytles from "./CreatePost.module.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"

const CreatPost = () => {
    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [body, setBody] = useState();
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        // validar url da image
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL")

        }

        // criar array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // checar todos os valores
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos.")
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirect to home page
        navigate("/")


    }


    return (
        <div className={sytles.create_post}>
            <h2>Criar post</h2>
            <p>Escreve uma experiencia que voce tem com a Smart Limpeza</p>
            <form onSubmit={handleSubmit}>
                <label >
                    <span>Título:</span>
                    <input type="text"
                        name="title"
                        required
                        placeholder="Pense num bom título"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label >
                    <span>Url de imagem:</span>
                    <input type="text"
                        name="image"
                        required
                        placeholder="Insira uma imagem do serviço realizado"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label >
                    <span>Conteúdos:</span>
                    <textarea name="body"
                        required
                        placeholder="Insira sua experiencia com a Smart"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label >
                    <span>Tags:</span>
                    <input type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por vígurlas"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && <button className="btn">Postar</button>}
                {response.loading && <button className="btn" disabled >Aguarde...</button>}

                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>

    )
}

export default CreatPost