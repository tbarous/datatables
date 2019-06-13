<template>
	<tr class="bg-dark">
        <th>
            <v-checkbox class="mt-0 toggleAll" @click.self="toggleAll" :value="selectAll"></v-checkbox>
        </th>
        <th v-if="column.active" v-for="column in columns" :key="column.title">
            <input
                class="form-control filter-input"
                clearable 
                @input="fetchData" 
                v-model="column.query" 
                :name="column.type" 
                solo 
                v-if="column.filterable"
                autocomplete="off" 
                :id="column.title" 
                :readonly="column.type == 'date'"
                :class="{'dateinput': column.type == 'date'}"
            >
            </input>
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
            }),
        },
        mounted(){
            $('input[name="date"]').daterangepicker(this.$store.getters['datatable/GET_OPTIONS'])
            let columns = this.$store.getters['datatable/GET_COLUMNS']
            let queries = this.$store.getters['datatable/GET_QUERIES']
            let dateInputs = columns.filter(item => item.type == 'date')
            dateInputs.forEach(item => {
                $('#' + item.title).on('apply.daterangepicker', (ev, picker) => {
                    let value = picker.startDate.format('DD/MM/YYYY hh:mm') + ' - ' + picker.endDate.format('DD/MM/YYYY hh:mm')
                    queries[item.title] = value
                    $('#' + item.title).val(value)
                    // this.$store.commit('datatable/SET_QUERY', {title: item.title, value: value})
                    this.$store.dispatch('datatable/FETCH_DATA', true)
                });

                $('#' + item.title).on('cancel.daterangepicker', (ev, picker) => {
                    queries[item.title] = ''
                    $('#' + item.title).val('')
                    this.$store.dispatch('datatable/FETCH_DATA', true)
                });
            })
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