<template>
	<tr class="bg-dark text-white">
                        <th width="5%" class="pt-3"></th>
                        <th width="5%" class="pt-3"></th>
                        <th 
                            v-if="activeColumns[column.title]" 
                            v-for="column in columns" 
                            :key="column.title" 
                            @click="sortByColumn(column)"
                            class="table-header">
                            {{ column.title | columnHead }}
                            <span v-if="column.title === sortedColumn">
                                <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                                <i v-else class="fas fa-chevron-down"></i>
                            </span>
                        </th>
                        <th width="10%" class="pt-3"></th>
                    </tr>
</template>

<script>
	
</script>