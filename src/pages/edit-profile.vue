<template>
  <div>
    <section class="section bg2">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-12">
            <div class="box edit">
              <p class="title is-4">Detail Akun</p>
              <div class="is-divider"></div>

              <form @submit="editProfile">
                <div class="columns is-centered">
                  <div class="column is-3">
                    <!-- Upload Image-->
                    <div class="box img-preview is-centered" >
                      <img class="image" :src="file_url?file_url:'https://www.sejasa.com/assets/icons/profile_pic-9f51819994c099de0ac9fee7b3f9bb341d7181d5af9eb33ec4fc7fc98b9bbb95.png'" />
                    </div>
                    <div class="field">
                      <div class="file is-primary is-centered">
                        <label class="file-label">
                          <input type="file"
                            accept="image/*"
                            id="file"
                            ref="myFiles"
                            class="file-input"
                            @change="previewFiles">
                          <span class="file-cta">
                            <span class="file-icon">
                              <b-icon icon="upload"></b-icon>
                            </span>
                            <span class="file-label">
                              Upload Image
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <br>
                  </div>
                  
                  <div class="column is-5">

                    <!-- Nama Lengkap -->
                    <b-field label="Nama Lengkap">
                      <b-input v-model="nama_lengkap" type="text"></b-input>
                    </b-field>

                    <!-- Email -->
                    <b-field label="Email">
                      <b-input v-model="email" type="email">
                      </b-input>
                    </b-field>

                    <!-- No Hp -->
                    <b-field label="Handphone">
                      <b-input v-model="no_hp" type="text" placeholder="+628xx..">
                      </b-input>
                    </b-field>

                    <!-- Alamat  -->
                    <b-field label="Alamat">
                      <b-input v-model="alamat" maxlength="200" type="textarea"></b-input>
                    </b-field>
                    <button class="button is-primary is-fullwidth" type="submit">Simpan</button>
                  </div>
                </div>
              </form>
                
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
      file: [],
      file_url: null,
      file_name: '',
      nama_lengkap: '',
      email: '',
      no_hp: '',
      alamat: ''

    }
  },
  methods:{
    previewFiles () {
      this.files = this.$refs.myFiles.files
      let image = this.files[0]
      this.file_name = image.name
      this.file_url = URL.createObjectURL(image)
    },
    editProfile(){
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
  .img-preview{
    width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .box{
    box-shadow: 2px 3px 5px rgba(10, 10, 10, 0.2)!important;
  }
  @media only screen and (max-width: 768px) {
    .edit{
      padding: 2rem 1rem;
    }
  }

</style>

