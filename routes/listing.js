const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); 

router
    .route("/")
    //index
    .get(wrapAsync(listingController.index))
    //create
    .post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
    // .post((req, res)=> {
    //     res.send(req.file);
    // })

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    //show route
    .get(wrapAsync(listingController.showListing))
    //update route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    //delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

// router.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// })

module.exports = router;
