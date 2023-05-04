import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Users extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

Users.init(
    {
        uid : {
            type: DataTypes.STRING(20),
            primaryKey : true
        },

        email : {
            type: DataTypes.STRING(30),
            allowNull : false
        },

        pw : {
            type: DataTypes.STRING(60),
            allowNull : false
        },
        
        username : {
            type: DataTypes.STRING(20),
            allowNull : false,
            unique : true
        },

        height : {
            type: DataTypes.INTEGER,
            allowNull : false
        },

        weight : {
            type: DataTypes.INTEGER,
            allowNull : false
        },

        gender : {
            type: DataTypes.CHAR(1),
            allowNull : false
        },

        birth : {
            type : DataTypes.DATE,
            allowNull : false
        },

        health : {
            type : DataTypes.INTEGER,
            allowNull : true
        },

        // created_at : {
        //     type : 'TIMESTAMP',
        //     defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull : false
        // },

        // updated_at : {
        //     type : 'TIMESTAMP',
        //     defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull : false
        // },

        expired_at : {
            type : 'TIMESTAMP',
            allowNull : true
        }

    },

    {
        sequelize,
        modelName : "Users",
        tableName : "user",
        timestamps : false
    }
)