<template>
	<div>
		<file title="File" url="/storage/invoices.xlsx"></file>
        <excel title="Excel" url="/storage/invoices.xlsx"></excel>
        <PDF></PDF>
        <copy></copy>
        <v-divider></v-divider>
        <add></add>
        <update></update>
        <update-multiple></update-multiple>
        <columns></columns>
        <v-divider></v-divider>
		<datatable></datatable>
	</div>
</template>

<script>
    export default {
        created(){
            this.setDatatable('cells')
        }
    }
</script>