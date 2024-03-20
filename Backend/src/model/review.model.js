import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "review",
  }
);

export const ReviewModel = model("Review", reviewSchema);
