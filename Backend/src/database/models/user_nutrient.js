import sequelize from "./index.js";
import { DataTypes, Model } from "sequelize";

export class UserNutrient extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

UserNutrient.init(
    {
        idx : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },

        id : {
            type: DataTypes.STRING(20),
            allowNull : false
        },

        nutrient_name : {
            type: DataTypes.STRING(20),
            allowNull : true
        },

        count : {
            type: DataTypes.INTEGER,
            allowNull : true
        }
    },

    {
        sequelize,
        modelName : "UserNutrient",
        tableName : "user_nutrient",
        timestamps : false
    }
)