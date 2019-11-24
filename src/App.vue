<template>
  <div id="app">
    <nav class="navbar is-fixed-top">
      <div class="container is-fluid">
        <div class="navbar-brand">
          <a class="navbar-item logo" @click.prevent="home()">
            <img src="@/assets/img/logo.jpg" alt="Logo" />
          </a>
          <span
            class="navbar-burger burger"
            data-target="navbarMenu"
            @click="showNav = !showNav"
            :class="{ 'is-active': showNav }"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <!-- Navbar -->
            <a
              class="navbar-item"
              v-for="item in items"
              :class="{ 'is-active' : isActive(item.title)}"
              :key="item.title"
              @click.prevent="select(item)"
            >{{item.title}}</a>

            <!-- Jika tidak ada user -->
            <!-- <div v-if="!isLoggedIn"> -->
            <!-- <router-link class="button is-primary" to="/login">Login</router-link> -->

            <div v-if="!isLoggedIn" class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Menu</a>
              <div class="navbar-dropdown is-right">
                <a class="navbar-item" @click.prevent="daftar()">Daftarkan Property</a>
                <hr class="navbar-divider" />
                <a class="navbar-item" @click.prevent="login()">Login</a>
              </div>
            </div>
            <!-- </div> -->

            <!-- Jika ada user -->
            <div v-else class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Akun</a>
              <div class="navbar-dropdown is-right">
                <a
                  class="navbar-item"
                  v-for="item in akun"
                  :class="{ 'is-active' : isActive(item.title)}"
                  :key="item.title"
                  @click.prevent="select(item)"
                >{{item.title}}</a>
                <hr class="navbar-divider" />
                <a class="navbar-item" @click.prevent="logout()">Logout</a>
              </div>
            </div>

            <!-- Love -->
            <b-dropdown position="is-bottom-left" ref="dropdownLove" aria-role="menu" trap-focus>
              <a class="navbar-item" slot="trigger" role="button">
                <small>{{love.length}}</small>
                &nbsp;
                <b-icon
                  size="is-small"
                  class="has-text-grey-light"
                  :icon="love.length? 'heart': 'heart-outline'"
                ></b-icon>
              </a>

              <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
                <div class="modal-card" style="width:300px;">
                  <section class="is-multiline">
                    <div
                      style="padding: 0.1rem 0.5rem 0.5rem 1rem"
                      class="has-text-primary"
                    >Property yang anda sukai</div>

                    <div class="card" v-if="!love.length">
                      <div class="card-content">
                        <p class="has-text-centered has-text-grey-light">Anda belum meyukai property apapun</p>
                      </div>
                    </div>
                    <div v-for="(slide,index) in love" :key="index">
                      <div class="card">
                        <div class="card-content">
                          <div class="columns is-multiline" style="padding: 0.1rem 0.5rem">
                            <div class="column is-3 v-centered" @click="seeDetail(slide.id)" style="padding: 0.5rem">
                              <img class="imgList" :src="slide.image" alt="Placeholder image" />
                            </div>
                            <div class="column" @click="seeDetail(slide.id)">
                              <p
                                class="title is-7 is-size-7-mobile"
                              >{{((slide.name).toUpperCase())}}</p>
                              <p class="subtitle is-7 has-text-grey">
                                <small>{{slide.district+", " +slide.city}}</small>
                              </p>
                              <p class="title is-7">Rp {{slide.price_word}}</p>
                            </div>
                            <div class="column is-1" style="padding: 1.5rem 0">
                              <button class="delete is-small" @click.prevent="removeItem(index)"></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="has-text-centered" style="padding-top: 0.5rem">
                      <a class="has-text-danger is-size-7" @click.prevent="deleteAll()">Hapus Semua</a>
                    </div>
                  </section>
                </div>
              </b-dropdown-item>
            </b-dropdown>

            <div class="navbar-item tag-copyright">
              <hr />
              <p class="copyright">© Property Bersama. All right reserved</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- <b-navbar toggleable="lg" type="light">
      <b-container>
        <router-link to="/" tag="b-navbar-brand">
          <b-img src="@/assets/img/logo.jpg" width="80" alt="Fluid image"></b-img>
        </router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>-->
    <!-- Right aligned nav items -->
    <!-- <b-navbar-nav class="ml-auto">
            <router-link
              v-for="(item, index) in items"
              tag="b-nav-item"
              :key="index"
              :to="item.link"
            >{{item.title}}</router-link>

            <router-link tag="b-nav-item" to="/register">Daftar</router-link>
            <router-link tag="b-nav-item" to="/login">Login</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>-->

    <!-- Router view -->
    <div class="view">
      <router-view></router-view>
    </div>

    <!-- Footer -->
    <footer v-if="this.$route.path != '/listing' " class="footer">
      <div class="container is-fluid">
        <div class="columns is-desktop">
          <div class="column">
            <p class="title is-5">Perusahaan</p>
            <ul>
              <li>
                <a href="/login">Tentang Kami</a>
              </li>
              <li>
                <a href="#">Syarat & Ketentuan</a>
              </li>
              <li>
                <a href="#">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#">Karir</a>
              </li>
            </ul>
          </div>
          <div class="column">
            <p class="title is-5">Informasi & Bantuan</p>
            <ul>
              <li>
                <a href="#">Cara Pemesanan</a>
              </li>
              <li>
                <a href="#">Tips & Trik</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div class="column">
            <p class="title is-5">Hubungi Kami</p>
            <a href="kontak.html">
              <ul class="footMenu">
                <li>Senin - Jumat</li>
                <li>08.00 - 17.00 WIB</li>
                <li>Phone 061-2255xxxx</li>
                <li>support@propertybersama.co.id</li>
              </ul>
            </a>
          </div>
        </div>
        <div class="is-divider"></div>
        <p class="copyright">© Property Bersama. All right reserved</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app",
  data() {
    return {
      isFullPage: true,
      // If any user
      user: true,
      showNav: false,
      active: "",
      items: [
        // {
        //   title: "Daftarkan properti anda",
        //   link: "/"
        // },
        {
          title: "Beli",
          link: "/listing"
        },
        {
          title: "Disewa",
          link: "/disewa"
        },
        {
          title: "Property Baru",
          link: "/listing"
        },
        {
          title: "Berita",
          link: "/berita"
        }
      ],
      akun: [
        {
          title: "Profile",
          link: "/profile"
        }
      ]
    };
  },
  methods: {
    home() {
      event.preventDefault();
      this.showNav = false;
      this.$router.push("/");
    },
    isActive(name) {
      return this.active === name;
    },
    select(item) {
      event.preventDefault();
      this.showNav = false;
      this.active = item.title;
      this.$router.push(item.link);
    },
    logout() {
      this.$store.dispatch("login/logout").then(() => {
        this.$router.push("/login");
      });
    },
    login() {
      this.$router.push("/login");
    },
    tesGet() {
      let dataLogin = {
        user: "sanjaya.kiran@gmail.com",
        pass: "TddklS9g"
      };
      this.axios
        .get("http://administrator.propertybersama.com/member/detail")
        .then(res => {
          console.log(res);
        });
    },
    daftar() {
      this.$router.push("/about/daftarkan-properti-anda");
    },
    seeDetail(id) {
      this.$router.push("/listing/detail/" + id);
      this.$refs.dropdownLove.toggle();
    },
    removeItem(index) {
      this.$store.commit("love/delLoveItem", index);
    },
    deleteAll() {
      this.$store.commit("love/delAll");
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.login.isLoggedIn,
      love: state => state.love.love
    })
  }
};
</script>
<style lang="scss">
#app {
  min-height: 100vh;
}
.navbar {
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
}
.logo {
  padding: 0 !important;
  width: 200px;
  max-height: 100% !important;
}
.navbar-item img {
  max-height: 100% !important;
}
.logo img {
  width: 120px;
  height: auto;
  max-height: 100%;
}
.view {
  margin-top: 4.28rem !important;
}
.navbar-brand {
  padding: 0 !important;
}
.footer {
  background-color: #ebebeb !important;
  padding: 3rem 1.5rem !important;
}
</style>


