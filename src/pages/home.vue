<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <img
            style="display: block; margin: 0 auto;"
            src="@/assets/img/logo.png"
            width="450"
            fluid
            center
          />
          <div class="buyorsell has-text-centered">
            <a class="active is-size-4">Beli</a>
            <div class="divider"></div>
            <a class="is-size-4">Jual</a>
          </div>
          <br />
          <b-field grouped>
            <b-input placeholder="Search..." v-model="searchForm.city" expanded></b-input>
            <p class="control">
              <b-button type="is-primary" @click="listing()">Search</b-button>
            </p>
          </b-field>
          <b-field grouped>
            <b-select v-model="searchForm.category">
              <option
                v-for="category in categoryList"
                :value="category.id"
                :key="category.id"
              >{{ category.name }}</option>
            </b-select>
            <b-select v-model="searchForm.price">
              <option v-for="price in priceList" :value="price.id" :key="price.id">{{ price.name }}</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="row">
        <div class="bg2 section is-vcentered" style="height: 200px">
          <p
            class="is-size-3 has-text-centered has-text-grey-light"
            style="padding-top: 50px"
          >Embeded Virtual Tour</p>
        </div>
      </div>
      <div class="row">
        <!-- Content -->
        <div class="content-title">
          <p
            class="has-text-primary is-size-5 title"
          >Rekomendasi Kami Untuk Anda</p>
          <p class="subtitle is-size-7">Properti pilihan yang sayang jika Anda lewatkan.</p>
        </div>
        <carousel
          :per-page-custom="[[0, 1],[320, 1],[768, 2], [1024, 4]]"
          mouse-drag
          navigation-enabled
          :pagination-enabled="false"
        >
          <slide class="padding-slide" v-for="slide in recomended" :key="slide.id">
            <div class="card" @click="seeDetail()">
              <div class="card-image">
                <b-tag type="is-primary" class="cardlabel">{{slide.type}}</b-tag>
                <figure class="image is-4by3">
                  <img :src="slide.img" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-6 is-size-6-mobile">{{slide.name}}</p>
                  </div>
                  <div class="media-right">
                    <b-icon icon="heart"></b-icon>
                  </div>
                </div>

                <div class="content">
                  <p class="has-text-grey">{{slide.cluster+', '+slide.city}}</p>
                  <p class="title is-6"><vue-numeric decimal-separator="." currency="Rp" separator="." readOnly :value="slide.price" /></p>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
      <!-- Content -->
      <div class="row">
        <div class="content-title">
          <p class="has-text-primary is-size-5 title">Properti Di Kota Dan Provinsi Di Indonesia</p>
        </div>
        <div class="card">
          <div class="section">
            <div class="columns">
              <div class="column is-6">
                <b-field label="Pilih Kota atau Provinsi">
                  <b-field grouped>
                    <b-autocomplete
                      expanded
                      v-model="name"
                      placeholder="e.g. Medan"
                      @select="option => selected = option"
                    ></b-autocomplete>
                    <p class="control">
                      <b-button type="is-primary">Search</b-button>
                    </p>
                  </b-field>
                  <template slot="empty">No results for</template>
                </b-field>
                <b-field label="Kota Terpopuler" class="has-text-grey-light">
                  <div class="buttons">
                    <span class="button" @click="listing()">Medan</span>
                    <span class="button" @click="listing()">Jakarta Selatan</span>
                    <span class="button" @click="listing()">Surabaya</span>
                    <span class="button" @click="listing()">Palembang</span>
                    <span class="button" @click="listing()">Yogyakarta</span>
                    <span class="button" @click="listing()">Solo</span>
                    <span class="button" @click="listing()">Makasar</span>
                    <span class="button" @click="listing()">Padang</span>
                  </div>
                </b-field>
              </div>
              <div class="column is-6">
                <div class="bg2 is-vcentered" style="height: 200px">
                  <!-- Map Canvas -->
                  <div class="mapouter">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import VueNumeric from 'vue-numeric'
export default {
  components: {
    Carousel,
    Slide,
    VueNumeric
  },
  data () {
    return {
      categoryList: [
        { id: "", name: "Semua" },
        { id: 'rumah', name: "Rumah" },
        { id: 'villa', name: "Ruko" },
        { id: 'apartment', name: "Apartment" }
      ],
      priceList: [
        { id: "", name: "Semua Harga" },
        { id: 2, name: "100jt-500jt" },
        { id: 3, name: "800jt-1m" }
      ],
      searchForm: {
        name: "",
        type: "",
        category: "",
        price: ""
      },
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
      ],
      recomended: []
    };
  },
  methods: {
    seeDetail () {
      this.$router.push("/listing/detail");
    },
    listing () {
      this.$router.push({
        path: "/listing", 
        query: {
          city: this.searchForm.city,
          category: this.searchForm.category
        }
      });
    },
    getRecomendation () {
      let requestData = {
        "category": "",
        "city": "",
        "type": "",
        "limit": "30",
        "offset": "",
        "order": "0"
      }
      this.axios.post('/url/product/get_recommended', requestData)
      .then(res => {
        this.recomended = res.data.content
      })
    }
  },
  created() {
    this.getRecomendation()
  }
};
</script>
<style lang="scss">
@import "../assets/css/style.scss";

.buyorsell {
  display: inline-flex;
}
.buyorsell a {
  color: #b1b1b1;
}
.buyorsell a:active,
.buyorsell a:hover {
  color: $primary;
}
.buyorsell .divider {
  width: 2px;
  margin: 6px 15px;
  background: gainsboro;
}
.padding-slide {
  padding: 5px;
}
.media:not(:last-child) {
  padding-bottom: 0.5rem !important;
}
</style>