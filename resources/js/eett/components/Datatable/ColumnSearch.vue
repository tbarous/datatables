<template>
	<tr class="bg-dark text-white">
                        <th width="5%"></th>
                        <th width="5%">
                            <v-checkbox class="toggleAll mt-0" color="white" @click.self="toggleAll" v-model="selectAll"></v-checkbox>
                        </th>
                        <th 
                            class="pt-0 pb-0" 
                            v-if="activeColumns[column.title]" 
                            v-for="column in columns" 
                            :key="column.title">
                            <v-text-field 
                                clearable 
                                style="min-width: 100px;"
                                @input="fetchData(true)" 
                                v-model="queries[column.title]" 
                                v-if="column.type=='text'" 
                                solo 
                                autocomplete="off" 
                                name="name" 
                                label="" 
                                prepend-inner-icon="search">
                            </v-text-field>

                            <input type="text" 
                                name="datefilter"
                                autocomplete="off" 
                                :id="column.title"
                                v-if="column.type=='date'" 
                                v-model="queries[column.title]" 
                                class="date-range-picker elevation-2"
                            >
                        </th>
                        <th width="10%"></th>
                    </tr>
                </thead>
</template>

<script>
	export default{
		
	}
</script>