const Helper = {

    paramsPresent(requiredParams, data){

        for (let i=0; i < requiredParams.length; i++){
            let val = requiredParams[i]
            if (data[val] === undefined || data[val] === null || data[val] === ''){
                return [false, val];
            }
        }
        return [true, null];

    },

    isEmpty(data){
        return (data === undefined || data == null || data.length <= 0) ? true : false;
    }

}

module.exports = Helper;