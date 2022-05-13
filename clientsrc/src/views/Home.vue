<template>
  <div class="home font-site bg-white">
    <div class="container-fluid">
      <div class="row choco align-items-center justify-content-center">
        <div class>
          <div class="col-4">
            <img class="img-fluid" src="../assets/songscoopcassette.png" alt />
          </div>
          <div class="justify-content-center">
            <h1 class="font-fancy py-2">Song Scoop</h1>
          </div>
          <div class="justify-content-center mt-4 mx-5">
            <p>
              You don't need to steal your friend's phone to put on decent
              music.
            </p>
          </div>
        </div>
      </div>
      <div class="row vanilla min-height py-5 align-items-center">
        <div class="col-12">
          <div id="btn1" class="border-pill-wrap my-5">
            <button class="btn btn-block p-4 btn-pill" @click="hostTrigger()">
              <h4>Create Session</h4>
            </button>
          </div>

          <div id="btn2" class="border-pill-wrap my-5">
            <button
              @click="movePage('SessionJoin')"
              class="btn btn-block p-4 btn-pill"
            >
              <h4>Join Session</h4>
            </button>
          </div>
        </div>
      </div>

      <div
        class="row fixed-bottom strawberry footer-size justify-content-center"
      >
        <small class="d-flex align-self-end justify-self-center my-2"
          >created by Tim, Grant, Tyler, & Mick</small
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "Home",
  data() {
    return {
      search: {},
    };
  },
  computed: {
    trackResults() {
      return this.$store.state.trackSearchResults;
    },
    profileExists() {
      if (this.$store.state.profile) {
        return this.$store.state.profile.email;
      } else {
        return false;
      }
    },
    url() {
      return location.origin.includes("localhost")
        ? "//localhost:3000/login"
        : "/login";
    },
  },
  components: {},
  mounted() {
    this.$store.dispatch("getSpotifyVisitorAuth");
    // this.startMusic();
    this.buttonShadow("btn1");
    this.buttonShadow("btn2");
  },
  methods: {
    async hostTrigger() {
      location.replace(this.url);
    },

    selectSong(track) {
      this.$store.dispatch("addToQueue", {
        album: track.album.name,
        songTitle: track.name,
        artist: track.artists[0].name,
        explicit: track.explicit,
        albumCover: track.album.images[0],
        trackLength: track.duration_ms,
        popularity: track.popularity,
        uri: track.uri,
        sessionCode: this.$route.params.code,
      });
    },
    movePage(page) {
      this.$router.push({ name: page });
    },
    async startSession() {
      let res = await fetch("http://localhost:3000/login");
      let { url } = await res.json();
      // console.log(url);
    },
    searchByArtist() {
      this.$store.dispatch("searchByArtist", {
        data: this.search.data,
      });
    },
    searchByAlbum() {
      this.$store.dispatch("searchByAlbum", {
        data: this.search.data,
      });
    },
    searchBySong() {
      this.$store.dispatch("searchBySong", {
        data: this.search.data,
      });
    },
    buttonShadow(id) {
      let text = document.getElementById(id);
      let shadow = "";
      let length = 170;
      for (let i = 0; i <= length; i++) {
        shadow +=
          (shadow ? "," : "") +
          i * 1 +
          "px " +
          i * 1 +
          "px 0 rgb(" +
          (246 - i * 0.004) +
          ", " +
          (101 + i * 0.149) +
          ", " +
          (153 - i * 0.3) +
          ")";
      }
      console.log(shadow);
      text.style.boxShadow = shadow;
      // (241, 250, 123)
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Monoton&family=Righteous&family=Rubik&display=swap");
body {
  background-color: var(--info);
  color: var(--black);
}
.font-site {
  font-family: "Rubik", sans-serif !important;
}
.font-fancy {
  font-family: "Monoton", cursive;
}
.choco {
  background-color: var(--warning);
}
.vanilla {
  background-color: var(--info);
}
.strawberry {
  background-color: var(--primary);
}

.btn-pill {
  color: var(--primary);
  background-color: var(--info);
  border-radius: 3em !important;
  transition: all 0.2s ease-in-out;
}
.btn-pill:active {
  color: var(--info);
  background-color: var(--warning);
  border-radius: 3em !important;
}

.btn-pill-search {
  color: var(--info);
  background-color: var(--primary);
  border-radius: 3em !important;
  transition: all 0.2s ease-in-out;
}
.btn-pill-search:active {
  color: var(--warning);
  background-color: var(--warning);
  border-radius: 3em !important;
}

.bg-fade {
  background-image: linear-gradient(
    to bottom left,
    var(--pink),
    rgb(253, 187, 171)
  );
}

.border-pill-wrap {
  border-radius: 3em;
  padding: 1rem;
  position: relative;
  background-image: linear-gradient(
    to bottom left,
    var(--pink),
    rgb(253, 187, 171)
  );
  padding: 3px;
  transition: transform 0.2s ease-in-out;
}

.border-pill-wrap:hover {
  transform: translateY(-5px);
}

.footer-size {
  min-height: 5em;
}
</style>
