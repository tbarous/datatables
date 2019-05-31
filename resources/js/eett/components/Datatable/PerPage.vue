<template>
	<v-flex xs6 class="d-flex align-center">
                <div class="items-show">
                    <span>Show</span>
                    <v-select 
                        :items="itemsShow" 
                        label="Show" 
                        solo 
                        v-model="perPage" 
                        @change="fetchData(true)"
                    >
                    </v-select>
                    <span>entries</span>
                </div>
            </v-flex>
</template>

<script>
	export default{
		
	}
</script>