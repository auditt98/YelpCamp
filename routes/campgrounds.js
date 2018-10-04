var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds.js");
var middleWareObj = require("../middlewares"); //auto require index.js

router.get("/",function(req,res){
    Campground.find({},function(err,camps){
        if(err){
            console.log("OOPS");
        }
        else{
            res.render("campgrounds/index",{campgrounds:camps});
        }
    });
});

router.post("/",middleWareObj.isLoggedIn,function(req,res){
    //get from form

    Campground.create(req.body.campground,function(err,campground){
        if(err){
            console.log("OOPS");
            req.flash("error","Something exploded! Please try again later.");
            res.redirect("/campgrounds");
        }
        else{
            campground.author.id = req.user._id;
            campground.author.username = req.user.username;
            campground.location = req.body.location;
            campground.save();
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new",middleWareObj.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,camp){
        if(err || !camp){
            req.flash("error","Simply put, this campground does not exist");
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("campgrounds/show",{camp:camp});
        }
    });
});

//edit camp

router.get("/:id/edit",middleWareObj.checkOwnership,function (req,res) {
    Campground.findById(req.params.id,function(err,campground) {
        if(err || !campground){console.log(err); req.flash("error","OH NO! That campground does not exist.");res.redirect("/campgrounds")}
        res.render("campgrounds/edit",{campground:campground});
        //campground.author.id is an OBJECT BTW SO USE .equal()!!!
    });
});
router.put("/:id",middleWareObj.checkOwnership,function (req,res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err || !campground){console.log(err);res.redirect("/campgrounds");}
        res.redirect("/campgrounds/"+ req.params.id);
    });
});

//delete camp
router.delete("/:id",middleWareObj.checkOwnership,function (req,res) {
    Campground.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            req.flash("error","Something exploded! Please try again later.");
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;