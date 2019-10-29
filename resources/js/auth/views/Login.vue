<template>
  <v-app id="inspire" v-cloak>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="dark">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form method="post" @submit.prevent="onSubmit" @input="form.errors.clear($event.target.name)">
                  <v-text-field autocomplete="off" v-model="form.username" prepend-icon="person" name="username" label="Login" type="text"></v-text-field>
                  <span class="help is-danger" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>

                  <v-text-field autocomplete="off" v-model="form.password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                  <span class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="form.errors.any()" type="submit" color="primary">Login</v-btn>
                  </v-card-actions>
                </form>
              </v-card-text>
              
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
  import Form from './../core/Form'

  export default {
    name: 'Login',
    components: {
      Loading
    },
    data: () => ({
      drawer: null,
      loading: false,
      username: '',
      password: '',
      form: new Form({
            username: '',
            password: ''
        })
    }),
    props: {
      source: String
    },
    methods: {
      // login(){
        // this.loading = true
        // let data = {'username' : this.username, 'password': this.password};
        // console.log(window.login)
        // axios.post(window.login, data)
        // .then(response => {
        //   // this.loading = false
        //   window.location.replace('/eett/overview');
        // })
        // .catch(error => {
        //   alert('error')
        //   this.loading = false
        //   // window.location.replace('/eett/overview');
        // }),
        onSubmit() {
            this.loading = true
            this.form.post(window.login)
                .then(response => {
                  window.location.replace('/eett/overview');
                })
                .catch(error => {
                    this.loading = false
                });
        // }
      }
    }
  }
</script>