<template>
	<v-toolbar dark fixed app>
        <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>EETT Halted Cell Status Handler</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
            <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
	export default {
		methods: {
			toggleDrawer(){
				this.$store.commit('ui/TOGGLE_DRAWER')
			},
			logout(){
				this.$store.commit('ui/START_LOADING')
				this.$store.dispatch('auth/LOGOUT')
			}
		}
	}
</script>