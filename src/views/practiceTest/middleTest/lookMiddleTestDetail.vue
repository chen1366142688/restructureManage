<template>
  <div>
      <!-- <table-student></table-student> -->
      <project-table :disabled="disabled"></project-table>
  </div>
</template>

<script>

import tableStudent from '@/components/testTable/tableStudent.vue'
import projectTable from '@/components/testTable/projectTable.vue'
export default {
  components: {
    tableStudent,
    projectTable,
  },
  data() {
    return {

    }
  },
  computed:{
    disabled() {
      return this.$route.query.disabled
    }
  },
  methods: {
    
  }

}
</script>

<style>

</style>