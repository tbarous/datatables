<template>
	<v-layout>
        <v-flex xs3 offset-xs9>
            <v-text-field 
                class="generalSearch"
                @input="fetchData(true)" 
                v-model="generalSearch"
                solo 
                prepend-inner-icon="search" 
                autocomplete="off" 
                clearable 
                label="Search"
            >
            </v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
	export default{
		
	}
</script>