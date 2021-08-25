<template>
<div class="container">
  <div class="section columns is-multiline">
    <div class="column" style="min-height: 80vh">
      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <div v-if="content && !isLoading" class="isi-berita">
        <h1 class="title is-3">{{content.title}}</h1>
        <div>
          <small>Oleh : {{content.user? content.user: 'admin'}}</small>
          <span class="is-pulled-right">
            <small>Diupload : {{content.dates}}</small>
          </span>
        </div>
        <hr />
        <img :src="content.image" alt />
        <br />
        <!-- Text Content -->
        <p class="has-text-justified" v-html="content.text" />

        <br />
        <!-- <small>Sumber : Kejati Sumut</small> -->
      </div>
      <!-- Not Found -->
      <div v-else-if="!content && !isLoading" class="not-found">
        <h1 class="title is-1">404</h1>
        <p class="subtitle">Berita Tidak Ditemukan</p>
        <router-link class="button is-primary" to="/webfront">Kembali ke Beranda</router-link>
      </div>
    </div>
    <div class="column is-3 berita-lain">
      <p class="title is-5">Berita Terbaru</p>
      <hr />
      <!-- Media -->
      <article v-for="(berita) in newest" :key="berita.id" class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="berita.image" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
              <strong class="title is-6">{{berita.title}}</strong>
            <p class>
              <br />
              <span v-html="(berita.text).substring(0,100)+'...'"></span>
              <small>
                <a class="has-text-link" @click="berita_detail(berita.permalink)">Baca Selengkapnya »</a>
              </small>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      content: null,
      gallery: [],
      newest: [],
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isLoading: false
    };
  },
  methods: {
    berita_detail(permalink) {
      this.$router.push(permalink);
      this.get_article();
    },
    get_article() {
      this.content = null
      // Full Artickel
      this.isLoading = true;
      let permalink = this.$route.params.permalink;
      this.axios
        .post("http://administrator.propertybersama.com/article/get_article_by_permalink", {permalink: permalink})
        .then(res => {
          // this.berita = res.data.content;
          this.content = res.data.content[0];
          this.gallery = res.data.gallery;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    }
  },
  mounted() {
    // Get Full Artcle
    this.get_article();
    // Berita Terbaru
    let requestBody = {
      category_id: "24",
      language: "ID",
      limit: 3,
      start: 0
    };
    this.axios
      .post(
        "http://administrator.propertybersama.com/article/get_article_list",
        requestBody
      )
      .then(res => {
        this.newest = res.data.content;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.gallery .vueperslide {
  border: 2px solid white;
}
.gallery .vueperslides__arrow {
  color: white;
}
.section {
  padding-top: 2rem;
}
.berita-lain {
  border-left: 1px solid gainsboro;
  padding: 1rem;
  padding-left: 2rem;
}
.isi-berita p {
  text-indent: 2rem;
  padding-top: 1.5rem;
}
@media only screen and (max-width: 780px) {
  .berita-lain {
    padding: 0.75rem !important;
    border-left: none;
  }
}
@media only screen and (min-width: 780px) {
  .isi-berita {
    padding-right: 1rem !important;
  }
}
.not-found {
  text-align: center;
  margin-top: 5rem;
}
p {
  color: black;
}
a {
  color: #3273dc;
}
</style>
