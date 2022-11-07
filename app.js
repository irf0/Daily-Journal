

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
const _ = require("lodash");

mongoose.connect("mongodb+srv://mirfan:test123@cluster0.aoxn0d6.mongodb.net/blogDB")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Connecting with the DB
const postSchema = {
  title : String,
  textArea : String

}
//Creating mongoose model
const Post = mongoose.model("Post", postSchema) 

//Home Page
app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      homePara: homeStartingContent,
      posts: posts
      });
  });

});
//Compose Page
app.get("/compose", (req, res)=>{
  res.render("compose")
})
app.post("/compose", (req,res)=>{
const post = new Post({
  title : req.body.composeinput,
  textArea : req.body.postbox
})
post.save();
res.redirect("/")
});

//Express Routing
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        newPostTitle: post.title,
        newPostBody: post.textArea
      });
    });
  
  });

//About Page
app.get("/about", (req, res)=>{
  res.render("about",{aboutPara:aboutContent})
})

//Contact Us Page
app.get("/contact", (req, res)=>{
  res.render("contact", {contactPara:contactContent})
})




let port = process.env.PORT;

if(port == null || port == ""){
  port = 3000
}
app.listen(port, function() {
  console.log("Server started successfully!");
});
