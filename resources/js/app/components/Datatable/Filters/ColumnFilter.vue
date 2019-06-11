<template>
	<v-menu offset-y class="d-inline-block" style="position: absolute;top: 0;left: 5px;margin: 0">
        <template v-slot:activator="{ on }">
            <v-btn style="width: 5px;height: 5px;color:#fff" class="d-inline-block" icon small flat fab v-on="on">
                <v-icon  small flat>fa fa-filter</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-tile v-for="(item, index) in [1,2,3]" :key="index" @click="">
                <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
	export default {
		
	}
</script>