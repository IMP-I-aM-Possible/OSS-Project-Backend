import sequelize from "./index.js";
import { DataTypes, Model } from "sequelize";

export class UserInfo extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

UserInfo.init(
    {
        id : {
            type: DataTypes.STRING(20),
            primaryKey : true
        },

        height : {
            type: DataTypes.INTEGER,
            allowNull : true
        },

        weight : {
            type: DataTypes.INTEGER,
            allowNull : true
        },

        gender : {
            type: DataTypes.STRING(1),
            allowNull : true
        },

        age : {
            type : DataTypes.INTEGER,
            allowNull : true
        }

    },

    {
        sequelize,
        modelName : "UserInfo",
        tableName : "userinfo",
        timestamps : false
    }
)