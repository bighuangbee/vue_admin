export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      // 响应内容
      return +body.password === 123456
        ? {
            code: 200,
            message: '登录成功',
            // data: {
            //   TOKEN: '@word(50, 100)', // @word()是mockjs的语法
            //   REFRESH_TOKEN: '@word(50, 100)', // refresh_token是用来重新生成token的
            // },
            data: '@word(50, 100)',
          }
        : {
            code: 400,
            message: '密码错误，请输入123456',
          }
    },
  },
  {
    url: '/api/userinfo',
    method: 'get',
    timeout: 100,
    response: {
      code: 200,
      message: '获取用户信息成功',
      data: {
        id: 1,
        userName: 'zhangsan',
        'role|1': ['admin', 'visitor'], // 随机返回一个角色admin或visitor
        userProfile: "@image('48x48', '#409eff')",
      },
    },
  },
]
