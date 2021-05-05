import { mockListApi } from '/@/utils/mockListApi'
import { genPhone } from 'easy-fns-ts'
import Mock from 'mockjs'

const Random = Mock.Random
const tableData: any[] = []
const total = 100

for (let i = 0; i < total; i++) {
  const template = {
    id: Random.id(),

    name: Random.name(),

    user: {
      gender: Random.pick(['M', 'F']),
      age: Random.integer(16, 30),
      phone: genPhone(),
    },

    family: {
      mom: {
        name: Random.name(),
        age: Random.integer(30, 60),
        hasWork: Random.boolean(),
      },
      dad: {
        name: Random.name(),
        age: Random.integer(30, 60),
        hasWork: Random.boolean(),
      },
    },

    status: Random.boolean(),
    createdAt: Random.datetime(),
    description: Random.sentence(),
  }

  tableData.push(template)
}

export const mockListUser = mockListApi(tableData)
