export function getState(){
  return {
        form: {},
        options: {
            autoUpdateInput: false,
            autoApply: true,
            opens: 'left',
            buttonClasses: 'btn btn-secondary',
            locale: {
                cancelLabel: 'CLEAR',
                format: 'DD/MM/YYYY H:mm',
                applyLabel: "CONFIRM",
            },
            timePicker: true
        },
        dataFetchUrl: '',
        resourceURL: '',
        columns: {},
        loading: false,
        pagination: { meta: { to: 1, from: 1 } },
        offset: 4,
        currentPage: 1,
        perPage: 15,
        order: 'desc',
        itemsShow: [15, 50, 100],
        sortedColumn: 'updated_at',
        selectAll: false,
        generalSearch: '',
        tableData: [],
        // queries: {},
        // activeColumns: {},
        selected: [],
        // selectBoxes: {},
        editingRow: {},
        editingMultipleRow: {},
        errors: {},
        filters: [],
        addingRow: {}
    }
} 