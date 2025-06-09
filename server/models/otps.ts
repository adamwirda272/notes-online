import db from "../db";
import { DataTypes, Model, Optional } from "sequelize";

interface otpAttr {
    id: string
    email: string
    code: string
    expireAt: Date
}

class Otps extends Model<otpAttr | Optional<otpAttr, 'id' | 'expireAt'>> implements otpAttr {
    public id!: string;
    public email!: string;
    public code!: string;
    public expireAt!: Date;
}

Otps.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },  
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expireAt: {
            type: DataTypes.DATE,
            defaultValue: () => new Date(Date.now() + 2 * 60 * 1000)
        }
    }, {
        sequelize: db,
        tableName: 'otps',
        modelName: 'otps',
        timestamps: false,
        freezeTableName: true
    }
)

export default Otps