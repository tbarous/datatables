<template>
    <div>
        <v-layout>
            <excel></excel>
            <PDF></PDF>
            <copy></copy>
        </v-layout>
        <v-divider></v-divider>
        <datatable></datatable>
        <update></update>
        <update-multiple></update-multiple>
        <columns></columns>
    </div>
</template>

<script>
import Datatable from '../components/Datatable/Datatable'
import Update from './../components/Dialogs/Update'
import UpdateMultiple from './../components/Dialogs/UpdateMultiple'
import Excel from './../components/Datatable/Actions/Excel'
import PDF from './../components/Datatable/Actions/PDF'
import Copy from './../components/Datatable/Actions/Copy'
import Columns from './../components/Dialogs/Columns'

export default {
    created(){
        this.$store.commit('datatable/SET_DATATABLE', this.$store.getters['user/GET_DATATABLE'])

        // const url = this.$store.getters['user/getResourceURL']
        // this.$store.commit('datatable/setResourceURL', url)
        // this.$store.commit('datatable/setColumns', this.$store.getters['user/getColumns'])
    },

    components: {
        Datatable,
        Excel,
        PDF,
        Copy,
        Update,
        UpdateMultiple,
        Columns
    }
}
</script>
