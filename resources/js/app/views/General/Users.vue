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
    export default {
        created(){this.setDatatable('user')}
    }
</script>
