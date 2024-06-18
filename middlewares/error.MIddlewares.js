

export const errorMiddlewares = (err, req, res, next) => {
    

    const statuscode = err.statuscode || 50;
    const message = err.message || "Internal Server Error "
    

    res.status(statuscode).json({
        success: false,
        message
    })
}