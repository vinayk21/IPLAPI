class ApiResponce{
    constructor(statuscode,data,message = "Success"){
       this.statuscode = statuscode
       this.data = data
       this.data.message = message
       this.success = statuscode < 400
    }
}

module.exports = {ApiResponce}