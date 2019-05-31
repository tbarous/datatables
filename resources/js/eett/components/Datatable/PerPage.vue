<template>
    <v-flex xs6>
        <div>
            <span>Show</span>
            <v-select :items="itemsShow" label="Show" solo :value="perPage" @change="fetchData"></v-select>
            <span>entries</span>
        </div>
    </v-flex>
</template>

<script>
export default {
    computed: {
        perPage() {
            return this.$store.getters['datatable/getPerPage']
        },
        itemsShow() {
            return this.$store.getters['datatable/getItemsShow']
        }
    },
    methods: {
        fetchData() {
            this.$store.dispatch('datatable/fetchData', true)
        }
    }
}

</script>
