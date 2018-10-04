var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campgrounds.js");
var Comments = require("../models/comments.js");
var middleWareObj = require("../middlewares"); //auto require index.js

//NEW COMMENT
router.get("/new",middleWareObj.isLoggedIn,function (req, res) {
    Campground.findById(req.params.id,function(err,camp){
        if(err || !camp){
            console.log(err);
            req.flash("OOPS! Campground does not exist");
            res.redirect("/campgrounds");
        }
        else{
            res.render("comments/new",{camp:camp,user:req.user});
        }
    });
});

router.post("/",middleWareObj.isLoggedIn,function (req,res){
    Campground.findById(req.params.id,function(err, camp) {
        if(err || !camp){
            
            console.log(err);
            req.flash("OOPS! Campground does not exist");
            res.redirect("/campgrounds");
        }
        else{
            Comments.create(req.body.comment,function (err,comment) {
                if(err){
                    req.flash("error","Hmm, we can't create your comment right now. Try again later.");
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.profileImage = req.user.profileImage;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});
//EDIT PAGE ROUTE
router.get("/:comment_id/edit",middleWareObj.checkCommentAuthor,function (req,res) {
    //req.params.id is the id of campground
    Comments.findById(req.params.comment_id,function(err, comment) {
        if(err || !comment){
            req.flash("error","That comment does not exist"); 
            res.redirect("/campgrounds");
        }
        res.render("comments/edit",{campground_id:req.params.id,comment:comment});
    });
});

//UPDATE ROUTE

router.put("/:comment_id",middleWareObj.checkCommentAuthor,function(req,res){
    Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function (err,comment) {
        if(err || !comment){console.log(err);req.flash("error","Comment does not exist");res.redirect("back");}
        else{
            req.flash("success","Campground has been edited!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:comment_id",middleWareObj.checkCommentAuthor,function (req,res) {
    Comments.findByIdAndRemove(req.params.comment_id,function (err) {
        if(err){console.log(err); res.redirect("/campgrounds/" + req.params.id)}
        else{
            req.flash("success","Bye comment :(")
            res.redirect("/campgrounds/" + req.params.id);        
        }
    });
});

module.exports = router;