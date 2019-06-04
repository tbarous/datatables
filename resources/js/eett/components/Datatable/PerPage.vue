<template>
    <v-flex xs6>
        <br>
        <span>Show</span>
        <v-select 
            class="d-inline-block"
            :items="itemsShow" 
            label="Show" 
            solo 
            v-model="perPage" 
            @change="fetchData">
        </v-select>
        <span>entries</span>
    </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters("datatable", {
            // perPage: 'getPerPage',
            itemsShow: 'GET_ITEMS_SHOW'
        }),

        perPage: {
            get(){
                return this.$store.getters['datatable/GET_PER_PAGE']
            },
            set(perPage){
                this.$store.dispatch('datatable/SET_PER_PAGE', perPage)
            }
        }
    },
    methods: {
        fetchData() {
            this.$store.dispatch('datatable/FETCH_DATA', true)
        }
    }
}
</script>
