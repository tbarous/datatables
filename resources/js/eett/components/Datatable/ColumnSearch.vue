<template>
	<tr>
        <th></th>
        <th>
            <v-checkbox class="toggleAll mt-0" @click.self="toggleAll" :value="selectAll"></v-checkbox>
        </th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title">
            <v-text-field clearable style="min-width: 100px;" @input="fetchData(true)" :value="queries[column.title]" v-if="column.type=='text'" solo autocomplete="off" prepend-inner-icon="search"></v-text-field>
            <input type="text" name="datefilter" autocomplete="off" :id="column.title" v-if="column.type=='date'" v-model="queries[column.title]" class="date-range-picker elevation-2">
        </th>
        <th></th>
    </tr>
</template>

<script>
    import { mapGetters } from 'vuex'

	export default{
		computed: {
            ...mapGetters("datatable", {
                selectAll: 'getSelectAll',
                columns: 'getColumns',
                activeColumns: 'getActiveColumns',
                queries: 'getQueries'
            })
        }
	}
</script>