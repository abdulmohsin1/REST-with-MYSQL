const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'learning',
    password: 'karmaini1!'
});


app.get("/", (req, res) => {

    let q = `SELECT COUNT(*) FROM user`;
    try {

        connection.query(q, (err, result) => {
            let count = result[0]["COUNT(*)"];
            res.render("index.ejs", { count });
        });
    }
    catch (err) {
        console.log(err);
        res.send("some error in database");
        res.send("response is working properly");
    };

});


app.get("/user", (req, res) => {

    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            // console.log(users);
            res.render("show.ejs", { users })
        });
    }
    catch (err) {
        console.log(err);
    }

});

app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id=${id}`;
    try {
        connection.query(q, (err, result) => {
            let user = result[0];
            res.render("edit.ejs", { user })
        });
    }
    catch (err) {
        console.log(err);
    }

    ;
});

app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPassword, name: newName } = req.body;
    let q = `SELECT * FROM user WHERE id=${id}`;
    try {
        connection.query(q, (err, result) => {
            let user = result[0];
            if (formPassword !== user.password) {
                res.send("wrong password");
            }
            else {

                let q2 = `UPDATE user SET name='${newName}'WHERE id='${id}' `;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect("/user")
                })
            }
        });
    }
    catch (err) {
        console.log("some error in DB");
    }
});

// adding user in data 

app.post("/user",(req, res)=>{
    let {id,name,email,password}=req.body;
    let q3=`INSERT INTO user(id,name,email,password) VALUES(${id},'${name}','${email}','${password}') `;
    try{
        connection.query(q3,(err,result)=>{
            if(err) {
                throw err;
            }
            console.log(result)
            res.redirect("/user");
        })
    }
    catch(err){
        console.log("error in database");
        res.send("something erro in database connection");
    }
})
app.get("/user/new",(req,res)=>{
    res.render("new.ejs");
});


app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
let q4=`DELETE FROM user WHERE id=${id}`;
 connection.query(q4,(err,result)=>{
    if(err){
        return res.send("failed to delete user! try again")
    }
    else{
        res.redirect("/user");
    }
 })

})


app.listen(8080, () => {
    console.log("server is listening to port 8080");

});















