import sequelize from "./index.js";
import { DataTypes, Model } from "sequelize";

export class DailyNutrient extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

DailyNutrient.init(
    {
        idx : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },

        age : {
            type: DataTypes.FLOAT,
            allowNull : false
        },

        gender : {
            type: DataTypes.STRING(10),
            allowNull : false
        },

        commend : {
            type: DataTypes.FLOAT,
            allowNull : true
        },

        max : {
            type : DataTypes.FLOAT,
            allowNull : true
        },

        unit : {
            type : DataTypes.STRING(10),
            allowNull : true
        },

        nutrient_name : {
            type : DataTypes.STRING(45),
            allowNull : true
        }

    },

    {
        sequelize,
        modelName : "DailyNutrient",
        tableName : "dailynutrient",
        timestamps : false
    }
)