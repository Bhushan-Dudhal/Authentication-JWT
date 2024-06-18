

export const errorHandlers = (statuscode, message) => {
    
    const error = new Error()
    
    error.statuscode = statuscode;
    error.message = message;


    return error
}