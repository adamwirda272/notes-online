import db from "../db";
import { Model, Optional, DataTypes } from "sequelize";

interface userAttr {
    id: string
    email: string
    password: string
    refreshToken?: string | null
    createdAt?: Date
    updatedAt?: Date
}

class Users extends Model<userAttr, Optional<userAttr, 'id' | 'refreshToken' | 'createdAt' | 'updatedAt'>> implements userAttr {
    public id!: string
    public email!: string;
    public password!: string;
    public refreshToken?: string | null | undefined;

    public readonly createdAt?: Date | undefined;
    public readonly updatedAt?: Date | undefined;
}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize: db,
        tableName: 'users',
        modelName: 'users',
        timestamps: true,
        freezeTableName: true
    }
)

export default Users