<template>
	<v-btn 
            class="to-top" 
            v-if="top" 
            small 
            fab 
            dark 
            @click="$store.dispatch('ui/toTop')" 
            color="grey"
        >
            <v-icon small>fa fa-chevron-up</v-icon>
        </v-btn>
</template>

<script>
	export default {
		computed: {
            top() {
                return this.$store.getters['ui/getTop']
            }
        }
	}
</script>