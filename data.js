const express = require('express');
const app = express();

app.use(express.static('sf'));
const mysql = require('mysql2');
let dbpara={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'wpt',
	port:3306
}
const con = mysql.createConnection(dbpara);

//program is working fine

//add event start
app.get("/add",(req,res)=>{
//console.log(req);
let x=req.query.bookid;
let y=req.query.bookname;
let z=req.query.price;

console.log(x+" "+y+" "+z);
con.query('insert into book values(?,?,?)',[x,y,z],(err,data)=>{
    let output={status:false};
    if(err){
        console.log(err);
    }
    else{
        if(data.affectedRows>0){
            console.log("data is inserted");
            output.status=true;
        }
        res.send(output);
    }
})

})
//add event end

//blur event start
app.get("/blur",(req,res)=>{
//console.log(req);
let x=req.query.bookid;
console.log(x);

con.query('select * from book where bookid=?',[x],(err,data)=>{
//console.log(data);
let output={status:false,detail:{bookid:0,bookname:'a',price:0}};
if(err){
    console.log(err);
}
else{
    if(data.length>0){
        output.status=true;
        output.detail=data[0];
    }
    res.send(output);

}
})
})
//blur end

//update start

app.get("/update",(req,res)=>{
    //console.log(req);
    let x=req.query.bookid;
    let y=req.query.bookname;
    let z=req.query.price;
    console.log(x+" "+y+" "+z);
    con.query('update book set bookname=?,price=? where bookid=?',[y,z,x],(err,data)=>{
        let output={status:false}
        if(err){
            console.log(err);
        }
        else{
            if(data.affectedRows>0){
                console.log("update successful");
                output.status=true;
            }
            res.send(output)
        }
    })

})
//update end


//show all start
app.get("/showall",(req,res)=>{
//console.log(req);

con.query('select * from book',[],(err,data)=>{
    let output={status:false,detail:[{}]};
    if(err){

    }
    else{
        if(data.length>0){
        console.log("select works");
output.status=true;
output.detail=data;
console.log(output.detail);
        }
        res.send(output);
    }
})
})
app.listen(230,()=>{
    console.log("server is running");
});