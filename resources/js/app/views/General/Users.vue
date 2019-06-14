<template>
    <div>
        <excel></excel>
        <pdf></pdf>
        <v-divider></v-divider>
        <!-- <add></add> -->
        <div v-for="(form, index) in forms" :key="form.name">
            <simple-dialog :form="form"></simple-dialog>
        </div>
        <v-divider></v-divider>
        <datatable></datatable>
    </div>
</template>

<script>
    export default {
        created(){
            this.setDatatable('user')
        },

        computed: {
            forms(){
                return this.$store.getters['user/GET_FORMS']
            },
            files(){
                return this.$store.getters['user/GET_FILES']
            }
        }
    }
</script>
