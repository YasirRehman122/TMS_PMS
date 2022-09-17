module.exports = (req, res, next) => {
    
    res.success = (status_code, msg, data=null) => {
        res.status(status_code).json({
            status: true, 
            // code: status_code,
            message: msg, 
            data: data
        });
    }

    res.error = (status_code, errorObj = null) => {
        res.status(status_code).json({
            status: false, 
            // code: status_code, 
            message: errorObj, 
            data: null, 
            // error: errorObj 
        });
    }
    
    next()
}