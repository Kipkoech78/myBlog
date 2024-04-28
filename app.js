const express = require ('express');
const bodyParser = require('body-parser');
var _ = require('lodash');

const mongoose= require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// let postobjects=[];


app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/BlogoDB ");
const postSchema= {
    titleitem: String,
    content: String
};
const Post= mongoose.model("Post", postSchema);


// app.get("/", function(req, res){
   
// res.render("home", { 
//     homecontent :homeStartingContent, 
//     postobjects : postobjects
//  });

// });
// setting contact page
app.get("/contact", function(req,res){
    res.render("contact", {contactpage :contactContent });

} );
app.get("/about", function(req,res){
    res.render("about", {aboutpage : aboutContent });
});

app.get("/compose", function(req, res){

    res.render("compose" );
    
});


app.post("/compose", function(req, res){
    const post = new Post({
        titleitem: req.body.Post_title,
        content: req.body.Postbody
    });
    post.save();
    // let item= req.body.Postbody;
    // let postobj={
//     titleitem:req.body.Post_title,
    //     content:item
    // };
    // postobjects.push(postobj);
    

    res.redirect("/");
}); 
app.get("/", function(req, res){
Post.find({}).then(function(posts){
    res.render("home",{
     
  homecontent :homeStartingContent, 
    posts : posts
    })
});
});


app.get('/posts/:postId', function(req, res){
    const requestedPostId = req.params.postId;
    console.log(requestedPostId)
    Post.findOne({_id: requestedPostId}).then(function(post){
        res.render("post", {
            titlepost: post.titleitem,
            postcontent:post.content
        });
    })
    
    // const searchtitle= _.lowerCase( req.params.paramname) ;
    // postobjects.forEach(function(post){
    //     var titl= _.lowerCase(post.titleitem)
        
    //     if(searchtitle===titl){
    //         // var shortpost= post.content
    //             res.render("post", {
    //                 titlepost: post.titleitem,
    //                 postcontent:post.content

    //             });

    //     };
     
    // });
   
});



app.listen(3000,function(){
    console.log('Server is running on port 3000');
});

// 


// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));