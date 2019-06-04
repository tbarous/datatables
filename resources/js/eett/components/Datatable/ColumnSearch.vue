<template>
	<tr class="bg-dark">
        <th :width="smallColumnWidth"></th>
        <th :width="smallColumnWidth">
            <v-checkbox class="mt-0 toggleAll" @click.self="toggleAll" :value="selectAll"></v-checkbox>
        </th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title">
            <v-text-field 
                clearable 
                style="min-width: 100px;" 
                @input="fetchData(true)" 
                v-model="queries[column.title]" 
                v-if="column.type=='text'" 
                solo 
                autocomplete="off" 
                prepend-inner-icon="search">
            </v-text-field>
            <input 
                type="text" 
                name="datefilter" 
                autocomplete="off" 
                :id="column.title" 
                v-if="column.type=='date'" 
                v-model="queries[column.title]" 
                class="date-range-picker elevation-2">
        </th>
        <th></th>
    </tr>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import { mapMutations } from 'vuex'

	export default{
		computed: {
            ...mapGetters("datatable", {
                selectAll: 'GET_SELECT_ALL',
                columns: 'GET_COLUMNS',
                activeColumns: 'GET_ACTIVE_COLUMNS',
                smallColumnWidth: 'GET_SMALL_COLUMN_WIDTH'
            }),
            queries: {
                get() {
                    return this.$store.getters['datatable/GET_QUERIES']
                },
                set(queries){
                    this.$store.commit('datatable/SET_QUERIES', queries)
                }
            }
        },
        
        methods: {
            ...mapMutations("datatable", {
                toggleAll: 'TOGGLE_ALL'
            }),
            fetchData() {
                this.$store.dispatch('datatable/FETCH_DATA', true)
            }
        }
	}
</script>