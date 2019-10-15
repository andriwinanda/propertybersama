<template>
  <div>
    <section class="section is-secondary hero banner">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-multiline">
            <div class="column is-6">
              <p class="title is-size-3-mobile is-size-2-desktop">
                {{articleList[0].title}}
              </p>
            </div>
            <div class="column is-12">
              <p v-html="(articleList[0].text).substring(0,100)+'...'">
                
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
        <p class="is-size-3">Artikel</p>
        <hr />
        <div class="columns is-multiline">
          <div class="column is-3" v-for="article in articleList" :key="article.id">
            <div class="card" @click="seeDetail()">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="article.image" alt="Property Bersama" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-6 is-size-6-mobile has-text-primary">{{article.title}}</p>
                  </div>
                </div>

                <div class="content">
                  <p v-html="(article.text).substring(0,100)+'...'"></p>
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
  data () {
    return {
      articleList: []
    };
  },
  methods: {
    getArticle () {
      let token = localStorage.getItem('token')
      let requestData = {
        "category_id": "24",
        "language": "ID",
        "limit": 50,
        "start": 0
      }
      this.axios.post('/url/article/get_article_list', 
        requestData,
        {
          headers: {
          'Token': token
          }
        }
      )
        .then(res => {
          this.articleList = res.data.content
        })
    }
  },
  created () {
    this.getArticle()
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

