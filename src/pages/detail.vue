<template>
  <div>
    <vueper-slides :dragging-distance="50" :slide-ratio="0.3">
      <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" :link="slide.link"></vueper-slide>
    </vueper-slides>
    <div class="row">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-8">
            <p class="title is-4">Dijual Rumah di Komplek Murni Residence</p>
            <p class="subtitle is-5">Medan Petisah, Kota Medan</p>
          </div>
          <div class="column is-4 has-text-right">
            <p class="title is-4">Rp 4.070.000.000,-</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <div class="column is-7">
            <small>
              *Komplek MURNI RESIDENCE*
              <br />Jl.Bunga Melur /Jl.Pertambangan Petisah Medan
              <br />Rumah Hunian Minimalis nyaman dan tenang untuk keluarga anda!
              <br />Total Keseluruhan ada 8 unit dan saat ini sisa 4 unit lagi.
              <br />1.Kav. B1, B2 dan B4
              <br />-Uk. 6 x 15 = 90 Mtr
              <br />-Harga Rp 460 Juta
              <br />2.Kav. A2
              <br />-Uk. 8 x 14 = 112 Mtr
              <br />-Harga Rp 520 Juta
              <br />
            </small>

            <br />
            <p class="title is-5">Lokasi</p>
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
          <div class="column is-5">
            <img
              src="https://s3.ap-southeast-2.amazonaws.com/scann3d-webapp/floorplans/images/000/013/701/original/Jl._Boulevard_Raya__Medan_Estate__Kec._Percut_Sei_Tuan__Kabupaten_Deli_Serdang.jpg?1565440985"
              alt
              srcset
            />
          </div>
          <div class="column is-12">
            <div class="bg2 section is-vcentered" style="height: 200px">
              <p
                class="is-size-3 has-text-centered has-text-grey-light"
                style="padding-top: 50px"
              >Embeded Virtual 3D Tour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
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
    ]
  }),
  methods: {
     getData(id) {
      this.isLoading = true;
      this.axios
        .get(
          `https://captur3d.io/api/v1/properties/${id}?expand=virtual_tours`,
          {
            headers: {
              authorization: "Bearer I/r2Z/xEgOtyEyk/BXTEMaQ9vlrZzCmg2JJ/bGu6QgU="
            }
          }
        )
        .then(res => {

          this.isLoading = false;
          // this.dataList = res.data.content;
          // this.record = res.data.record;
          console.log(res)
        });
    }
  },
  created() {
    let id = this.$route.params.id
    this.getData(id)
  }
};
</script>