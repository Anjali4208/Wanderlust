const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// app.use(cookieParser());

//signed cookie
// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("color", "red", {signed: true});
//     res.send("signed cookie sent");
// })
// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// create review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
