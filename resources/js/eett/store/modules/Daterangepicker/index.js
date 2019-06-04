import getters from './getters'
import mutations from './mutations'
import actions from './actions'

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

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
