const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose');

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true}); 
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model('Blog', blogSchema);

/* Test Example to make first blog in the database to work with:
Blog.create({
    title: 'Test Blog',
    image: 'https://source.unsplash.com/collection/190727/800x600',
    body: 'Hello this is a blog post!'
});*/

// RESTFUL ROUTES
// *Root route
app.get('/', function(req, res){
    res.redirect('/blogs');
});

// 1. Index Route
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});





app.listen(3000, () => console.log('server is running'));