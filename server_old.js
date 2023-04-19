const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'production'? "production":"development";
if (process.env.NODE_ENV === 'production')
    dotenv.config({path: __dirname+"/.env2"});
else
    dotenv.config();    
dotenv.config();

const logger = (req, res, next) => {
    console.log(`### ${req.method} ${req.url}`);
    next()
}

app.use(logger)

// app.get('/', async(req,res) => {
//     // res.writeHead("Content-type","application/json");
//     // res.json({ requrl:req.url, msg:"helloworld"});
//     // console.log(`### GET ${req.method}${req.url}`);
//     res.sendFile(__dirname + "/index.html");
// })
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser(process.env.SECRET));

app.get('/', (req, res) =>{
    res.cookie('key1', 'value1', {httpOnly:true, maxAge:60*60*1000, signed:true});
    res.send('<h1>쿠키 생성 완료</h1>');
})

app.get('/cookie', (req, res) => {
    res.send(`<h1>쿠키 확인:${req.signedCookies.key1}</h1><hr/>`);
    // res.send(`<p>${req.signedCookies.key1}</p>`)
})


app.get('/ko', async(req,res) => {
    // res.writeHead("Content-type","application/json");
    res.json({ requrl:req.url, msg:"안녕"});
})

app.listen(8080, ()=>{
    console.log(`### ${process.env.PORT}서버가 구동되었습니다.`);
})