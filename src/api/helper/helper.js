const Helper = {

    paramsPresent(requiredParams, data){

        //Checks if the data objects contains all the properties specified in the requiredParams array
        for (let i=0; i < requiredParams.length; i++){
            let val = requiredParams[i]
            //Checks if thess properties are not undefined, null or empty
            if (data[val] === undefined || data[val] === null || data[val] === ''){
                //return false if any property does not have a valid value along with the name
                //of the property
                return [false, val];
            }
        }
        //return true with no error if all properties are found with valid values
        return [true, null];

    },

    isEmpty(data){
        return (data === undefined || data == null || data.length <= 0) ? true : false;
    }

}

module.exports = Helper;