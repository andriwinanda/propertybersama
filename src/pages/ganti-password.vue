<template>
  <div>
    <section class="section bg2">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-12">
            <div class="box edit">
              <p class="title is-4">Ganti Password</p>
              <div class="is-divider"></div>
              <div class="columns is-centered">
                <div class="column is-4">
                  <form @submit="gantiPassword" class="form">

                    <!-- Recent Password -->
                    <b-field label="Password Saat Ini">
                      <b-input v-model="recentPassword" type="password"></b-input>
                    </b-field>

                    <!-- New Password -->
                    <b-field label="Password Baru">
                      <b-input v-model="newPassword" type="password">
                      </b-input>
                    </b-field>

                    <!-- Confirm Password -->
                    <b-field label="Konfirmasi Password Baru">
                      <b-input v-model="confirmPassword" type="password">
                      </b-input>
                    </b-field>

                    <button class="button is-primary is-fullwidth" type="submit">Simpan</button>

                  </form>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    gantiPassword() {

    }
  }

}
</script>


<style scoped>
  .edit{
    padding: 3rem 5rem;
  }
  section{
    padding: 1rem;
  }
  @media only screen and (max-width: 780px) {
    .edit{
      padding: 1.5rem 1rem !important;
    }
  }

</style>

