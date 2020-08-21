export let responseFormalize = (status,code,error,message,data) =>{
    return {
        status: status || 404,
        code: code || null,
        error: error || false,
        message : message || null,
        data : data || null
    }
}