<template>
	        <v-layout class="table-tools">
            <v-flex xs2>
                <v-btn color="blue" dark @click="fetchData(true)">
                    Reload 
                    <v-icon small>fas fa-sync</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs2>
                <v-btn color="yellow" @click="clearFilters">
                    Clear 
                    <v-icon small>fas fa-eraser</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs2>
                <v-btn color="secondary" dark @click="openDialog('viewColumns')">
                    Columns 
                    <v-icon small>fas fa-columns</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs2>
                <v-btn 
                    :disabled="selected.length<2"
                    color="secondary" 
                    dark 
                    @click="openDialog('editMultiple')"
                >
                    Update 
                    <v-icon small>fas fa-edit</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
</template>

<script>
	export default{
		
	}
</script>