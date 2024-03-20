import express from "express";
import reviewController from "./review.controller.js";

const router = express.Router();

router
  .get("/", reviewController.getReviews)
  .post("/add-review", reviewController.addReview)
  .patch("/edit-review", reviewController.updateReview)
  .delete("/:reviewId", reviewController.deleteReview);

export const reviewRoute = router;
