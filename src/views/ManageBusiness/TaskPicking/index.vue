<template>
  <div>
    <SearchCard :config="config" @getFormData="getCarriers" @resetlist="getCarriers" />
    <Table v-loading="loading" :thead="thead" :table-date="tableDate" />
  </div>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import Table from '@/components/Table'
import { getCarriers } from '@/api/carriers'
export default {
  components: { SearchCard, Table },
  data() {
    return {
      config: [
        {
          prop: 'like_code',
          label: '承运商编号'
        },
        {
          prop: 'like_name',
          label: '承运商名称'
        },
        {
          prop: 'like_personName',
          label: '联系人'
        }
      ],
      thead: [
        {
          prop: 'code',
          label: '承运商编号',
          width: 200
        },
        {
          prop: 'name',
          label: '承运商名称',
          width: 150
        },
        {
          prop: 'personName',
          label: '联系人',
          width: 150
        },
        {
          prop: 'phone',
          label: '联系人电话',
          width: 150
        },
        {
          prop: 'email',
          label: '联系邮箱',
          width: 150
        },
        {
          prop: 'location',
          label: '省/市/区'
        },
        {
          prop: 'address',
          label: '详细地址'
        },
        {
          prop: 'updateTime',
          label: '更新时间'
        }
      ],
      tableDate: [],
      search: {
        like_code: '',
        like_name: '',
        like_personName: '',
        size: 10,
        current: 1
      },
      loading: false
    }
  },
  created() {
    this.getCarriers(this.search)
  },
  methods: {
    async getCarriers(form) {
      // Object.assign(this.search, form)
      try {
        this.loading = true
        const { data } = await getCarriers(form)
        // console.log(data)
        this.tableDate = data.records
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
    // getCarriers(obj) {
    //   console.log(obj)
    // }

  }
}
</script>

<style scoped>

</style>
