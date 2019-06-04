export default {
    SET_OPTIONS: (state, options) => state.options = options,
    SET_PICKER:(state, columns, queries) => {
        let dateInputs = columns.filter(item => item.type == 'date')
        dateInputs.map(item => {
            $('#' + item.title).on('apply.daterangepicker', (ev, picker) => {
                let value = picker.startDate.format('DD/MM/YYYY hh:mm') + ' - ' + picker.endDate.format('DD/MM/YYYY hh:mm')
                state.queries[item.title] = value
                $('#' + item.title).val(value)
                // state.fetchData(true)
            });

            $('#' + item.title).on('cancel.daterangepicker', (ev, picker) => {
                state.queries[item.title] = ''
                $('#' + item.title).val('')
                // state.fetchData(true)
            });
        })
    }
}