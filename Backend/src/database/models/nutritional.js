import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Nutritionals extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

Nutritionals.init(
    {
        nid : {
            type : DataTypes.CHAR(9),
            primaryKey : true
        },

        company : {
            type : DataTypes.STRING(60),
            allowNull : false
        },

        name : {
            type : DataTypes.STRING(100),
            allowNull : false
        },

        iherb_price : {
            type : DataTypes.FLOAT,
        },

        naver_price : {
            type : DataTypes.FLOAT,
        },

        iherb_link : {
            type : DataTypes.TEXT,
        },

        naver_link : {
            type : DataTypes.TEXT,
        },

        
        rating : {
            type : DataTypes.FLOAT,
        },

        rating_count : {
            type : DataTypes.INTEGER,
        },

        caution : {
            type : DataTypes.TEXT,
            allowNull : false
        },

        nutrient_info : {
            type : DataTypes.JSON,
            allowNull : false
        },

        sub_nutrient_info : {
            type : DataTypes.JSON,
        },

        daily_eating : {
            type : DataTypes.STRING(60),
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
            defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull : true
        }
    },

    {
        sequelize,
        modelName : "Nutritionals",
        tableName : "nutritional",
        timestamps : false
    }
)