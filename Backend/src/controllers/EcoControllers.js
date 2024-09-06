import fs from 'fs'
import EcoModel from "../models/EcoModel.js"
import { z } from "zod"
import formatZodError from "../helpers/formatZodError.js";


const createSchema = z.object({
    id: z
        .string()
        .min(3, { message: "a tarefa deve ter pelo menos 3 caracteres" })
        .transform((txt) => txt.toLowerCase()),
    titulo: z
        .string()
        .min(10, { message: "a descrição deve ter pelo menos 10 caracteres" }),
});
const getSchema = z.object({
    id: z.string().uuid({ message: "Id da tarefa. está inválido." })
})

export const CriarPost = async (request, response) => {
    const bodyValidation = createSchema.safeParse(request.body);
    // console.log(bodyValidation);
    if (!bodyValidation.success) {
        response.status(400).json({
            message: "Os dados recebidos do corpo da aplicação são inválidos",
            detalhes: bodyValidation.error,
        });
        return;
    }

    const { id, titulo, conteudo, data } = request.body;

    if (!id) {
        response.status(400).json({ err: "o id é obrigatório" });
        return;
    }
    if (!titulo) {
        response.status(400).json({ err: "o titulo é obrigatório" });
        return;
    }

    if (!conteudo) {
        response.status(400).json({ err: "o conteudo é obrigatório" });
        return;
    }

    if (!data) {
        response.status(400).json({ err: "a data é obrigatória" });
        return;
    }

    const novaPostagem = {
        id,
        titulo,
        conteudo,
        data
    };
    try {
        EcoModel.create(novaPostagem);
        response.status(201).json({ message: " postagem cadastrada" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "erro ao cadastrar postagem" });
    }
};

export const getAll = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const posts = await EcoModel.findAndCountAll({
            limit,
            offset,
        });

        const totalPaginas = Math.ceil(posts.count / limit);
        response.status(200).json({
            totalTarefas: tarefas.count,
            totalPaginas,
            paginaAtual: page,
            itemsPorPagina: limit,
            proximaPagina:
                totalPaginas === 0
                    ? null
                    : `http://localhost:3333/postagens?page=${page + 1}`,
            posts: posts.rows,
        });
    } catch (error) {
        response.status(500).json({ message: "erro ao buscar postagens" });
    }
};
export const getPost = async (request, response) => {
    const { id } = request.params;


    const paramValidator = getSchema.safeParse(request.params)
    if (!paramValidator.success) {
        response.status(400).json({
            message: "Número de identificação está inválida.",
            detalhes: formatZodError(paramValidator.error)
        })
        return
    }
    try {
        const post = await EcoModel.findOne({ where: { id } });
        if (post === null) {
            response.status(404).json({ message: "postagem não encontrada" });
            return;
        }
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json({ message: "erro ao buscar postagem" });
    }
};
export const updatePost = async (request, response) => {
    const { id } = request.params;
    const { titulo, conteudo, imagem } = request.body;

    //*validações
    if (!titulo) {
        response.status(400).json({ message: "o titulo é obrigatória" });
        return;
    }
    if (!conteudo) {
        response.status(400).json({ message: "o conteudo é obrigatória" });
        return;
    }
    if (!imagem) {
        response.status(400).json({ message: "a imagem é obrigatória" });
        return;
    }
    const tarefaAtualizada = {
        titulo,
        conteudo,
        imagem,
    };
    try {
        const [linhasAfetadas] = await EcoModel.update(tarefaAtualizada, {
            where: { id },
        });
        if (linhasAfetadas <= 0) {
            response.status(404).json({ message: "postagem não encontrada" });
            return;
        }

        response.status(200).json({ message: "potagem atualiza" });
    } catch (error) {
        response.status(400).json({ message: "erro ao atualizar postagem" });
    }
};
export const Delete = async (request, response) => {

    const id = request.params.id
    console.log(id)
    try {
        const postagens = await EcoModel.destroy({
            where: { id }
        });

        response.status(500).json({ msg: "Posts deletado" });

    } catch (error) {
        response.status(500).json({ msg: "Erro ao buscar postagens" });
    }
};
export const image = async (request, response) => {

    const id = request.params.id
    console.log(id)
    try {

        fs.writeFile(`imagem/perfil/${id}.png`, request.body, (error) => {
            if (error) {
                throw error;
            }
        });
        await EcoModel.update({ imagem_url: `imagem/perfil/${id}.png` }, { where: { id } });
        response.status(201).json({ msg: "Postagens atualizadas" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ Err: "erro ao atualizar as postagens" });
    }
};