import db from "../db";
import { Model, DataTypes, Optional } from "sequelize";
import users from "./users";

interface notesAttr {
    id: string
    content: string
    userId: string
    createdAt?: Date
    updatedAt?: Date
}

class Notes extends Model<notesAttr, Optional<notesAttr, 'id' | 'createdAt' | 'updatedAt'>> implements notesAttr {
    public id!: string;
    public content!: string;
    public userId!: string;

    public readonly createdAt!: Date | undefined;
    public readonly updatedAt!: Date | undefined;
}

Notes.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'notes',
    modelName: 'notes',
    timestamps: true,
    freezeTableName: true
})

users.hasMany(Notes, { foreignKey: 'userId' })

Notes.belongsTo(users, { foreignKey: 'userId' })

export default Notes