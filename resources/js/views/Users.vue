<template>
    <div>
        <datatable :fetch-url="url" :columns="columns"></datatable>
    </div>
</template>

<script>
import Datatable from '../components/Datatable'

export default {
    data() {
        return {
            url: data.users.url,
            columns: data.users.headers
        }
    },

    components: {
        Datatable
    }
}
</script>
