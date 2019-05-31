<template>
    <div>
        <v-layout>
            <excel></excel>
            <PDF></PDF>
            <copy></copy>
        </v-layout>

        <datatable></datatable>

        <update></update>
        <update-multiple></update-multiple>
    </div>
</template>

<script>
import Datatable from '../components/Datatable/Datatable'
import Update from './../components/Dialogs/Update'
import UpdateMultiple from './../components/Dialogs/UpdateMultiple'
import Excel from './../components/Datatable/Actions/Excel'
import PDF from './../components/Datatable/Actions/PDF'
import Copy from './../components/Datatable/Actions/Copy'

export default {
    created(){
        this.$store.commit('api/setResourceURL', this.$store.getters['users/getResourceURL'])
        this.$store.commit('datatable/setColumns', this.$store.getters['users/getColumns'])
    },

    components: {
        Datatable,
        Update,
        UpdateMultiple,
        Excel,
        PDF,
        Copy
    }
}
</script>
