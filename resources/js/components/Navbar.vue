<template>
	<v-toolbar dark fixed app>
        <v-toolbar-side-icon @click.stop="$store.dispatch('ui/toggleDrawer')"></v-toolbar-side-icon>
        <v-toolbar-title>EETT Halted Cell Status Handler</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="$store.dispatch('auth/logout')">
            <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
	export default { }
</script>