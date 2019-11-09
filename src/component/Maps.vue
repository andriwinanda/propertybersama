<template>
  <div class="google-map" :id="mapName"></div>
</template>
<script>
import GoogleMapsLoader from "google-maps";
export default {
  name: "google-map",
  props: ["name", "markerCoordinates", "isActive"],
  data() {
    return {
      key: "AIzaSyB6jDL-cSc8H0pa8MnHwh1U9c_5MEKwmfA",
      mapName: this.name + "-map",
      // markerCoordinates: [
      //   {
      //     latitude: 51.501527,
      //     longitude: -0.1921837,
      //     price: 6600000
      //   },
      //   {
      //     latitude: 51.505874,
      //     longitude: -0.1838486,
      //     price: 5800000
      //   },
      //   {
      //     latitude: 51.4998973,
      //     longitude: -0.202432,
      //     price: 1000000
      //   }
      // ],
      map: null,
      bounds: null,
      markers: []
    };
  },
  computed() {
    this.markerCoordinates
  },
  methods: {
    mapMarker() {   
      if (this.markerCoordinates.length) {
        GoogleMapsLoader.KEY = this.key;
        GoogleMapsLoader.VERSION = "3.34";
        GoogleMapsLoader.load(google => {
          console.log(this.markerCoordinates);
          var MarkerWithLabel = require("markerwithlabel")(google.maps);
          this.bounds = new google.maps.LatLngBounds();
          const element = document.getElementById(this.mapName);
          const mapCentre = this.markerCoordinates[0];
          const options = {
            center: new google.maps.LatLng(
              mapCentre.latitude,
              mapCentre.longitude
            )
          };
          var infowindow = new google.maps.InfoWindow(); //Declare Info Window
          this.map = new google.maps.Map(element, options);
          this.markerCoordinates.forEach(coord => {
            const position = new google.maps.LatLng(
              coord.latitude,
              coord.longitude
            );

            const marker = new MarkerWithLabel({
              position,
              map: this.map,
              //   icon: goldStar,
              labelContent: `<div class="marker"><div class="labels ${this.isActive}">Rp. ${coord.price}</div> <div class="pin ${this.isActive}"></div></div>`, //   Label
              labelAnchor: new google.maps.Point(48, 96),
              labelClass: "", // the CSS class for the label
              labelVisible: true,
              icon: "none"
            });
            this.markers.push(marker);
            this.map.fitBounds(this.bounds.extend(position));

            // Info Window
            google.maps.event.addListener(marker, "click", () => {
              {
                infowindow.setContent(`<div class="columns infoListing is-multiline is-paddingless">
                          <div class="column is-3 is-paddingless">
                            <img class="imgList" width="70px" src="${coord.image}" alt="Placeholder image" />
                          </div>
                          <div class="column ket">
                            <p class="title is-6 listTitle is-size-6-mobile">${(coord.name).toUpperCase()}</p>
                            <p class="subtitle subListTitle is-7 has-text-grey">
                              <small>${coord.district}, ${coord.city}</small>
                            </p>
                            <div>
                            <span class="title is-6">
                              Rp ${coord.price} </span>
                              <a style="padding-left: 3px;" href="/listing/detail/${coord.id}" target="_blank">Detail »</a>
                            </div>`)
              }
        
            });
          });
         })
      
     }
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/style.scss";
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: gray;
}
.marker {
  position: relative;
  padding: 8px 10px;
}
.labels {
  position: relative;
  color: white;
  font-weight: bold;
  background-color: $primary;
  border-radius: 10px;
  text-align: center;
  font-size: 10pt;
  padding: 8px 10px;
  box-shadow: 2px 3px 8px rgba(10, 10, 10, 0.2) !important;
}
.labels.true {
  background-color: white !important;
  color: $primary !important;
}
.pin {
  position: absolute;
  top: 80%;
  left: 50%;
  margin-left: -10px;
  border-top: solid 10px $primary;
  border-left: solid 10px transparent;
  border-right: solid 10px transparent;
}
.pin.true {
  border-top: solid 10px white !important;
}

.imgList {
  min-height: 80%;
  height: auto;
  max-width: 100%;
}

// Window
.gm-style-iw-d {
  overflow: hidden !important;
  padding: 8px;
}
.ket {
  padding-top: 5px !important;
}
.infoListing {
  padding: 20px;
}
.listTitle {
  margin-bottom: 20px !important;
}
.subListTitle {
  margin-bottom: 5px !important;
}

.gm-style .gm-style-iw-t::after {
  background: none !important;
  box-shadow: none !important;
}
/* 
.pin {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #00cae9;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
}
.pin:after {
  content: "";
  width: 14px;
  height: 14px;
  margin: 8px 0 0 8px;
  background: #e6e6e6;
  position: absolute;
  border-radius: 50%;
}

.bounce {
  animation-name: bounce;
  animation-fill-mode: both;
  animation-duration: 1s;
} */
</style>