import sytles from "./EditPost.module.css"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [body, setBody] = useState();
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");

            setTags(textTags);
        }

    }, [post])


    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument("posts")

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

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data);

        // redirect to home page
        navigate("/dashboard")


    }


    return (
        <div className={sytles.edit_post}>
            {post && (
                <>
                    <h2>Editando post: {post.title} </h2>
                    <p>Altera os dados do post como desejar</p>
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
                        <p className={sytles.preview_title}>Preview da imagem atual:</p>
                        <img className={sytles.image_preview} src={post.image} alt={post.title} />
                        <label >
                            <span>Conteúdo:</span>
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
                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && <button className="btn" disabled >Aguarde...</button>}

                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>

            )}
        </div>

    )
}

export default EditPost