<template>
    <v-dialog v-model="dialog.viewColumns" width="500">
            <v-card>
                <v-card-title 
                    class="headline grey lighten-2" 
                    primary-title
                >
                    Columns
                </v-card-title>
                <v-card-text class="d-flex" style="flex-flow: wrap;">
                    <v-checkbox 
                        class="d-inline-block ml-3" 
                        v-for="(column,key) in columns" 
                        :key="column.title" 
                        v-model="activeColumns[column.title]" 
                        :label="column.title | columnLow" 
                        color="black"
                    >
                    </v-checkbox>
                    <v-btn dark class="w-100 ml-0 mr-0" @click="closeDialog('viewColumns')">Ok</v-btn>
                </v-card-text>
                
                <v-btn @click="closeDialog('viewColumns')" class="close-window" flat icon>
                    <v-icon small>fa fa-times</v-icon>
                </v-btn>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        
    }
</script>