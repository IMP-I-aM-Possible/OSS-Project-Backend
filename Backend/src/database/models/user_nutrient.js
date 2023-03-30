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
        uid : {
            type: DataTypes.STRING(25),
            primaryKey : true,
            allowNull : false
        },

        nid : {
            type: DataTypes.CHAR(9),
            primaryKey : true,
            allowNull : false
        },

        count : {
            type: DataTypes.INTEGER,
            allowNull : false
        },

        // created_at : {
        //     type : 'TIMESTAMP',
        //     defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull : false
        // }
    },

    {
        sequelize,
        modelName : "UserNutrient",
        tableName : "user_nutrient",
        timestamps : false
    }
)