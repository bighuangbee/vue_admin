<template>
  <el-form
    class="form"
    :model="model"
    :rules="rules"
    ref="form"
    label-width="88px"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input
        placeholder="请输入用户名"
        v-model.trim="model.userName"
        clearable
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input placeholder="请输入邮箱" v-model.trim="model.email" clearable />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input
        type="number"
        placeholder="请输入电话号码"
        v-model.trim="model.phone"
        clearable
      />
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select
        style="width: 100%"
        placeholder="请选择角色"
        v-model="model.role"
        clearable
      >
        <el-option
          v-for="item in roles"
          :key="item.value"
          :value="item.value"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
} from 'vue'
import { validEmail, validPhone } from '@/utils/validate'
import * as api from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const checkEmail = (rule, value, callback) => {
  if (!validEmail(value)) {
    return callback(rule.message)
  }
  callback()
}
const checkPhone = (rule, value, callback) => {
  if (!validPhone(value)) {
    return callback(rule.message)
  }
  callback()
}

export default defineComponent({
  name: 'userEdit',
  setup() {
    const { ctx } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref(null)

    const state = reactive({
      model: {
        userName: '',
        email: '',
        phone: '',
        role: '',
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 20,
            message: '用户名长度为2~20位',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            validator: checkEmail,
            message: '请输入正确格式的邮箱',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur',
          },
          {
            validator: checkPhone,
            message: '请输入正确格式的电话号码',
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
          },
        ],
      },
      roles: [],
    })

    onBeforeMount(async () => {
      // 获取角色列表
      const { code, data } = await api.getRoles()

      if (+code === 200) {
        state.roles = data
      }

      // 获取用户信息
      if (route.params.id) {
        const { code, data } = await api.getUserInfo(route.params.id)
        if (+code === 200) {
          state.model = data
        }
      }
    })

    const submit = () => {
      form.value.validate(async valid => {
        if (valid) {
          const { code, msg } = await api[
            route.params.id ? 'editUser' : 'addUser'
          ](state.model)
          if (+code === 200) {
            ctx.$message.success(msg)
            // 关闭当前页面
            store.dispatch('tags/delTag', route)
            // 返回用户列表，带上一个时间戳参数，让页面刷新
            router.push('/user/list?t=' + Date.now())
          }
        }
      })
    }

    return {
      ...toRefs(state),
      form,
      submit,
    }
  },
})
</script>
<style lang="scss" scoped>
.form {
  max-width: 640px;
  margin: 32px auto 0;
}
</style>
