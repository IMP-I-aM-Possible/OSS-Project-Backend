import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";

const app = express();
const __dirname = path.resolve();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.use(express.static(__dirname));

//index connect
app.use("/",indexRouter);

//set test page
app.get('/test', (req, res) => {
    res.send("test hello?");
});

app.listen(app.get('port'),()=>{
    console.log("start server");
});
