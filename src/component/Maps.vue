<template>
  <div class="google-map" :id="mapName"></div>
</template>
<script>
import GoogleMapsLoader from "google-maps";
export default {
  name: "google-map",
  props: ["name", "markerCoordinates"],
  data() {
    return {
      key: "AIzaSyBrwH84_R7syzRNb1xQw60npKYK7Gsa2es",
      mapName: this.name + "-map",
      markerCoordinates: [
        {
          latitude: 51.501527,
          longitude: -0.1921837
        },
        {
          latitude: 51.505874,
          longitude: -0.1838486
        },
        {
          latitude: 51.4998973,
          longitude: -0.202432
        }
      ],
      map: null,
      bounds: null,
      markers: []
    };
  },
  mounted() {
    GoogleMapsLoader.KEY = this.key;
    GoogleMapsLoader.VERSION = "3.34";
    GoogleMapsLoader.load(google => {
      var MarkerWithLabel = require("markerwithlabel")(google.maps);
      this.bounds = new google.maps.LatLngBounds();
      const element = document.getElementById(this.mapName);
      const mapCentre = this.markerCoordinates[0];
      const options = {
        center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
      };
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
          labelContent: "<b>Rp. 500.000.000</b>", //   Label
          labelAnchor: new google.maps.Point(22, 0),
          labelClass: "labels", // the CSS class for the label
          labelVisible: true,
          icon: "none"
        });
        this.markers.push(marker);
        this.map.fitBounds(this.bounds.extend(position));
      });
    });
  }
};
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: gray;
}
.labels {
  color: #daa000 !important;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  font-size: 9pt;
  padding: 8px 10px;
  box-shadow: 2px 3px 8px rgba(10, 10, 10, 0.2) !important;
  border: 2px solid #daa000;
}
</style>