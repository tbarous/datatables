export default {
    SET_OPTIONS: (state, options) => state.options = options,
    SET_PICKER:() => {
        let dateInputs = this.columns.filter(item => item.type == 'date')
        dateInputs.map(item => {
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