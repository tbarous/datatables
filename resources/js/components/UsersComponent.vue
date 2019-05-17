<template>
  <DatatableComponent
      :fetch-url="'/users/data-table'"
      :columns="['username', 'email', 'created_at' , 'updated_at']"
    ></DatatableComponent>
</template>

<script>
  import DatatableComponent from './DatatableComponent'
  export default{
    components:{
      DatatableComponent
    }
  }
</script>