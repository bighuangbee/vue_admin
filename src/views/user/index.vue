<template>
  <pro-table
    ref="userList"
    title="用户列表"
    :request="getUserList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
    <template #toolbar>
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="$router.push('/user/add')"
      >
        添加用户
      </el-button>
      <el-button
        :disabled="selectedUserIds.length <= 0"
        type="danger"
        icon="el-icon-delete"
        @click="deleteUser(selectedUserIds.join(','))"
      >
        批量删除
      </el-button>
    </template>
    <template #time="{row}">
      {{ parseTime(row.createTime) }}
    </template>
    <template #operate="{row}">
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="$router.push(`/user/edit/${row.id}`)"
      >
        编辑
      </el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="deleteUser(row.id)"
      >
        删除
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  ref,
  getCurrentInstance,
  reactive,
  toRefs,
} from 'vue'
import * as api from '@/api/user'
import { parseTime } from '@/utils'

export default defineComponent({
  name: 'userList',
  setup() {
    const { ctx } = getCurrentInstance()
    const userList = ref(null)
    const state = reactive({
      columns: [
        {
          type: 'selection',
        },
        {
          label: '用户名',
          prop: 'userName',
        },
        {
          label: '邮箱',
          prop: 'email',
        },
        {
          label: '电话',
          prop: 'phone',
        },
        {
          label: '角色',
          prop: 'role',
        },
        {
          label: '创建时间',
          tdSlot: 'time',
        },
        {
          label: '操作',
          fixed: 'right',
          width: 200,
          align: 'center',
          tdSlot: 'operate',
        },
      ],
      searchConfig: {
        labelWidth: '88px',
        inputWidth: '320px',
        fields: [
          {
            type: 'text',
            label: '用户名',
            name: 'userName',
          },
          {
            type: 'text',
            label: '邮箱',
            name: 'email',
          },
          {
            type: 'select',
            label: '角色',
            name: 'role',
            options: [],
          },
          {
            type: 'datetime',
            label: '创建时间',
            name: 'createTime',
          },
        ],
      },
      paginationConfig: {
        pageSize: 20,
        pageSizes: [5, 10, 20, 50],
      },
      selectedUserIds: [], // 已选择的用户的id
    })

    onBeforeMount(async () => {
      const { code, data } = await api.getRoles()

      if (+code === 200) {
        state.searchConfig.fields.find(
          item => item.name === 'role'
        ).options = data
      }
    })

    const getUserList = async params => {
      const { code, data } = await api.getUserList(params)

      if (+code === 200) {
        return {
          data: data.list,
          total: data.total,
        }
      }
    }

    const handleSelectionChange = ev => {
      state.selectedUserIds = ev.map(item => item.id)
    }

    const deleteUser = userIds => {
      ctx
        .$confirm('是否确定删除？', {
          type: 'warning',
        })
        .then(async () => {
          const { code, msg } = await api.deleteUser(userIds)

          if (+code === 200) {
            ctx.$message.success(msg)
            userList.value.refresh()
          }
        })
        .catch(() => {})
    }

    return {
      userList,
      ...toRefs(state),
      getUserList,
      handleSelectionChange,
      parseTime,
      deleteUser,
    }
  },
})
</script>
