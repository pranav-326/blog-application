import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const blogs=[];
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})
app.get("/",(req,res)=>{
    res.render("index1.ejs", {blogs})
})
app.get("/create",(req,res)=>{
    res.render("create.ejs")
})
app.post("/create",(req,res)=>{
    const newBlog ={
        id: Date.now(),
        title: req.body["Title"],
        body: req.body["Blog"],
        time: new Date().toLocaleString()
    }
    blogs.push(newBlog);
    res.redirect("/")
})
app.get("/blog/:id", (req, res) => {
    const blogId = parseInt(req.params.id); 
    const blog = blogs.find(b => b.id === blogId); 

    if (blog) {
        res.render("blog.ejs", { blog: blog }); 
    } else {
        res.status(404).send("Blog not found");
    }
});
app.get("/edit/:id",(req,res)=>{
    const blogId = parseInt(req.params.id); 
    const blog = blogs.find(b => b.id === blogId); 

    if (blog) {
        res.render("edit.ejs", { blog: blog }); 
    } else {
        res.status(404).send("Blog not found");
    }
})
app.post("/update/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === blogId);

    if (blog) {
        blog.title = req.body["Title"];
        blog.body = req.body["Blog"];
    }
    res.redirect(`/blog/${blogId}`);
});
app.post("/delete/:id",(req,res)=>{
    const blogId = parseInt(req.params.id);
    const index = blogs.findIndex(b => b.id === blogId);
    if (index > -1) { 
    blogs.splice(index, 1);
    }
    res.redirect("/");
})