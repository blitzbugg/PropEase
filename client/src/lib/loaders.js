import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) => {

    const res = await apiRequest("/posts/" + params.id)
    return res.data;
    
}
export const listPageLoader = async ({request, params}) => {
   
    const query = request.url.split("?")[1]
    const res = await apiRequest("/posts?" + query)

    console.log("ListPageLoader response:", res.data);  
    
    return res.data;
    
}