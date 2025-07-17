
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extends: true}));
app.use(methodOverride('_method'))

app.set("viewengine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "spbyname",
        content: "I love coding."
    },
    {
        id: uuidv4(),
        username: "Shubham",
        content: "I'm lost in my imagination."
    },
    {
        id: uuidv4(),
        username: "Death",
        content: "I love the smell of fear."
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs",{posts});
});

app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    posts.push({username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
});
