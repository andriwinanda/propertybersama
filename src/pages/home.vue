<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <img
            style="display: block; margin: 0 auto;"
            src="@/assets/img/logo.jpg"
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
            <b-autocomplete
              expanded
              v-model="searchType"
              placeholder="Masukan Kota"
              :data="filteredDataObj"
              field="nama"
              @select="option => searchForm.city = option.id"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
            <p class="control">
              <b-button type="is-primary" @click="listing()">Search</b-button>
            </p>
          </b-field>
          <b-field grouped group-multiline>
            <b-select v-model="searchForm.category" placeholder="Category">
              <option value>Semua Kategori</option>
              <option
                v-for="category in categoryList"
                :value="category.id"
                :key="category.id"
              >{{ capitalize(category.name) }}</option>
            </b-select>
            <b-select v-model="searchForm.room" placeholder="Kamar Tidur">
              <option value>Semua Kamar Tidur</option>
              <option value="1">1 Kamar</option>
              <option value="2">2 Kamar</option>
              <option value="3">3 Kamar</option>
              <option value="4">4 Kamar</option>
              <option value="5">5 Kamar</option>
              <option value="6">6+ Kamar</option>
            </b-select>

            <!-- <b-select v-model="searchForm.price">
              <option v-for="price in priceList" :value="price.id" :key="price.id">{{ price.name }}</option>
            </b-select>-->
            <b-dropdown aria-role="list">
              <button class="button" type="button" slot="trigger">
                <span v-if="lockMinMax">Semua Harga</span>
                <span v-else>Rp {{searchForm.start_price +" - "+searchForm.end_price}}</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
                <br />
                <b-field horizontal label="Min" class="rangePrice">
                  <b-input
                    placeholder="Min"
                    :disabled="lockMinMax"
                    v-model="searchForm.start_price"
                    type="number"
                  ></b-input>
                </b-field>
                <b-field horizontal label="Max" class="rangePrice">
                  <b-input
                    placeholder="Max"
                    :disabled="lockMinMax"
                    v-model="searchForm.end_price"
                    type="number"
                  ></b-input>
                </b-field>
                <b-field>
                  <b-checkbox
                    :true-value="true"
                    :false-value="false"
                    v-model="lockMinMax"
                  >Semua Harga</b-checkbox>
                </b-field>
              </b-dropdown-item>
            </b-dropdown>
          </b-field>
        </div>
      </div>
      <div class="row">
        <div class="bg2">
          <!-- <p
            class="is-size-3 has-text-centered has-text-grey-light"
            style="padding-top: 50px"
          >Embeded Virtual Tour</p>-->
          <video autoplay loop>
            <source
              src="https://creatives-assets.s3-ap-southeast-1.amazonaws.com/regional/Rumah/Desktop.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div class="row">
        <!-- Content -->
        <div class="content-title">
          <p class="has-text-primary is-size-5 title">Rekomendasi Kami Untuk Anda</p>
          <p class="subtitle is-size-7">Properti pilihan yang sayang jika Anda lewatkan.</p>
        </div>
        <carousel
          :per-page-custom="[[0, 1],[320, 1],[768, 2], [1024, 4]]"
          mouse-drag
          navigation-enabled
          :pagination-enabled="false"
        >
          <slide class="padding-slide" v-for="slide in recomended" :key="slide.id">
            <div class="card">
              <div class="card-image" @click="seeDetail(slide.id)">
                <b-tag type="is-primary" class="cardlabel">{{slide.type}}</b-tag>
                <figure class="image is-4by3">
                  <img :src="slide.image" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content" @click="seeDetail(slide.id)">
                    <p class="title is-6 is-size-6-mobile">{{capitalize(slide.name)}}</p>
                  </div>
                  <div class="media-right" @click="loveItem(slide)">
                    <b-icon
                      :class="isLoved(slide.id)"
                      :icon="isLovedIcon(slide.id)"
                    ></b-icon>
                  </div>
                </div>

                <div class="content" @click="seeDetail(slide.id)">
                  <p class="has-text-grey">{{slide.district+', '+slide.city}}</p>
                  <p class="title is-6">
                    <!-- <vue-numeric
                      decimal-separator="."
                      currency="Rp"
                      separator="."
                      :readOnly="true"
                      :value="slide.price"
                    />-->
                    Rp {{slide.price_word}}
                  </p>
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
                      v-model="searchType"
                      placeholder="Masukan Kota"
                      :data="filteredDataObj"
                      field="nama"
                      @select="option => searchForm.city = option.id"
                    >
                      <template slot="empty">No results found</template>
                    </b-autocomplete>
                    <p class="control">
                      <b-button type="is-primary" @click.prevent="listing()">Search</b-button>
                    </p>
                  </b-field>
                  <template slot="empty">No results for</template>
                </b-field>
                <b-field label="Kota Terpopuler" class="has-text-grey-light">
                  <div class="buttons">
                    <span
                      class="button"
                      v-for="city in popularCity"
                      :key="city.id"
                      @click="listingByCity(city.id, city.nama)"
                    >{{city.nama}}</span>
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
                        :src="`https://maps.google.com/maps?q=${propertyBersama.coordinate}&hl=es;z=14&amp;output=embed`"
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
import VueNumeric from "vue-numeric";
import { capitalizeFLetter } from "../functionHelper.js";
import { setLove } from "../localstorage-helper";
import { mapState } from "vuex";

// import debounce from 'lodash/debounce'
export default {
  components: {
    Carousel,
    Slide,
    VueNumeric
  },
  data() {
    return {
      lockMinMax: true,
      propertyBersama: {},
      categoryList: [
        // { id: "", name: "Semua" },
        // { id: "rumah", name: "Rumah" },
        // { id: "villa", name: "Ruko" },
        // { id: "apartment", name: "Apartment" }
      ],
      priceList: [
        { id: "", name: "Semua Harga" },
        { id: 2, name: "100jt-500jt" },
        { id: 3, name: "800jt-1m" }
      ],
      searchForm: {
        name: "",
        city: "",
        type: "",
        category: "",
        room: "",
        start_price: 0,
        end_price: 500000000
      },
      searchType: "",
      popularCity: [],
      cityList: [],
      recomended: []
    };
  },
  methods: {
    seeDetail(id) {
      this.$router.push("/listing/detail/" + id);
    },
    listing() {
      let queryData = {
        city: this.searchForm.city,
        category: this.searchForm.category,
        start_price: this.searchForm.start_price,
        end_price: this.searchForm.end_price,
        city_name: this.searchType
      };
      if (this.lockMinMax) {
        queryData.start_price = "";
        queryData.end_price = "";
      }
      if (this.searchForm.room) queryData.room = this.searchForm.room;

      this.$router.push({
        path: "/listing",
        query: queryData
      });
    },
    listingByCity(id, name) {
      this.searchForm.city = id;
      this.searchType = name;
      this.listing();
    },
    getRecomendation() {
      let requestData = {
        category: "",
        city: "",
        type: "",
        limit: "30",
        offset: "",
        order: "0"
      };
      this.axios
        .post(
          "http://administrator.propertybersama.com/product/get_recommended",
          requestData
        )
        .then(res => {
          this.recomended = res.data.content;
        });
    },
    getPopularCity() {
      this.axios
        .get(
          "http://administrator.propertybersama.com/city/get_city_based_product"
        )
        .then(res => {
          this.popularCity = res.data.content;
        });
    },
    getCity() {
      this.axios
        .get("http://administrator.propertybersama.com/city/get_city")
        .then(res => {
          this.cityList = res.data.content;
        });
    },
    getCategory() {
      this.axios
        .get("http://administrator.propertybersama.com/category/get")
        .then(res => {
          this.categoryList = res.data.content;
        });
    },
    getConfig() {
      this.axios
        .get("http://administrator.propertybersama.com/configuration/get")
        .then(res => {
          this.propertyBersama = res.data.content;
        });
    },
    capitalize(txt) {
      return capitalizeFLetter(txt);
    },
    loveItem(item) {
      this.$store.commit("love/setLoveItem", item);
    }
  },
  computed: {
    ...mapState({
      love: state => state.love.love
    }),
    filteredDataObj() {
      if (this.searchType) {
        return this.cityList.filter(option => {
          return (
            option.nama
              .toString()
              .toLowerCase()
              .indexOf(this.searchType.toLowerCase()) >= 0
          );
        });
      }
    },
    isLoved() {
      return id => {
        for (let i = 0; i < this.love.length; i++) {
          if (this.love[i].id === id) {
            return "has-text-danger";
          }
        }
        return "has-text-grey-light";
      };
    },
    isLovedIcon() {
      return id => {
        for (let i = 0; i < this.love.length; i++) {
          if (this.love[i].id === id) {
            return "heart";
            
          }
        }
        return "heart-outline";
      };
    }
  },
  created() {
    this.getRecomendation();
    this.getPopularCity();
    this.getCity();
    this.getCategory();
    this.getConfig();
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
.rangePrice input {
  width: 200px;
}
</style>