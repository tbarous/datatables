<template>
	<!-- double-scroll -->
	<div class="wrapper" style="overflow: auto!important">
        <table id="table" class="m-0 pt-0 table table-bordered elevation-3" data-tableName="Test Table 2" v-scroll>
            <thead>
                <headers></headers>
                <column-search></column-search>
            </thead>
            <tbody>
                <no-data></no-data>
                <table-body></table-body>
            </tbody>
        </table>
    </div>
</template>

<script>
	import Headers from './Headers'
	import ColumnSearch from './../Filters/ColumnSearch'
	import NoData from './../Info/NoData'
	import TableBody from './TableBody'
	
	export default {
		components: { Headers, ColumnSearch, NoData, TableBody }
	}
</script>