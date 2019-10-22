<template>
  <div class="bg2">
    <div class="bg4 section fixed">
      <div class="container is-fluid">
        <div class="columns is-vcentered">
          <div class="column is-10">
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
              <b-select v-model="searchForm.category" placeholder="Category">
                <option value>Semua</option>
                <option
                  v-for="category in categoryList"
                  :value="category.id"
                  :key="category.id"
                >{{ capitalize(category.name) }}</option>
              </b-select>
              <b-field class="control">
                <b-dropdown aria-role="list">
                  <button class="button" type="button" slot="trigger">
                    <span v-if="!searchForm.start_price && !searchForm.end_price">Harga</span>
                    <span v-else>Rp {{searchForm.start_price +" - "+searchForm.end_price}}</span>
                    <b-icon icon="menu-down"></b-icon>
                  </button>

                  <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
                    <b-field class="rangePrice">
                      <b-input placeholder="Min" v-model="searchForm.start_price" type="number"></b-input>
                    </b-field>
                    <b-field class="rangePrice">
                      <b-input placeholder="Max" v-model="searchForm.end_price" type="number"></b-input>
                    </b-field>
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>

              <b-field class="control">
                <b-button type="is-primary" @click.prevent="search()">Search</b-button>
              </b-field>
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
              <div class="card" @click="seeDetail(slide.id)">
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
                    <p class="has-text-grey">{{slide.district+", " +slide.city}}</p>
                    <p class="title is-6">
                      <!-- <vue-numeric
                        decimal-separator="."
                        currency="Rp"
                        separator="."
                        :readOnly="true"
                        :value="slide.price"
                      /> -->
                      Rp {{slide.price_word}}
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
                  <div class="card" @click="seeDetail(slide.id)">
                    <div class="card-content">
                      <div class="columns is-multiline">
                        <div class="column is-3 is-paddingless">
                          <img class="imgList" :src="slide.image" alt="Placeholder image" />
                        </div>
                        <div class="column">
                          <p class="title is-6 is-size-6-mobile">{{((slide.name).toUpperCase())}}</p>
                          <p class="subtitle is-6 has-text-grey">
                            <small>{{slide.district+", " +slide.city}}</small>
                          </p>
                          <p class="title is-6">
                            <!-- <vue-numeric
                              decimal-separator="."
                              currency="Rp"
                              separator="."
                              :readOnly="true"
                              :value="slide.price"
                            /> -->
                            Rp {{slide.price_word}}
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
import { capitalizeFLetter } from "../functionHelper";

export default {
  components: { googleMap, VueNumeric },
  data() {
    return {
      mapView: false,
      isLoading: false,
      dataList: [],
      categoryList: [],
      searchForm: {
        name: "",
        city: "",
        type: "",
        category: "",
        start_price: null,
        end_price: null
      },
      popularCity: [],
      searchType: "",
      record: 0,
      offset: 0,
      limit: 10
    };
  },
  computed: {
    filteredDataObj() {
      return this.popularCity.filter(option => {
        return (
          option.nama
            .toString()
            .toLowerCase()
            .indexOf(this.searchType) >= 0
        );
      });
    }
  },
  methods: {
    seeDetail(id) {
      this.$router.push("/listing/detail/"+id);
    },
    next() {
      this.offset += this.limit;
      this.getData();
    },
    prev() {
      this.offset -= this.limit;
      this.getData();
    },
    search() {
      if(!this.searchType) this.searchForm.city = ""
      this.$router.replace({
        query: {
          city: this.searchForm.city,
          category: this.searchForm.category,
          start_price: this.searchForm.start_price,
          end_price: this.searchForm.end_price,
          city_name: this.searchType
        }
      });
      this.getData();
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
    getData() {
      this.isLoading = true;
      let requestData = this.searchForm;
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
    },
    getCategory() {
      this.axios
        .get("http://administrator.propertybersama.com/category/get")
        .then(res => {
          this.categoryList = res.data.content;
        });
    },
    capitalize(txt) {
      return capitalizeFLetter(txt);
    }
  },
  created() {
    this.getPopularCity();
    if (this.$route.query) {
      let query = this.$route.query;
      this.searchForm.category = query.category;
      this.searchForm.start_price = query.start_price;
      this.searchForm.end_price = query.end_price;
      this.searchForm.city = query.city;
      this.searchType = query.city_name;
      //   return (element.id == query.city).nama
        
      // });
    }
    this.getData();
    this.getCategory();
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