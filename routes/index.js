var express = require("express");
var router = express.Router();
var User = require("../models/users.js");
var passport = require("passport");

//ROOT
router.get("/",function(req,res){
    res.render("landing");
});

//REGISTER
router.get("/register",function(req, res) {
    res.render("user/register");
});

router.post("/register",function(req, res) {
    User.register(new User({username: req.body.username,displayName: req.body.displayName,profileImage: req.body.profileImage,birthDay: req.body.birthDay}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash("error","Can't create this user.");
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("info","Welcome to YelpCamp," + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//LOGI

router.get("/login",function(req, res) {
    res.render("user/login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login",
    failureFlash: true,
    successFlash: true
}));
//USER PAGE
router.get("/user/:id",function(req, res) {
    User.findById(req.params.id,function(err, user) {
        if(err){
            console.log(err);
            req.flash("error","User does not exist.");
            res.redirect("back");
        }
        else{
            res.render("user/profile",{user:user});
        }
    });
});


router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged out");
    res.redirect("/campgrounds");
});

module.exports = router;