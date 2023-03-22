import sequelize from "./index.js";
import { DataTypes, Model } from "sequelize";

export class Nutritionals extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

Nutritionals.init(
    {
        id : {
            type : DataTypes.STRING(20),
            primaryKey : true
        },

        company : {
            type : DataTypes.STRING(80),
            allowNull : false
        },

        name : {
            type : DataTypes.TEXT,
            allowNull : false
        },

        price : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        barcode : {
            type : DataTypes.STRING(45),
            allowNull : false
        },

        stars : {
            type : DataTypes.FLOAT,
            allowNull : false
        },

        purchase : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        caution : {
            type : DataTypes.TEXT,
            allowNull : false
        },

        info : {
            type : DataTypes.JSON,
            allowNull : false
        },

        link : {
            type : DataTypes.TEXT,
            allowNull : false
        },

        eating : {
            type : DataTypes.TEXT,
            allowNull : false
        }
    },

    {
        sequelize,
        modelName : "Nutritionals",
        tableName : "nutritional",
        timestamps : false
    }
)