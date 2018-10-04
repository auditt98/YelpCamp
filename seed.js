var mongoose = require("mongoose");
var Campground = require("./models/campgrounds.js");
var Comments = require("./models/comments.js")

var data = 
[
    {
        name : "Bonfire",
        image : "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebb0b2d80f4b2d82f3587492b80e2321&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris porta purus felis, a vulputate quam interdum in. Duis facilisis nisi eget porttitor iaculis. Vivamus facilisis est elementum, laoreet quam et, convallis diam. Nullam a tortor condimentum, mattis magna eu, egestas diam. Pellentesque nec leo libero."
    },
    {
        name : "Mountain Top",
        image : "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis."
    },
    {
        name: "Nighty Night",
        image: "https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e24a27e43e4985c7852a3bdea697da7&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis.",
    },
    {
        name: "Bridge",
        image: "https://images.unsplash.com/photo-1529335368860-022a22e0a944?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fab5ca16cc116a70ebb8c9f2ce8175f9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis."
    },
    {
        name: "Grassy Rest",
        image: "https://images.unsplash.com/photo-1533576182743-b0e2d2c9d7a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=963f96c7a50404bd414e0e9b3f146033&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis."
    },
    {
        name: "Desert Camping",
        image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-0.3.5&s=e288f700a591363b6de6fefc12bcd183&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis."
    },
    {
        name: "Sunny Walk",
        image:"https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=109a995ae1218e93ed43d0202f87687c&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta sapien quis enim posuere interdum. Nunc nec tempor enim. Praesent arcu sem, commodo in pharetra et, sodales id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus lacus urna, vitae bibendum nisl rhoncus eu. Suspendisse porta nec purus sed semper. In arcu risus, tincidunt eu scelerisque sit amet, dictum finibus turpis."
    }
];

function seed(data) {
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            data.forEach(function(seedCamp){
                Campground.create(seedCamp,function(err,camp){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Comments.create({
                            author: "Sarah",
                            text: "This place is amazing, no Internet tho :("
                        },function (err,comment) {
                            if(err){
                                console.log(err);
                            }
                            else{
                                camp.comments.push(comment);
                                camp.save();
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seed(data);
