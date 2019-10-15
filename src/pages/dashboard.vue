<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body is-gapless">
        <div class="container is-fluid">
          <div class="columns is-variable is-2 is-mobile is-vcentered is-centered">
            <div class="column is-4-mobile is-2-tablet is-2-desktop is-offset-1-desktop">
              <figure class="image">
                <img
                  class="is-rounded"
                  :src="profile_img?profile_img:'https://www.sejasa.com/assets/icons/profile_pic-9f51819994c099de0ac9fee7b3f9bb341d7181d5af9eb33ec4fc7fc98b9bbb95.png'"
                />
              </figure>
            </div>
            <div class="column is-8-desktop is-8-mobile is-5-tablet">
              <div class="columns is-gapless is-multiline is-vcentered">
                <div class="column is-12-mobile is-6-desktop">
                  <p class="nama-user is-size-4-mobile is-size-2-desktop">Andri Winanda</p>
                  <p class="email-user is-size-6-mobile is-size-5-desktop">andriwinanda1@gmail.com</p>
                </div>
                <div class="column is-12-mobile is-2-desktop add-margin-top">
                  <router-link
                    class="button is-fullwidth is-small add-margin-top"
                    to="/edit-profile"
                  >Edit Profile</router-link>
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
            <div class="box dashboard">
              <nav class="level is-mobile">Selamat Datang</nav>
            </div>

            <br />

            <div class="request box">
              <p class="title is-4 has-text-white">Semua Prpperti</p>
              <div class="is-divider no-martop"></div>

              <a class="box" v-for="(data, key) in request" :key="key">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p class="is-size-4-desktop is-size-5-mobile has-text-primary layanan">
                        <span class="tag status" :class="data.label">{{data.status}}</span>
                        {{data.layanan}}
                      </p>
                      <div class="overflow">
                        <b-icon icon="calendar" size="is-small"></b-icon>
                        <span>{{data.date}}</span>
                        <b-icon icon="map-marker" size="is-small"></b-icon>
                        <b-tooltip label="data.lokasi">{{data.lokasi}}</b-tooltip>
                      </div>
                    </div>
                  </div>
                </article>
              </a>
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
                      <p class="subtitle is-6 overflow">andriwinanda1@gmail.com</p>
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
                      <p class="subtitle is-6 overflow">+62831 6545 xxxx</p>
                    </div>
                  </div>
                </article>
                <article class="media">
                  <div class="media-left">
                    <b-icon icon="map-marker" size="is-medium"></b-icon>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p class="title is-6">Default Location :</p>
                      <p class="subtitle is-6 overflow">Sumatera Utara</p>
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
export default {
  data() {
    return {
      profile_img:
        "https://assets.gitlab-static.net/uploads/-/system/user/avatar/3465364/avatar.png?width=90",
      request: [
        {
          _id: "",
          layanan: "Permata Residence",
          date: "04-04-2019",
          lokasi: "Medan",
          label: "is-warning",
          status: "Pending"
        },
        {
          _id: "",
          layanan: "Puri Indah Regency",
          date: "04-04-2019",
          lokasi: "Medan",
          label: "is-success",
          status: "Done"
        },
        {
          _id: "",
          layanan: "Platinum Residence",
          date: "04-04-2019",
          lokasi: "Nusa Tenggara Barat",
          label: "is-warning",
          status: "Pending"
        }
      ]
    };
  }
};
</script>


<style scoped>
/* @import url('../assets/css/style.scss'); */
.hero {
  background: linear-gradient(141deg, #e4b015 0, #bd9210 80%);
}
.bg2 {
  padding-bottom: 0 !important;
}
.floating {
  position: relative;
  top: -7rem;
}
.dashboard {
  margin-bottom: 0;
  padding: 1.25rem 0.5rem;
}
a {
  color: black;
}
.request {
  background: linear-gradient(141deg, #e4b015 0, #bd9210 80%);
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

