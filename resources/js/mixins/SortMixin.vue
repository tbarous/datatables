<script>
export const SortMixin = {
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
    created: function() {
        this.greetings();
    },
    methods: {
        greetings: function() {
            console.log('Howdy my good fellow!');
        }
    }
};
</script>
