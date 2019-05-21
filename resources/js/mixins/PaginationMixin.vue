<script>
export default {
    data() {
        return {
            pagination: {
                meta: {
                    to: 1,
                    from: 1
                }
            },
            offset: 4,
            currentPage: 1,
            perPage: 15,
        };
    },

    created: function() {},

    computed: {
        pagesNumber() {
            if (!this.pagination.meta.to) {
                return []
            }
            let from = this.pagination.meta.current_page - this.offset
            if (from < 1) {
                from = 1
            }
            let to = from + (this.offset * 2)
            if (to >= this.pagination.meta.last_page) {
                to = this.pagination.meta.last_page
            }
            let pagesArray = []
            for (let page = from; page <= to; page++) {
                pagesArray.push(page)
            }
            return pagesArray
        },

        totalData() {
            return (this.pagination.meta.to - this.pagination.meta.from) + 1
        }
    },

    methods: {
        changePage(pageNumber) {
            this.currentPage = pageNumber
            this.fetchData()
        },
    }
};

</script>
