<template>
	<tr class="bg-dark">
        <!-- <th :width="smallColumnWidth"></th> -->
        <th :width="smallColumnWidth">
            <v-checkbox class="mt-0 toggleAll" @click.self="toggleAll" :value="selectAll"></v-checkbox>
        </th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title">
            <v-text-field
                clearable 
                @input="fetchData" 
                v-model="queries[column.title]" 
                :name="column.type" 
                solo 
                autocomplete="off" 
                :id="column.title" 
                prepend-inner-icon="search">
            </v-text-field>

            <!-- <div class="position-relative">
                <input 
                type="text" 
                name="datefilter" 
                autocomplete="off" 
                @input="fetchData"
                @change="fetchData"
                :id="column.title" 
                v-if="column.type=='date'" 
                v-model="queries[column.title]" 
                class="date-range-picker elevation-2">
                
                <v-btn fab small v-if="column.type=='date'" class="clearDate" :id="column.title" flat style="position: absolute;top:0;right:0;">
                     <v-icon small>fa fa-times</v-icon>
                </v-btn>
            </div> -->
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
        mounted(){
            $('input[name="date"]').daterangepicker(this.$store.getters['datatable/GET_OPTIONS'])
            let columns = this.$store.getters['datatable/GET_COLUMNS']
            let queries = this.$store.getters['datatable/GET_QUERIES']
            // this.$store.commit('datatable/SET_PICKER', {columns:columns, queries:queries})
            // let {columns, queries} = payload
            let dateInputs = columns.filter(item => item.type == 'date')
            dateInputs.forEach(item => {
                $('#' + item.title).on('apply.daterangepicker', (ev, picker) => {
                    let value = picker.startDate.format('DD/MM/YYYY hh:mm') + ' - ' + picker.endDate.format('DD/MM/YYYY hh:mm')
                    queries[item.title] = value
                    $('#' + item.title).val(value)
                    this.$store.dispatch('datatable/FETCH_DATA', true)
                });

                $('#' + item.title).on('cancel.daterangepicker', (ev, picker) => {
                    queries[item.title] = ''
                    $('#' + item.title).val('')
                    this.$store.dispatch('datatable/FETCH_DATA', true)
                });
            })

            // $('.clearDate').on('click', (evt) => {
            //     $(evt.currentTarget).siblings('input').val('')
            //     this.$store.commit('datatable/EMPTY_QUERY', $(evt.currentTarget).attr('id'))
            //     this.$store.dispatch('datatable/FETCH_DATA', true)
            //   });
        },
        methods: {
            ...mapMutations("datatable", {
                toggleAll: 'TOGGLE_ALL'
            }),
            fetchData() {
                this.$store.dispatch('datatable/FETCH_DATA', true)
            },
            // empty(title){
            //     this.$store.commit('datatable/EMPTY_QUERY', title)
            // }
        }
	}
</script>