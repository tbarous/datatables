<template>
  <v-app id="inspire" v-cloak>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.prevent="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <loading :active.sync="loading" :is-full-page="true"></loading>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Loading from 'vue-loading-overlay'

  export default {
    components: {
      Loading
    },
    data: () => ({
      drawer: null,
      loading: false,
      username: '',
      password: ''
    }),
    props: {
      source: String
    },
    methods: {
      login(){
        this.loading = true
        let data = {'username' : this.username, 'password': this.password};
        console.log(window.login)
        axios.post(window.login, data)
        .then(response => {
          // this.loading = false
          window.location.replace('/eett/overview');
        })
        .catch(error => {
          alert('error')
          this.loading = false
          // window.location.replace('/eett/overview');
        })
      }
    }
  }
</script>