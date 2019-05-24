<script>
export default {
    methods: {
        setGlobalLoading(value){
            this.$store.dispatch('loading/setLoading', value);
        }
    }
};
</script>
