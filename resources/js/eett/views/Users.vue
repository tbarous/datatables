<template>
    <div>
        <excel></excel>
        <PDF></PDF>
        <copy></copy>
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
    },

    components: {
        Datatable, Excel, PDF, Copy, Update, UpdateMultiple, Columns
    }
}
</script>
