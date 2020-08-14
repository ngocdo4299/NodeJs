export let responseFormalize = (status,code,error,message,data) =>{
    return {
        'status': status || 404,
        'code': code || "NULL",
        'error': error || false,
        'message' : message || "NULL",
        'data' : data || "NULL"
    }
}