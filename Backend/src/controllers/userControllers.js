import fs from 'fs'
import userModel from "../models/userModel.js"
import { z } from "zod"
import formatZodError from "../helpers/formatZodError.js";
import { response } from 'express';
import { image } from './EcoControllers.js';

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
});

export const createUser = (res, req) => {

    const bodyValidation = createSchema.safeParse(req.body);
    if (!bodyValidation.success) {
        res.status(400).json({
            message: "Os dados recebidos do corpo da aplicação são inválidos",
            detalhes: bodyValidation.error,
        });
        return;
    }

    const { id, nome, email, senha, imagem, papel } = req.body;

    if (!id) {
        res.status(500).send({ message: "o id é obrigatório" });
        return;
    }

    if (!nome) {
        res.status(500).send({ message: "O nome é obrigatório" });
        return;
    }

    if (!email) {
        res.status(500).send({ message: "O email é obrigatório" });
        return;
    }

    if (!senha) {
        res.status(500).send({ message: "a senha é obrigatória" });
        return;
    }
    if (!imagem) {
        res.status(500).send({ message: "a imagem é obrigatória" });
        return;
    };
    if (!papel) {
        res.status(500).send({ message: "a imagem é obrigatória" });
        return;
    };

    const newUser = {
        id,
        nome,
        email,
        senha,
        imagem,
        papel,
    };
    try {
        userModel.create(newUser);
        res.status(201).json({ message: " postagem cadastrada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "erro ao cadastrar postagem" });
    };
};

export const newprofile = async (response, request) => {
    const { id } = request.params;
    const { nome, email, senha, imagem, papel } = request.body;

    if (!nome) {
        response.status(400).json({ message: "o titulo é obrigatória" });
        return;
    }
    if (!email) {
        response.status(400).json({ message: "o conteudo é obrigatória" });
        return;
    }
    if (!senha) {
        response.status(400).json({ message: "a senha é obrigatória" });
        return;
    }
    if (!imagem) {
        response.status(400).json({ message: "a imagem é obrigatória" });
        return;
    }
    if(!papel) papel = leitor;
    
    const userAtualizado = {
        nome,
        email,
        senha,
        imagem,
        papel,
    };
    try {
        const [userAfetados] = await userModel.findOne(userAtualizado, {
            where: { id },

        });
        if (userAfetados <= 0) {
            response.status(404).json({ message: "user não encontrado" });
            return;
        };

        response.status(200).json({ message: "user atualizado" });
    } catch (error) {
        response.status(400).json({ message: "erro ao atualizar user" });
    };
};
export const getUsers = async (response, request) => {
    const { id } = request.params;
    const paramValidator = getSchema.safeParse(request.params);
    if (!paramValidator.success) {
        response.status(400).json({
            message: "Número de identificação está inválida.",
            detalhes: formatZodError(paramValidator.error)
        });
        return;
    }
    try {
        const user = await userModel.findOne({ where: { id } });
        if (user === null) {
            response.status(404).json({ message: "usuario não encontrado" });
            return;
        }
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json({ message: "erro ao buscar usuario" });
    }
};