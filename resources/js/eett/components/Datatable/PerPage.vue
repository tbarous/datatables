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
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters("datatable", {
            perPage: 'getPerPage',
            itemsShow: 'getItemsShow'
        })
    },
    methods: {
        fetchData() {
            this.$store.dispatch('datatable/fetchData', true)
        }
    }
}

</script>
