<template>
  <div class="bg1">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-4 is-3-fullhd">
          <section class="section">
            <h1 class="has-text-centered is-size-3">Login</h1>
            <br />
            <a class="button is-facebook is-fullwidth is-medium">
              <b-icon icon="facebook"></b-icon>
              <span>Masuk dengan facebook</span>
            </a>
            <br />
            <div class="is-divider" data-content="OR"></div>
            <form class="form" @submit="login()">
              <b-field>
                <b-input
                  placeholder="Username"
                  v-model="email"
                  type="email"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>

              <b-field>
                <b-input
                  placeholder="Password"
                  v-model="password"
                  type="password"
                  size="is-medium"
                  required
                  password-reveal
                ></b-input>
              </b-field>

              <b-field class="has-text-right">
                <router-link to="/reset-password">Lupa Password ?</router-link>
              </b-field>

              <b-field>
                <b-button
                  class="is-fullwidth"
                  type="is-secondary"
                  size="is-medium"
                  @click.prevent="login()"
                >Login</b-button>
              </b-field>
            </form>
            <div class="is-divider"></div>
            <p class="has-text-centered">
              Belum punya akun?
              <router-link to="/register">Daftar</router-link>
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      email: 'sanjaya.kiran@gmail.com',
      password: 'TddklS9g',
      isFullPage: true,
    }
  },
  mounted () {
    console.log(this.$route.path)
  },
  methods: {
    login () {
      let dataLogin = {
        user: this.email,
        pass: this.password
      }


      this.axios.post('/url/member/login', dataLogin)
        .then((res) => {

          this.$buefy.toast.open({
            duration: 1000,
            message: 'Login Berhasil',
            position: 'is-top',
          })
          this.$store.dispatch("login/login", res.data.token)
            .then(res => {
              this.$router.push('/');
            })
        })
    }
  }
}
</script>
<style>
section {
  position: relative;
  top: 10%;
}
@media only screen and (max-width: 780px) {
  section {
    position: relative;
    top: 0 !important;
    padding-top: 1rem !important;
  }
}
</style>

