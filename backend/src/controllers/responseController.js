

const errorResponse = (res, { status = 500, message = "Internal Sever Error" }) => {
    res.status(status).json({
        success: false,
        message: message,
    });
};

const successResponse = (res, { status = 500, message = "Internal Sever Error", payload }) => {
    res.status(status).json({
        success: true,
        message: message,
        payload,
    });
};

module.exports = {
    errorResponse,
    successResponse,
}