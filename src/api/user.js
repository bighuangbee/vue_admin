import request from '@/utils/request'

export const getUserList = params => {
  return request({
    url: '/api/userList',
    method: 'get',
    params,
  })
}

export const deleteUser = userIds => {
  return request({
    url: `/api/user/${userIds}`,
    method: 'delete',
  })
}

export const addUser = data => {
  return request({
    url: `/api/user/add`,
    method: 'post',
    data,
  })
}

export const editUser = data => {
  return request({
    url: `/api/user/edit/${data.id}`,
    method: 'put',
    data,
  })
}

export const getRoles = params => {
  return request({
    url: '/api/roles',
    method: 'get',
    params,
  })
}

export const getUserInfo = userId => {
  return request({
    url: `/api/user/${userId}`,
    method: 'get',
  })
}
