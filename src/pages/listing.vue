<template>
  <div class="bg2">
    <div class="bg4 section fixed">
      <div class="container is-fluid">
        <div class="columns is-vcentered">
          <div class="column is-10">
            <b-field grouped>
              <b-input placeholder="Masukkan Daerah, Kota atau Property" expanded></b-input>
              <b-select placeholder="Select a category">
                <option value="1">Rumah</option>
                <option value="2">Ruko</option>
              </b-select>
              <b-select placeholder="Select a price">
                <option value="1">Semua Harga</option>
              </b-select>

              <p class="control">
                <b-button type="is-primary">Search</b-button>
              </p>
            </b-field>
          </div>
          <div class="column is-2 has-text-right">
            <b-field>
              <b-switch v-model="mapView">Show Map</b-switch>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="row section listing">
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <div class="container is-fluid">
        
        <!-- <div class="columns is-vcentered is-multiline">
          <div class="column">
            <p class="has-text-primary is-size-5 title">18 Properti Di Kota Medan Ditemukan</p>
            <b-field>
              <b-select placeholder="Urutkan">
                <option value="1">Termurah</option>
                <option value="2">Terdekat</option>
                <option value="3">Terlaris</option>
              </b-select>
            </b-field>
          </div>
          <div class="column has-text-right">
            <b-field label="Show Map">
              <b-switch v-model="mapView"></b-switch>
            </b-field>
          </div>
        </div>-->

        <template v-if="!mapView">
          <br />
          <p class="has-text-primary is-size-5 title">{{record}} Properti Ditemukan Untuk Anda</p>
          <div class="columns is-multiline">
            <div class="column is-3" v-for="slide in dataList" :key="slide.id">
              <div class="card" @click="seeDetail()">
                <div class="card-image">
                  <b-tag type="is-primary" class="cardlabel">{{slide.type}}</b-tag>
                  <figure class="image is-4by3">
                    <img :src="slide.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-6 is-size-6-mobile">{{((slide.name).toUpperCase())}}</p>
                    </div>
                    <div class="media-right">
                      <b-icon icon="heart"></b-icon>
                    </div>
                  </div>

                  <div class="content">
                    <p class="has-text-grey">{{slide.cluster+", " +slide.city}}</p>
                    <p class="title is-6">
                      <vue-numeric
                        decimal-separator="."
                        currency="Rp"
                        separator="."
                        :readOnly="true"
                        :value="slide.price"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <!-- Pagination -->
          <nav class="level is-mobile">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <p class="has-text-grey">Hal {{(offset/limit)+1}} dari {{Math.round(record/limit)}}</p>
              </div>
            </div>
            <!-- Right side -->
            <div class="level-right">
              <div class="level-item buttons">
                <button
                  class="button"
                  :disabled="(offset/limit) === 0"
                  @click.prevent="prev"
                >Previous</button>
                <button
                  class="button"
                  :disabled="(offset/limit)+1 >= (record/limit)"
                  @click.prevent="next"
                >Next page</button>
              </div>
            </div>
          </nav>
        </template>
        <!-- Map View -->
        <template v-else>
          <div class="columns">
            <div class="column is-5" style="overflow-y: auto">
              <br />
              <p class="has-text-primary is-size-5 title">{{record}} Properti Ditemukan Untuk Anda</p>

              <div class="columns is-multiline">
                <div class="column is-12" v-for="slide in dataList" :key="slide.id">
                  <div class="card" @click="seeDetail()">
                    <div class="card-content">
                      <div class="columns is-multiline">
                        <div class="column is-3 is-paddingless">
                          <img class="imgList" :src="slide.image" alt="Placeholder image" />
                        </div>
                        <div class="column">
                          <p class="title is-6 is-size-6-mobile">{{((slide.name).toUpperCase())}}</p>
                          <p class="subtitle is-6 has-text-grey">
                            <small>{{slide.cluster+", " +slide.city}}</small>
                          </p>
                          <p class="title is-6">
                            <vue-numeric
                              decimal-separator="."
                              currency="Rp"
                              separator="."
                              readonly
                              :value="slide.price"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-7">
              <div class="fixed map">
                <!-- Map Canvas -->
                <!-- <div class="mapouter">
                  <div class="gmap_canvas">
                    <iframe
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=Halton%20Place&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    ></iframe>
                  </div>
                </div>-->
                <google-map name="example"></google-map>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import GoogleMapsLoader from "google-maps";
import googleMap from "../component/Maps.vue";
import VueNumeric from "vue-numeric";

export default {
  components: { googleMap, VueNumeric },
  data() {
    return {
      mapView: false,
      isLoading: false,
      dataList: [],
      record: 0,
      offset: 0,
      limit: 10,
      slides: [
        {
          id: 1,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 2,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 3,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 4,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 5,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 6,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 7,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 8,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 9,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 10,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 11,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 12,
          title: "Dijual Rumah di Komplek Murni Residence",
          address: "Jalan Gaharu gg murni no. 8cc Medan, Indonesia",
          price: "Rp 500.000.000",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        }
      ]
    };
  },
  methods: {
    seeDetail() {
      this.$router.push("/listing/detail");
    },
    next() {
      this.offset += this.limit;
      this.getData();
    },
    prev() {
      this.offset -= this.limit;
      this.getData();
    },
    getData() {
      this.isLoading = true;
      let requestData = {};
      if (this.$route.query) requestData = this.$route.query;
      requestData.offset = this.offset;
      requestData.limit = this.limit;
      this.axios
        .post(
          "http://administrator.propertybersama.com/product/get",
          requestData
        )
        .then(res => {
          this.isLoading = false;
          this.dataList = res.data.content;
          this.record = res.data.record;
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.fixed {
  z-index: 3;
  position: fixed;
  display: block;
  height: auto;
  width: 100%;
  /* right: 0px;
  top: 0px; */
  touch-action: pan-x pan-y;
  /* background-color: aquamarine; */
}
.listing {
  padding-top: 4.3rem;
}
.imgList {
  min-height: 100%;
  height: auto;
  max-width: 100%;
}
.map {
  background-color: rgb(165, 165, 165);
  height: 85vh;
  max-height: 100vh;
  width: 57.2% !important;
  overflow-x: auto;
}
</style>