const http=require('http');
const express=require('express');
const app=express();
const bodyparser = require('body-parser');

const port="3000";

const server=http.createServer(app);

app.use(bodyparser.urlencoded());

app.use((req,res,next)=>{
  console.log(req.body,req.header,req.method);
  res.send("Body : "+req.body);
})

server.listen(port,()=>{
  console.log(`Server running on sddrrss http://localhost:${port}`);
});