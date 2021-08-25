<template>
  <div>
    <section class="section bg2">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-12">
            <div class="box edit">
              <p class="title is-4">Request Jasa {{layanan}}</p>
              <div class="is-divider"></div>
              <form @submit="request" class="form">
                <div class="columns is-centered">
                  <div class="column is-6">

                    <!-- Luas -->
                    <b-field label="Luas yang dikerjakan">
                      <div class="field columns">
                        <div class="control column is-6">
                            <b-input v-model="panjang" type="text" placeholder="Panjang (cm)"></b-input>
                        </div>
                        <div class="control column is-6">
                            <b-input v-model="lebar" type="text" placeholder="Lebar (cm)"></b-input>
                        </div>
                      </div>
                    </b-field>

                    <!-- Tanggal Pekerjaan -->
                    <b-field label="Kapan Anda Membutuhkan Pekerjaan ini">
                      <b-datepicker
                          placeholder="Click to select..."
                          v-model="date"
                          :min-date="minDate">
                      </b-datepicker>
                    </b-field>

                    <!-- Deskripsi Pekerjaan  -->
                    <b-field label="Deskripsi Pekerjaan">
                      <b-input v-model="alamat" maxlength="200" type="textarea"></b-input>
                    </b-field>

                    <!-- Upload Gambar  -->
                    <b-field label="Upload gambar untuk membantu kami memahaminya">
                      <div class="columns is-multiline">
                        <div class="column is-6">
                          <b-upload v-model="dropFiles"
                            accept="image/*"
                            multiple
                            drag-drop>
                            <section class="section">
                              <div class="content has-text-centered upload-img">
                                <p>
                                  <b-icon
                                    icon="upload"
                                    size="is-large">
                                  </b-icon>
                                </p>
                                <p>Drop your image here or click to upload</p>
                              </div>
                            </section>
                          </b-upload>
                        </div>
                        <div class="column is-6">
                          <div class="tags">
                            <span v-for="(file, index) in dropFiles"
                                :key="index"
                                class="tag is-primary" >
                                <img class="image" :src="file_url" />
                                {{file.name}}
                                <button class="delete is-small"
                                    type="button"
                                    @click="deleteDropFile(index)">
                                </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </b-field>
                    <hr>
                  </div>
                  <div class="column is-6">
                    
                      <!-- Nama Lengkap -->
                      <b-field label="Nama Penanggung Jawab">
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
                      <button class="button is-primary is-fullwidth is-medium" type="submit">Pesan Layanan</button>
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
    const today = new Date()
    return {
      dropFiles: [],
      file_url: null,
      file_name: '',
      layanan: '',
      panjang: '',
      lebar: '', 
      nama_lengkap: '',
      email: '',
      no_hp: '',
      alamat: '',
      date : null,
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    }
  },
  methods: {
    previewFiles () {
      console.log(this.dropFiles)
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    request() {
      event.preventDefault()
    }
  },
  created() {
      this.layanan = this.$route.params.layanan
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
  .upload-img{
    display: block !important;
  }
  .card{
    width: 80px;
  }
  @media only screen and (max-width: 780px) {
    .edit{
      padding: 1.5rem 1rem !important;
    }
  }
</style>

