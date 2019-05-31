const state = {
    options: {
        // timePicker: true,
        // startDate: moment().startOf('hour'),
        // endDate: moment().startOf('hour').add(32, 'hour'),
        // locale: {
        //     // format: 'DD/MM/YY hh:mm'
        // },
        // autoUpdateInput: false
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        },
        timePicker: true
    },
}

const getters = {
    getOptions: state => {
        return state.options
    },
}

const mutations = {
    setOptions(state, options){
        state.options = options
    },
    setPicker(){
        let dateInputs = this.columns.filter(item=>{
            return item.type == 'date'    
        })
        dateInputs.map(item=>{
            $('#' + item.title).on('apply.daterangepicker', (ev, picker) => {
                let value = picker.startDate.format('DD/MM/YYYY hh:mm') + ' - ' + picker.endDate.format('DD/MM/YYYY hh:mm')
                this.queries[item.title] = value
                $('#' + item.title).val(value)
                this.fetchData(true)
            });

            $('#' + item.title).on('cancel.daterangepicker', (ev, picker) => {
                this.queries[item.title] = ''
                $('#' + item.title).val('')
                this.fetchData(true)
            });
        })
    }
}

const actions = {
    setOptions(context, options){
        context.commit('setOptions', options)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
