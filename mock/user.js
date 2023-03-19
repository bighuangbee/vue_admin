export default [
  {
    url: '/api/userList', // 请求地址
    method: 'get', // 请求方法
    timeout: 1000,
    response: body => {
      return {
        code: 200,
        msg: '获取成功',
        data: {
          'total|99-1000': 1,
          [`list|${body.query.pageSize}`]: [
            {
              'id|+1': 1,
              userName: '@cname()',
              email: '@email()',
              'phone|13000000000-19999999999': 1,
              'role|1': ['Admin', 'Visitor', 'Editor'],
              createTime: '@datetime("T")',
            },
          ],
        },
      }
    },
  },
  {
    url: '/api/user/:userIds', // 请求地址
    method: 'delete', // 请求方法
    response: {
      code: 200,
      msg: '删除成功',
    },
  },
  {
    url: '/api/user/add', // 请求地址
    method: 'post', // 请求方法
    response: {
      code: 200,
      msg: '添加成功',
    },
  },
  {
    url: '/api/user/edit/:userId', // 请求地址
    method: 'put', // 请求方法
    response: {
      code: 200,
      msg: '修改成功',
    },
  },
  {
    url: '/api/roles', // 请求地址
    method: 'get', // 请求方法
    response: {
      code: 200,
      msg: '获取成功',
      data: [
        {
          name: 'Admin',
          value: 'admin',
        },
        {
          name: 'Visitor',
          value: 'visitor',
        },
        {
          name: 'Editor',
          value: 'editor',
        },
      ],
    },
  },
  {
    url: '/api/user/:userId', // 请求地址
    method: 'get', // 请求方法
    response: {
      code: 200,
      msg: '获取成功',
      data: {
        'id|1-999': 1,
        userName: '@cname()',
        email: '@email()',
        'phone|13000000000-19999999999': 1,
        'role|1': ['admin', 'visitor', 'editor'],
        createTime: '@datetime("T")',
      },
    },
  },
]
