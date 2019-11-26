<template>
  <div class="bg2">
    <div class="bg4 filter-fixed">
      <div class="container is-fluid">
        <div class="columns is-vcentered">
          <div class="column is-10">
            <b-field grouped group-multiline>
              <b-autocomplete
                style="min-width: 200px"
                expanded
                v-model="searchForm.searchType"
                placeholder="Masukan Kota"
                :data="filteredDataObj"
                field="nama"
                @select="option => searchForm.city = option.id"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
              <b-select v-model="searchForm.category" placeholder="Category">
                <option value>Semua Kategori</option>
                <option
                  v-for="category in categoryList"
                  :value="category.id"
                  :key="category.id"
                >{{ capitalize(category.name) }}</option>
              </b-select>
              <b-field class="control">
                <b-dropdown aria-role="menu" position="is-bottom-left">
                  <button class="button" type="button" slot="trigger">
                    <span v-if="lockMinMax">Semua Harga</span>
                    <span v-else>Rp {{searchForm.start_price +" - "+searchForm.end_price}}</span>
                    <b-icon icon="menu-down"></b-icon>
                  </button>

                  <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
                    <div style="width:250px;">
                      <b-field>
                        <b-input
                          placeholder="Min"
                          :disabled="lockMinMax"
                          v-model="searchForm.start_price"
                          type="number"
                        ></b-input>
                      </b-field>
                      <b-field>
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
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>
              <!-- Filter -->
              <b-field class="control">
                <b-dropdown
                  aria-role="list"
                  ref="dropdownFilter"
                  position="is-bottom-left"
                  toogle="closeFilter"
                >
                  <button class="button" type="button" slot="trigger">
                    <b-icon icon="filter" type="is-primary"></b-icon>
                    <span>Filter</span>
                  </button>

                  <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
                    <form action="filter">
                      <div class="columns">
                        <div class="column is-6">
                          <b-field label="Type">
                            <b-select placeholder="Select one" v-model="searchForm.type">
                              <option value>Apapun</option>
                              <option value="SALE">Dijual</option>
                              <option value="RENT">Disewakan</option>
                            </b-select>
                          </b-field>
                          <b-field label="Sertifikat">
                            <b-select placeholder="Select one" v-model="searchForm.certificate">
                              <option value>Apapun</option>
                              <option value="hak_milik">Hak Milik</option>
                              <option value="hak_guna_bangunan">Hak Guna Bangunan</option>
                              <option value="strata">Strata</option>
                              <option value="girik">Girik</option>
                              <option value="lainya">Lainya</option>
                            </b-select>
                          </b-field>
                          <b-field label="Interior">
                            <b-select placeholder="Select one" v-model="searchForm.interior">
                              <option value>Apapun</option>
                              <option value="tidak_berperabot">Tidak Berperabot</option>
                              <option value="sebagian">Sebagian</option>
                              <option value="lengkap">Lengkap</option>
                            </b-select>
                          </b-field>
                        </div>
                        <div class="column is-6">
                          <b-field label="Jumlah Lantai">
                            <b-numberinput :editable="false" min="0" v-model="searchForm.floor"></b-numberinput>
                          </b-field>
                          <b-field label="Kamar Mandi">
                            <b-numberinput :editable="false" min="0" v-model="searchForm.toilet"></b-numberinput>
                          </b-field>
                          <b-field label="Kamar Tidur">
                            <b-numberinput :editable="false" min="0" v-model="searchForm.room"></b-numberinput>
                          </b-field>
                          <span />
                        </div>
                      </div>
                      <b-field horizontal>
                        <b-button class="is-fullwidth" type="reset" @click.prevent="reset()">Reset</b-button>
                        <b-button class="is-fullwidth" type="is-primary" @click="filter()">Filter</b-button>
                      </b-field>
                    </form>
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>

              <b-field>
                <b-button type="is-primary" @click.prevent="search()">Search</b-button>
              </b-field>
            </b-field>
          </div>
          <div class="column is-2 has-text-right is-hidden-touch">
            <b-field>
              <b-switch v-model="mapView">Show Map</b-switch>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="listing mobile-padding">
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
          <div v-if="!dataList && !isLoading" class="container is-fluid not-found">
            <h1 class="title is-1 has-text-grey">&#128549;</h1>
            <p class="subtitle is-6">Properti Tidak Ditemukan</p>
          </div>
          <div class="columns is-multiline">
            <div class="column is-3" v-for="slide in dataList" :key="slide.id">
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
                      <p class="title is-6 is-size-6-mobile">{{((slide.name).toUpperCase())}}</p>
                    </div>
                    <div class="media-right" @click="loveItem(slide)">
                      <b-icon :class="isLoved(slide.id)" :icon="isLovedIcon(slide.id)"></b-icon>
                    </div>
                  </div>

                  <div class="content" @click="seeDetail(slide.id)">
                    <p class="has-text-grey">{{slide.district+", " +slide.city}}</p>
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
                  <div class="card">
                    <div class="card-content">
                      <div class="columns is-multiline">
                        <div class="column is-3 is-paddingless" @click="seeDetail(slide.id)">
                          <img class="imgList" :src="slide.image" alt="Placeholder image" />
                        </div>
                        <div class="column" @click="seeDetail(slide.id)">
                          <p class="title is-6 is-size-6-mobile">{{((slide.name).toUpperCase())}}</p>
                          <p class="subtitle is-6 has-text-grey">
                            <small>{{slide.district+", " +slide.city}}</small>
                          </p>
                          <p class="title is-6">Rp {{slide.price_word}}</p>
                        </div>
                        <div class="column is-1 is-paddingless">
                          <div @click="loveItem(slide)" style="padding-top: 2rem">
                            <b-icon :class="isLoved(slide.id)" :icon="isLovedIcon(slide.id)"></b-icon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-7">
              <div class="fixed map">
                <google-map v-if="!isLoading" :markerCoordinates="markerCoordinates" name="example"></google-map>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Filter -->
  </div>
</template>
<script>
import GoogleMapsLoader from "google-maps";
import googleMap from "../component/Maps.vue";
import VueNumeric from "vue-numeric";
import { capitalizeFLetter } from "../functionHelper";
import { mapState } from "vuex";
import { setLove } from "../localstorage-helper";

export default {
  components: { googleMap, VueNumeric },
  data() {
    return {
      mapView: true,
      isLoading: false,
      lockMinMax: false,
      dataList: [],
      categoryList: [],
      searchForm: {
        name: "",
        city: "",
        type: "",
        category: "",
        start_price: "",
        end_price: "",
        room: 0,
        toilet: 0,
        certificate: "",
        interior: "",
        floor: 0,
        searchType: ""
      },
      popularCity: [],
      cityList: [],
      record: 0,
      offset: 0,
      limit: 10,
      markerCoordinates: []
    };
  },
  methods: {
    seeDetail(id) {
      this.$router.push("/listing/detail/" + id);
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
      if (this.lockMinMax) {
        this.searchForm.start_price = "";
        this.searchForm.end_price = "";
      }
      if (!this.searchForm.searchType) this.searchForm.city = "";
      this.$router.replace({
        query: this.searchForm
      });
      this.getData();
    },
    filter() {
      this.search();
      this.$refs.dropdownFilter.toggle();
    },
    reset() {
      this.searchForm.room = 0;
      this.searchForm.toilet = 0;
      this.searchForm.certificate = "";
      this.searchForm.type = "";
      this.searchForm.interior = "";
      this.searchForm.floor = 0;
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
    getData() {
      this.isLoading = true;
      this.markerCoordinates = [];
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
          res.data.content.map(el => {
            let mapContent = {};
            if (el.coordinate) {
              mapContent.id = el.id;
              mapContent.name = el.name;
              mapContent.district = el.district;
              mapContent.city = el.city;
              mapContent.image = el.image;
              let coordinate = el.coordinate.split(",");
              mapContent.latitude = parseFloat(coordinate[0]);
              mapContent.longitude = parseFloat(coordinate[1]);
              mapContent.price = el.price_word;
              this.markerCoordinates.push(mapContent);
            }
          });
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
    },
    loveItem(item) {
      this.$store.commit("love/setLoveItem", item);
    }
  },
  computed: {
    ...mapState({
      love: state => state.love.love
    }),
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
    },
    filteredDataObj() {
      if (this.searchForm.searchType) {
        return this.cityList.filter(option => {
          return (
            option.nama
              .toString()
              .toLowerCase()
              .indexOf(this.searchForm.searchType.toLowerCase()) >= 0
          );
        });
      }
    }
  },
  created() {
    this.getCity();
    this.getPopularCity();
    if (this.$route.query) {
      let query = this.$route.query;
      this.searchForm.category = query.category;
      this.searchForm.start_price = query.start_price;
      this.searchForm.end_price = query.end_price;
      this.searchForm.city = query.city;
      this.searchForm.room = query.room;
      this.searchForm.searchType = query.city_name;
      if (!query.start_price && !query.end_price) this.lockMinMax = true;
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
  position: fixed;
  height: auto;
  width: 100%;
  /* right: 0px;
  top: 60px; */
  touch-action: pan-x pan-y;
  /* background-color: aquamarine;*/
}
.filter-fixed {
  position: fixed;
  height: auto;
  width: 100%;
  z-index: 2;
  border-top: 1px solid #dcdcdc57;
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
.not-found {
  text-align: center;
  padding-top: 6rem;
  min-height: 60vh;
}
@media only screen and (max-width: 1024px) {
  /* .listing{
    padding-top: 10rem !important;
  } */
  .filter-fixed {
    position: inherit;
  }
}
</style>