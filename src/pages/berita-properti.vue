<template>
  <div>
    <section class="section is-secondary hero banner">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-multiline">
            <div class="column is-7 ">
              <p class="title is-size-3-mobile is-size-2-desktop">
                Ketahui Kondisi Harga Properti
                Terkini Lewat Property Index
              </p>
            </div>
            <div class="column is-12">
              <p>
                Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses
                3,4 Juta pengunjung setiap bulan
              </p>
              <br />
              <br />
              <button class="button is-primary is-medium">Baca Selengkapnya</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section bg2">
      <div class="container is-fluid">
        <p class="is-size-3">Berita Properti</p>
        <hr />
        <div class="columns is-multiline">
          <div class="column is-3" v-for="slide in slides" :key="slide.id">
            <div class="card" @click="seeDetail()">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="slide.img" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-6 is-size-6-mobile has-text-primary">{{slide.title}}</p>
                  </div>
                </div>

                <div class="content">
                  <p class="has-text-grey">{{slide.desc}}</p>
                  <b-button type="is-primary" class="is-fullwidth">Baca Selengkapnya</b-button>
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
              <p class="has-text-grey">Hal {{pageNumber+1}} dari {{pageCount}}</p>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <div class="level-item buttons">
              <button class="button" :disabled="pageNumber === 0" @click.prevent="previous">Previous</button>
              <button
                class="button"
                :disabled="pageNumber >= pageCount -1"
                @click.prevent="next"
              >Next page</button>
            </div>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slides: [
        {
          id: 1,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 2,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 3,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 4,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 5,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 6,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 7,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 8,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 9,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 10,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 11,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        },
        {
          id: 12,
          title: "Ketahui Kondisi Harga Properti Terkini Lewat Property Index",
          desc:
            "Property Index ini sendiri merupakan hasil analisis dari 400.000 listing properti yang diakses 3,4 Juta pengunjung setiap bulan",
          img:
            "https://cms.dailysocial.id/wp-content/uploads/2018/03/dacc09391ac416899b85b6981b2df36b_pexels-photo-106399.jpeg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.banner {
  background-image: url("../assets/img/banner.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #4099ff;
  position: relative;
}
.banner::after {
  content: "";
  background-color: black;
  position: absolute;
  display: block;
  height: 100%;
  opacity: 0.4;
  /* background-color: rgba(0, 0, 0, 0.39); */
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
}
.hero-body {
  z-index: 1;
}
.column > img {
  margin-top: 3rem !important;
}
@media only screen and (max-width: 780px) {
  .hero-body {
    padding: 0;
  }
}
</style>

