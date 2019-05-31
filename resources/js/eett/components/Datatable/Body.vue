<template>
	<tr 
        v-for="(data, key1) in tableData" 
        :key="data.id" 
        class="m-datatable__row" 
        v-else
    >
        <td width="5%">{{serialNumber(key1)}}</td>
        <td width="5%">
            <v-checkbox 
                v-model="selectBoxes[data.id]" 
                color="black" 
                @change="select(data)"
            >
            </v-checkbox>
        </td>
        <td 
            v-if="activeColumns[key]" 
            v-for="(value, key) in data"
        >
            {{value}}
        </td>
        <td width="10%" style="white-space: nowrap">
            <v-btn 
                flat 
                @click="setEditDialog(key1, data)" 
                fab 
                dark 
                small 
                color="info"
            >
                <v-icon dark>
                    edit
                </v-icon>
            </v-btn>

            <v-btn
                @click="destroy(editingRow, data)"
                flat 
                fab 
                dark 
                small 
                color="red"
            >
                <v-icon dark>delete</v-icon>
            </v-btn>
        </td>
    </tr>
</template>

<script>
	export default{
		
	}
</script>