<template>
  <div>
    <vueper-slides :dragging-distance="50" :bullets="false" :parallax="true" :slide-ratio="0.41">
      <vueper-slide
        v-for="(slide, i) in content3d.photos"
        :key="i"
        :image="slide.thumbnail_url"
        :link="slide.link"
      ></vueper-slide>
    </vueper-slides>
    <div class="row">
      <div class="container is-fluid mobile-padding">
        <div class="columns">
          <div class="column is-8">
            <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
            <p
              class="title is-4"
            >{{propertyDetail.type == 'SALE'? 'Dijual':'Disewakan' }} {{capitalize(propertyDetail.name)}}</p>
            <p class="subtitle is-5">{{propertyDetail.district}}, {{propertyDetail.city}}</p>
          </div>
          <div class="column is-4 has-text-right">
            <p class="title is-4">Rp {{propertyDetail.price_word}}</p>
            <p class="subtitle is-6">
              <span>
                <b-icon icon="hotel" size="is-small" />
                {{propertyDetail.room}}
              </span>
              <span>
                <b-icon icon="toilet" size="is-small" />
                {{propertyDetail.toilet}}
              </span>
              <span>
                <b-icon icon="car" size="is-small" />
                {{propertyDetail.parking}}
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div class="container is-fluid mobile-padding">
        <div class="columns is-multiline">
          <div class="column is-7">
            <!-- Desc -->
            <h1 class="title is-5">Deskripsi</h1>
            <small v-html="propertyDetail.description || '-'" />
            <br />
            <br />
            <!-- <carousel
              mouse-drag
              :per-page-custom="[[0, 1],[320, 1],[768, 2], [1024, 4]]"
              navigation-enabled
              :pagination-enabled="false"
            >
              <slide class="padding-slide" v-for="slide in content3d.photos" :key="slide.id">
                <img :src="slide.thumbnail_url" alt="">
              </slide>
            </carousel> -->
            <h1 class="title is-5">Galery</h1>
            <vueper-slides
              class="no-shadow"
               :arrows-outside="false"
              :visible-slides="1"
              slide-multiple
               :bullets="false" 
              :slide-ratio="0.8"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 2 } }"
            >
              <vueper-slide
                v-for="(slide, i) in floolPlan"
                :key="i"
                :image="slide['image'+(i+1).toString()]"
                :link="slide.link"
              ></vueper-slide>
            </vueper-slides>

            <!-- Lokasi -->
            <!-- <p class="title is-5">Lokasi</p>
            <div class="is-vcentered" style="height: 350px">
            
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    id="gmap_canvas"
                    :src="`https://maps.google.com/maps?q=${propertyDetail.coordinate}&hl=es;z=14&amp;output=embed`"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                  ></iframe>
                </div>
              </div>
            </div> -->
          </div>
          <div class="column is-5">
            <!-- Detail -->
            <h1 class="title is-5">Detail</h1>
            <div class="columns">
              <div class="column is-6">
                <table class="table is-striped is-fullwidth">
                  <tr>
                    <td>
                      <small class="has-text-grey">Tipe</small>
                      <br />
                      {{capitalize(propertyDetail.category) }} {{propertyDetail.type == 'SALE'? 'Dijual':'Disewakan' }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Luas Bangunan</small>
                      <br />
                      {{propertyDetail.build_large || "-" }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Luas Tanah</small>
                      <br />
                      {{propertyDetail.tanah_large || "-" }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Sertifikat</small>
                      <br />
                      {{propertyDetail.certificate || "-" }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Cluster</small>
                      <br />
                      {{propertyDetail.cluster || "-" }}
                    </td>
                  </tr>
                </table>
              </div>
              <div class="column is-6">
                <!-- Detail -->
                <table class="table is-stripped is-fullwidth">
                  <tr>
                    <td>
                      <small class="has-text-grey">Interior</small>
                      <br />
                      {{propertyDetail.interior || "-"}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Jumlah Lantai</small>
                      <br />
                      {{propertyDetail.floor || "-"}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Ruang Kamar</small>
                      <br />
                      {{propertyDetail.room || "-"}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Toilet</small>
                      <br />
                      {{propertyDetail.toilet || "-"}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small class="has-text-grey">Parkir</small>
                      <br />
                      {{propertyDetail.parking || "-"}}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <br />
            <br />
            <b-button
              type="is-primary"
              outlined
              size="is-medium"
              class="is-fullwidth"
              @click.prevent="gotoNewTab(content3d.one_page_website.url.branded)"
            >Detail Page</b-button>
          </div>
          <div class="column is-12">
            <iframe
              id="vtour"
              :src="content3d.virtual_tours[0].primary_url"
              frameborder="0"
              width="100%"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { capitalizeFLetter } from "../functionHelper.js";

export default {
  components: { VueperSlides, VueperSlide, Carousel },
  data: () => ({
    isLoading: false,
    floolPlan: [],
    propertyDetail: null,
    content3d: null
  }),
  methods: {
    getData(id) {
      this.isLoading = true;
      this.axios
        .get(`http://administrator.propertybersama.com/product/get_by_id/${id}`)
        .then(res => {
          this.isLoading = false;
          // this.dataList = res.data.content;
          // this.record = res.data.record;
          this.propertyDetail = res.data.content;
          this.content3d = res.data.content3d;
          this.floolPlan = res.data.floor_plan
          
        });
    },
    capitalize(txt) {
      return capitalizeFLetter(txt);
    },
    gotoNewTab(url) {
      window.open(url, "_blank");
    }
  },
  created() {
    let id = this.$route.params.id;
    this.getData(id);
  }
};
</script>
<style scoped>
#vtour {
  height: 600px !important;
}
</style>