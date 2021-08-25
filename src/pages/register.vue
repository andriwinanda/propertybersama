<template>
  <div class="bg1">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-two-fifths">
          <section class="section">
          <h1 class="has-text-centered is-size-3">Daftar Akun Baru</h1>
          <p class="has-text-centered has-text-grey">Now, let's get you started by creating an account.</p>
          <br>
          
          <a class="button is-facebook is-fullwidth is-medium">
            <b-icon icon="facebook"></b-icon>
            <span>Daftar dengan facebook</span>
          </a>

          <div class="is-divider" data-content="OR"></div>

          <form class="form" @submit="register">
            <b-field>
              <b-input placeholder="Nama Lengkap"
                v-model="nama_lengkap"
                type="text"
                size="is-medium"
                autofocus
                required
                >
              </b-input>
            </b-field>

            <b-field>
              <b-input placeholder="Email"
                v-model="email"
                type="email"
                size="is-medium"
                required
                >
              </b-input>
            </b-field>

            <b-field>
              <b-input placeholder="Password"
                v-model="password"
                type="password"
                size="is-medium"
                required
                password-reveal>
              </b-input>
            </b-field>

            <b-field>
              <button class="button is-secondary is-fullwidth is-medium">Daftar</button>
            </b-field>
          </form> <br>
          <p class="has-text-centered has-text-grey  is-size-7">Dengan mendaftarkan diri, anda menyetujui <a href="">Syarat Penggunaan</a>  dan <a href="">Kebijakan Privasi</a> kami.</p>
     
          <div class="is-divider"></div>
          
          <p class="has-text-centered" >Sudah punya akun? <router-link to="/login">Login</router-link></p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   data() {
     return {
       nama_lengkap: '',
       email: '',
       password: ''
     }
   },
   methods: {
     register(event){
       event.preventDefault()
       this.$toast.open({
          message: 'Akun berhasil dibuat',
          position: is-bottom,
          queue: false
      })
     }
   }
}
</script>
<style>
 section{
  position: relative;
  top: 10%;
}
@media only screen and (max-width: 780px) {
  section{
    position: relative;
    top: 0 !important;
    padding-top: 1rem !important
  }
}
</style>

