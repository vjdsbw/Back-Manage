import request from '@/utils/request'

// 新增产品
export const AddProduct = data => {
    return request({
        url: '/api/addproduct',
        method: 'post',
        data,
    })
}

// 更新产品
export const UpdateProduct = data => {
    return request({
        url: '/api/updateproduct',
        method: 'post',
        data,
    })
}

//获取产品详情
export const GetProductDetail = (data) => {
    return request({
        url: `/api/getproductdetail?CName=${data.CName}`,
        method: 'get',
    })
}
//获取所有产品的数据
export const Getallproduct = (data) => {
    return request({
        url: `/api/getallproduct`,
        method: 'post',
        data
    })
}
//删除产品的数据
export const DelProduct = (id) => {
    return request({
        url: `/api/delproduct?id=${id}`,
        method: 'get',
    })
}