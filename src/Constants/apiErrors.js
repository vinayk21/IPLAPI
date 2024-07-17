const createErrors = (statusCode,message) =>{
    return {
        statusCode,
        message,
        status: `${statusCode}`.toString().startsWith('4') ? 'fail' : 'error',
        isOperational: true,
      };
   
}

module.exports = { createErrors }