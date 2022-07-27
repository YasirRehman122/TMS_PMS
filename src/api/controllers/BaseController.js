class BaseController {
    
    constructor() {
        if (this.constructor == BaseController) {
            throw new Error("ERROR");
        }
    }


    handleExceptions(ex, res) {
        // this.logger.error(ex);
        console.log(ex);

        if (ex.code && ex.message && !isNaN(ex.code)) {
            // res.error(ex.code, ex.message);
            res.status(ex.code).json({status: false, message: ex.message, data: null});
        } else {
            // res.error(500, "Something went wrong");
            res.status(500).json({status: false, message: "Something went wrong", data: null});
        }
    }
}

module.exports = BaseController;