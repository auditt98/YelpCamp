//APP VARIABLES
var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session"),
    User                    = require("./models/users.js"),
    Campground              = require("./models/campgrounds.js"),
    Comments                = require("./models/comments.js"),
    flash                   = require("connect-flash"),
    methodOverride          = require("method-override");


//DECLARING ROUTES
var commentRoutes = require("./routes/comments.js");
var campgroundRoutes = require("./routes/campgrounds.js");
var indexRoutes = require("./routes/index.js");

//CONFIGURING APP
//mongoose.connect("mongodb://localhost/YelpCamp");
mongoose.connect("mongodb://auditt98:vietanh7i1998@ds125073.mlab.com:25073/yelpcamp");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: "Tango",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});

//ROUTER
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.get("/maps",function (req,res) {
    res.render("map");
});


//STARTING SERVER
app.listen(process.env.PORT,process.env.IP);