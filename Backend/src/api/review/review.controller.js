import addPagination from "../../constant/helper.js";
import { successCode } from "../../constant/statusCode.js";
import { ReviewModel } from "../../model/review.model.js";

const addReview = async (req, res, next) => {
  try {
    const reqData = req.body;
    const reviewData = new ReviewModel(reqData);
    const saveReview = await reviewData.save();
    if (saveReview) {
      return res.status(201).json({
        message: "Review Successfull added",
        data: saveReview,
        statusCode: successCode.Created,
      });
    }
    const errorMessage = "Something went wrong";
    res.statusCode = 500;
    throw new Error(errorMessage);
  } catch (error) {
    const errorMessage = error.message;
    res.statusCode = res.statusCode || 500;
    next(errorMessage);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const { currentPage, perPage, skipValue, searchKey } = addPagination(req);
    const totalReview = await ReviewModel.find().countDocuments();
    const getReview = await ReviewModel.find().skip(skipValue).limit(perPage);
    if (getReview && totalReview) {
      return res.status(200).json({
        message: "Bus get successfully",
        data: { data: getReview, totalReview, perPage, currentPage },
        statusCode: successCode.OK,
      });
    }
    const errorMessage = "Something went wrong";
    throw new Error(errorMessage);
  } catch (error) {
    const errorMessage = error.message;
    res.statusCode = res.statusCode || 500;
    next(errorMessage);
  }
};

const updateReview = async (req, res, next) => {
  try {
    console.log("hiiii");
    const reviewId = req.body.reviewId;
    const updateReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      req.body
    );
    if (!updateReview) {
      const errorMessage = "Review not found";
      res.statusCode = 404;
      throw new Error(errorMessage);
    }
    return res.status(201).json({
      message: "Review updated Successfully",
      data: updateReview,
      statusCode: successCode.OK,
    });
  } catch (error) {
    const errorMessage = error.message;
    res.statusCode = res.statusCode || 500;
    next(errorMessage);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const deleteReview = await ReviewModel.findByIdAndDelete(reviewId);
    // console.log(deleteProduct, "Delete Product");
    if (!deleteReview) {
      const errorMessage = "Review not found";
      res.statusCode = 404;
      throw new Error(errorMessage);
    }
    return res.status(200).json({
      data: deleteReview,
      message: "Review deleted succesfully",
      statusCode: successCode.OK,
    });
  } catch (error) {
    const errorMessage = error.message;
    res.statusCode = res.statusCode || 500;
    next(errorMessage);
  }
};

export default { addReview, getReviews, updateReview, deleteReview };
