var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var camgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", camgroundSchema);

/*var campgrounds = [
        {name: "WellsNextSea", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "LakeDistrict", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
        {name: "Cornwall", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "WellsNextSea", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "LakeDistrict", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
        {name: "Cornwall", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "WellsNextSea", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "LakeDistrict", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
        {name: "Cornwall", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
    ];*/

/*Campground.create(
    {
        name: "Scotland", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lovely place. We spent couple of days. Recomend to anyone. Anytime!!!"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Added to db");
            console.log(campground);
        }
    });*/

app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, camp){
        if(err){
            console.log(err);
        } else {
             res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp App Has Started!!!");
});