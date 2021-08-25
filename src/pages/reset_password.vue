<template>
<div class="bg1">
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <section class="section">
        <h1 class="has-text-centered is-size-3">Reset Password</h1>
        <p class="has-text-centered has-text-grey">Kami akan mengirimkan link untuk mengembalikan akun Anda melalui email.</p>
        <br>
        <form class="form" @submit="reset">
          <b-field>
            <b-input placeholder="Email yang terdaftar"
              v-model="email"
              type="email"
              size="is-medium"
              required
              >
            </b-input>
          </b-field>

          <b-field>
            <button class="button is-secondary is-fullwidth is-medium">Reset Password</button>
          </b-field>
        </form>
        <div class="is-divider"></div>
        <p class="has-text-centered" >Kembali ke halaman <router-link to="/login">Login</router-link></p>
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
      email: ''
    }
  },
  methods: {
    reset(event){
      event.preventDefault()
      this.$toast.open({
          message: 'Berhasil dikirim, silahkan cek email Anda',
          queue: false,
          position: is-bottom
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


