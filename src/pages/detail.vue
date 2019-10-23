<template>
  <div>
    <vueper-slides :dragging-distance="50" :slide-ratio="0.3">
      <vueper-slide
        v-for="(slide, i) in content3d.photos"
        :key="i"
        :image="slide.thumbnail_url"
        :link="slide.link"
      ></vueper-slide>
    </vueper-slides>
    <div class="row">
      <div class="container is-fluid">
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
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <div class="column is-7">
            <!-- Desc -->
            <h1 class="title is-5">Deskripsi</h1>
            <small v-html="propertyDetail.description || '-'" />
            <br/>
            <br/>
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
            <!-- Lokasi -->
            <p class="title is-5">Lokasi</p>
            <div class="is-vcentered" style="height: 350px">
              <!-- Map Canvas -->
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
            </div>
          </div>
          <div class="column is-5">
            <img
              src="https://s3.ap-southeast-2.amazonaws.com/scann3d-webapp/floorplans/images/000/013/701/original/Jl._Boulevard_Raya__Medan_Estate__Kec._Percut_Sei_Tuan__Kabupaten_Deli_Serdang.jpg?1565440985"
              alt
              srcset
            />
            <br/>
            <br/>
            <b-button type="is-primary" outlined size="is-medium" class="is-fullwidth" @click.prevent="gotoNewTab(content3d.one_page_website.url.branded)">Detail Page</b-button>
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
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { capitalizeFLetter } from "../functionHelper.js";

export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    isLoading: false,
    slides: [
      {
        title: "Mountain 1",
        content: "Slide content 1",
        link: "#link-to-article-1",
        image:
          "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
      },
      {
        title: "Mountain 1",
        content: "Slide content 1",
        link: "#link-to-article-1",
        image:
          "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
      },
      {
        title: "Mountain 1",
        content: "Slide content 1",
        link: "#link-to-article-1",
        image:
          "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
      },
      {
        title: "Mountain 1",
        content: "Slide content 1",
        link: "#link-to-article-1",
        image:
          "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
      },
      {
        title: "Mountain 1",
        content: "Slide content 1",
        link: "#link-to-article-1",
        image:
          "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
      }
    ],
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
        });
    },
    capitalize(txt) {
      return capitalizeFLetter(txt);
    },
    gotoNewTab(url){
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