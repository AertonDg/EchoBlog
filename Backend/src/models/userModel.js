import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const User = conn.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        papel: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "User",
    }
);

export default User;