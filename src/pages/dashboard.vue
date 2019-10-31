<template>
  <div>
    <section class="hero">
      <div class="hero-body is-gapless">
        <div class="container is-fluid">
          <div class="columns is-variable is-2 is-mobile is-vcentered is-centered">
            <div class="column is-4-mobile is-2-tablet is-2-desktop is-offset-1-desktop">
              <figure class="image">
                <img
                  class="is-rounded"
                  :src="profile.image || 'https://www.sejasa.com/assets/icons/profile_pic-9f51819994c099de0ac9fee7b3f9bb341d7181d5af9eb33ec4fc7fc98b9bbb95.png'"
                />
              </figure>
            </div>
            <div class="column is-8-desktop is-8-mobile is-5-tablet">
              <div class="columns is-gapless is-multiline is-vcentered">
                <div class="column is-12-mobile is-6-desktop">
                  <p class="nama-user has-text-white is-size-4-mobile is-size-2-desktop">{{profile.first_name}} {{profile.last_name}}</p>
                  <p class="email-user has-text-white is-size-6-mobile is-size-5-desktop">{{profile.email}}</p>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </section>

    <section class="section bg2">
      <div class="container is-fluid floating">
        <div class="columns">
          <div class="column is-8">
            <!-- <div class="box dashboard">
              <nav class="level is-mobile">Selamat Datang</nav>
            </div>

            <br /> -->

            <div class="request box">
              <p class="title is-4 has-text-white">Semua Properti</p>
              <div class="is-divider no-martop"></div>

              <div class="box" v-for="(data, key) in products" :key="key">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p class="is-size-4-desktop is-size-5-mobile has-text-primary layanan">
                        <a class="tag status" @click.prevent="publish(data.id)" :class="Number(data.posted) ? 'is-success':'is-warning'">{{Number(data.posted)? 'Published':'Unpublish'}}</a>
                        {{data.type == 'SALE'? 'Dijual':'Disewakan' }} {{capitalize(data.name)}}
                      </p>
                      <div class="overflow">
                        <b-icon icon="cash-multiple" size="is-small"></b-icon>
                        <span>Rp {{data.price_word}}</span>
                        <b-icon icon="map-marker" size="is-small"></b-icon>
                        <b-tooltip label="data.lokasi">{{data.district}}, {{data.city}}</b-tooltip>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <p class="title is-5">Contact &amp; Personal Info</p>
              <div class="content">
                <article class="media">
                  <div class="media-left">
                    <b-icon icon="email-outline" size="is-medium"></b-icon>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p class="title is-6">Email :</p>
                      <p class="subtitle is-6 overflow">{{profile.email}}</p>
                    </div>
                  </div>
                </article>
                <article class="media">
                  <div class="media-left">
                    <b-icon icon="phone" size="is-medium"></b-icon>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p class="title is-6">Handphone :</p>
                      <p class="subtitle is-6 overflow">{{profile.phone}}</p>
                    </div>
                  </div>
                </article>
                <article class="media">
                  <div class="media-left">
                    <b-icon icon="map-marker" size="is-medium"></b-icon>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p class="title is-6">Address :</p>
                      <p class="subtitle is-6 overflow">{{profile.address}}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { capitalizeFLetter } from "../functionHelper";
import { getToken } from '../localstorage-helper'
export default {
  data() {
    return {
      profile: {},
      products: [],
      profile_img:
        "https://assets.gitlab-static.net/uploads/-/system/user/avatar/3465364/avatar.png?width=90"
    };
  },
  methods: {

    publish(id) {
      this.axios
        .get(`http://administrator.propertybersama.com/product/publish_by_member/${id}`, {
          headers: {
            'X-Auth-Token': getToken()
          }
        })
        .then(res => {
          this.getProduct()
        });
      

    },
    getProfile() {
      this.axios
        .get("http://administrator.propertybersama.com/member/detail", {
          headers: {
            'X-Auth-Token': getToken()
          }
        })
        .then(res => {
          this.profile = res.data.content;
        });
    },
    getProduct() {
      this.products = []
      this.axios
        .get("http://administrator.propertybersama.com/product/get_by_member", {
          headers: {
            'X-Auth-Token': getToken()
          }
        })
        .then(res => {
          this.products = res.data.content;
        });
    },
    capitalize(txt) {
      return capitalizeFLetter(txt);
    }
  },
  created() {
    this.getProfile()
    this.getProduct()
  }
};
</script>


<style scoped>
/* @import url('../assets/css/style.scss'); */
.hero {
  background: linear-gradient(150deg, #2e2e2e, #0f0f0f);
}
.bg2 {
  padding-bottom: 0 !important;
}
.floating {
  position: relative;
  top: -5rem;
}
.dashboard {
  margin-bottom: 0;
  padding: 1.25rem 0.5rem;
}
a {
  color: black;
}
.request {
  background: #747474
  /* background: linear-gradient(60deg, #2c2c2c, #726026 90%); */
}
.no-martop {
  margin-top: 0 !important;
}
.status {
  float: right;
}
figure {
  border: 3px solid white;
  border-radius: 50%;
  max-width: 120px;
  margin: 0 auto;
  background: url("https://www.sejasa.com/assets/icons/profile_pic-9f51819994c099de0ac9fee7b3f9bb341d7181d5af9eb33ec4fc7fc98b9bbb95.png");
  background-size: cover;
  background-position: center;
}
figure img {
  width: 114px !important;
  height: 114px !important;
}
.add-margin-top {
  margin-top: 0.25rem !important;
}
.nama-user {
  margin-bottom: -6px;
}
.nama-user,
.email-user,
.layanan,
.overflow {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title.is-6 {
  margin-bottom: 1.5em !important;
}
.box {
  box-shadow: 2px 3px 5px rgba(10, 10, 10, 0.2) !important;
}
.card {
  padding: 1rem;
}
@media only screen and (max-width: 768px) {
  figure {
    margin: 0 auto;
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
    width: 85px !important;
    height: 85px !important;
  }
  figure img {
    width: 79px !important;
    height: 79px !important;
  }
  .center-in-mobile {
    text-align: center;
    margin: 0 auto;
  }
  .center-in-mobile p {
    font-size: 9pt !important;
  }
  .hero-body {
    padding: 3rem 1rem;
  }
}
</style>

