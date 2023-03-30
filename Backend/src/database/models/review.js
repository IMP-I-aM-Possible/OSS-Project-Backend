import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Review extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

Review.init(
    {
        idx : {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },

        uid : {
            type: DataTypes.STRING(25),
            allowNull : false
        },

        nid : {
            type: DataTypes.CHAR(9),
            allowNull : false
        },

        rating : {
            type : DataTypes.FLOAT,
        },
        
        review : {
            type : DataTypes.TEXT
        },

    },

    {
        sequelize,
        modelName : "Review",
        tableName : "review",
        timestamps : false
    }
)