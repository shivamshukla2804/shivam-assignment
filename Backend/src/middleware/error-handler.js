const constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  DUBLICATE_DATA: 409,
};

const errorHandler = (err, req, res, next) => {
  // console.log(res.statusCode, "<-----Error Handler Error Code---->", err);
  const statusCode = res.statusCode ? res.statusCode : 500;
  // console.log(err, "middleware error");
  let error = "Something went wrong";
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      error = "Validation Failed";
      // res.status(statusCode).json({

      // });
      break;
    case constants.NOT_FOUND:
      error = "Not Found";
      // res.status(statusCode).json({
      //   title: "Not Found",
      //   message: err,
      // });
      break;
    case constants.UNAUTHORIZED:
      error = "Unauthorized";
      // res.status(statusCode).json({
      //   title: "Unauthorized",
      //   message: err,
      // });
      break;
    case constants.FORBIDDEN:
      error = "Forbidden";
      // res.status(statusCode).json({
      //   title: "Forbidden",
      //   message: err,
      // });
      break;
    case constants.SERVER_ERROR:
      error = "Server Error";
      // res.status(statusCode).json({
      //   title: "Server Error",
      //   message: err,
      // });
      break;
    case constants.DUBLICATE_DATA:
      error = "Duplicate Data";
      // res.status(statusCode).json({
      //   title: "Duplicate Data",
      //   message: err,
      // });
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
  res.status(statusCode).json({
    error: error,
    message: err,
    statusCode: statusCode,
  });
};

export default errorHandler;
