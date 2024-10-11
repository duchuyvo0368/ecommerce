import axios from '../axios';

//===================get_all_users =================
const getAllUser=(data)=>{
    return axios.get(`/api/get-all-user?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)
}
const createUser=(data)=>{
    return axios.post(`/api/create-new-user`, data)
}
 const handleLoginService = (data) => {
    return axios.post(`/api/login`, data)

}
//=================check===================
const checkPhoneNumberEmail = (data) => {
    return axios.get(`/api/check-phonenumber-email?phonenumber=${data.phonenumber}&email=${data.email}`)

}


//===================Products=================
const getProductNewService = (limit) => {
    return axios.get(`/api/get-product-new?limit=${limit}`)
}
const getDetailProductById = (id)=>{
    return axios.get(`/api/get-detail-product-by-id?id=${id}`)
}

export {
    getProductNewService,
    getDetailProductById,
    handleLoginService,
    checkPhoneNumberEmail,
};