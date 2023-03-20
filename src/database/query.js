import db from "./db.js";

    export const login = (id) => {
        return new Promise((resolve,rejects)=>{
            db.query("SELECT * FROM user WHERE id = ?",[id],(error,result,fields)=>{
                if(error) rejects(error);
                resolve(result[0]);
            });
        });
    };

    export const signUp = (client) => {
        return new Promise((resolve,rejects)=>{
            db.query("INSERT INTO user VALUES(?,?,?,?)",[client.id, client.pw, client.name, client.nickname],(err,data)=>{
                if (err) rejects(err);
                resolve({ success: true });
            });
        });
    };