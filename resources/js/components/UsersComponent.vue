<template>
    <div>
        <v-data-table :headers="headers" :items="users">
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.role }}</td>
                <td class="text-xs-left">{{ props.item.permissions }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    let users = data;

    console.log(users);

    export default {
        data() {
            return {
                snack: false,
                snackColor: '',
                snackText: '',
                max25chars: v => v.length <= 25 || 'Input too long!',
                pagination: {},
                headers: [
                    {text: 'Name', value: 'name'},
                    {text: 'Role', value: 'calories'},
                    {text: 'Permissions', value: 'fat'}
                ],
                users: users
            }
        },

        methods: {

        }
    }
</script>