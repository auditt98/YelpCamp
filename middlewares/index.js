//ALL MIDDLEWARES GO HERE
var Comments = require("../models/comments.js");
var Campground = require("../models/campgrounds.js");

var middleWareObj = {
    checkOwnership: function(req,res,next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,campground) {
                if(err || !campground){console.log(err);req.flash("error","Hello, is it me you're looking for (Campground not exist)"); res.redirect("back");}
                //campground.author.id is an OBJECT BTW SO USE .equal()!!!
                else if(campground.author.id.equals(req.user._id)){
                    return next();
                }
                else{
                    req.flash("error","You need to be logged in to do that.");
                    res.redirect("back");
                }
            });
        }
        else{
            res.redirect("back");
        }
    },
    isLoggedIn : function (req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        else{
            req.flash("error","You need to be logged in to do that.");
            res.redirect("/login");
        } 
    },
    checkCommentAuthor: function(req,res,next){
        if(req.isAuthenticated()){
            Comments.findById(req.params.comment_id,function(err, comment) {
                if(err || !comment){
                    console.log(err);
                    req.flash("error","No comment found");
                    res.redirect("/campgrounds");
                }
                else{
                    if(comment.author.id.equals(req.user._id)){
                        return next();
                    }
                    else{
                        req.flash("error","Not your comment! Move along");
                        res.redirect("back");
                    }
                }
            });
        }
        else{
            req.flash("error","You need to be logged in to do that.");
            res.redirect("back");
        }
    }
};

module.exports = middleWareObj;

