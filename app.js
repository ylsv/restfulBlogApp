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
// *ROOT ROUTE
app.get('/', function(req, res){
    res.redirect('/blogs');
});

// 1. INDEX ROUTE
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// 2. NEW ROUTE
app.get('/blogs/new', function(req, res){
    res.render('new');
});

// 3. CREATE ROUTE
app.post('/blogs', function(req, res){
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new');
            console.log('error');
        } else {
            // redirect to the index page
            res.redirect('/blogs');
        }
    });
});

// 4. SHOW ROUTE
app.get('/blogs/:id', function(req, res){
    // look for the blog selected by our link in the DB
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
            console.log('error!');
        } else {
            // render the show page wit detailed info about the foud blog
            res.render('show', {blog: foundBlog});
        }
    });
});






app.listen(3000, () => console.log('server is running'));