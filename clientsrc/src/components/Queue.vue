<template>
  <div class="Queue col-12">
    <div class="row bg-warning">
      <!-- SECTION If there IS a queue or track length -->
      <div
        v-if="
          (this.activeSession.queue && this.activeSession.queue.length > 0) ||
          this.activeSong.trackLength
        "
      >
        <div class="row player">
          <div class="col-1"></div>
          <div class="col-3 align-self-center">
            <img
              class="rounded img-thumbnail img-fluid"
              :src="activeSong.albumCover.url"
              alt
            />
          </div>

          <div class="col-7">
            <div class="row mb-0 mt-2 justify-content-center text-primary">
              <h4>{{ activeSong.songTitle }}</h4>
            </div>
            <div class="row justify-content-center">
              {{ activeSong.artist }}
            </div>
            <div class="row justify-content-center">
              Album: {{ activeSong.album }}
            </div>
            <!-- <div class="row justify-content-center">
              Track Length:
              {{ Math.round((activeSong.trackLength / 1000 / 60) * 100) / 100 }}
            </div> -->
            <div class="col-12 my-3">
              <div class="row align-items-center w-100">
                <div class="col-12 song-track w-100"></div>
                <div
                  class="track-ball"
                  :style="'right:' + trackBallPos + '%'"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
        <div
          v-if="$store.state.hostTokens.accessToken !== ''"
          class="row justify-content-center pb-2"
        >
          <div class="col-1"></div>

          <div class="col-4">
            <button
              @click="playpause"
              class="btn btn-outline-primary rounded-pill p-2"
            >
              Play/Pause
            </button>
          </div>
          <div class="col-2"></div>

          <div class="col-4">
            <button
              @click="skipSong"
              class="btn btn-outline-primary rounded-pill p-2"
            >
              Skip
            </button>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <!-- SECTION If there is NO queue or NO track length -->
      <div v-else>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-3 align-self-center">
            <img
              class="rounded img-thumbnail img-fluid"
              src="https://images.squarespace-cdn.com/content/5d2e2c5ef24531000113c2a4/1564770252898-1KLCZDE9BJRSWDSMIM7L/image-asset.png"
              alt
            />
          </div>
          <div class="col-7">
            <div class="row justify-content-center">
              <h3>Playing</h3>
            </div>
            <div class="row justify-content-center">Title:</div>
            <div class="row justify-content-center">Album:</div>
            <!-- <div class="row justify-content-center">Track Length:</div> -->
          </div>
          <div class="col-1"></div>
        </div>
        <div
          class="row justify-content-center"
          v-if="$store.state.hostTokens.accessToken !== ''"
        >
          <div class="col-1"></div>

          <div class="col-4">
            <button class="btn btn-outline-secondary rounded-pill">
              Play/Pause
            </button>
          </div>
          <div class="col-2"></div>

          <div class="col-4">
            <button class="btn btn-outline-secondary rounded-pill">Skip</button>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <transition-group name="songs">
          <songs
            v-for="singleSong in songsQueue"
            :songData="singleSong"
            :key="singleSong.uri"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template> 


<script>
import songs from "../components/Songs";
export default {
  name: "Queue",
  data() {
    return {
      queueExist: false,
    };
  },
  mounted() {
    // this.startSong();
  },
  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
    songsQueue() {
      if (this.$store.state.activeSession.queue.length >= 1) {
        this.queueExist = true;
        let sorted = this.$store.state.activeSession.queue.sort(
          (a, b) => b.score - a.score
        );
        return sorted;
      }
      return [];
    },
    activeSong() {
      return this.$store.state.activeSong;
    },
    trackBallPos() {
      return this.$store.state.trackBallPos;
    },
  },
  methods: {
    playpause() {
      this.$store.commit("playpause");
    },
    startSong() {
      if (this.songsQueue.length > 0) {
        this.$store.dispatch("getActiveSong", this.songsQueue[0]);
      }
    },
    skipSong() {
      // console.log("song skip?");
      this.$store.dispatch("changeSong", this.songsQueue[0]);
      this.songPos = 0;
    },

    // trackTime(trackMs) {
    //   let format = Math.round((trackMs / 1000 / 60) * 100) / 100;
    //   let string = format.toString.split(".");
    //   return string[0] + ":" + string[1] ? string[1] : "";
    // },

    // pauseSong() {

    // }

    // songsQueued(){
    //   if(this.$store.state.activeSession.queue.length >= 0){
    //     this.queue = true
    //   } else {
    //     this.queue = false
    //   }
    // }
  },
  components: {
    songs,
  },
};
</script>


<style scoped>
.player {
  max-height: 30vh;
}

.overflowy {
  overflow-y: auto;
}

.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}

.song-enter-active {
  transition: all 0.3s ease;
}

.song-leave-active {
  transition: all 0.3s ease;
}

.song-enter,
.song-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

.song-track {
  height: 2px;
  width: 120%;
  border-radius: 1px;
  background-color: var(--info);
}

.track-ball {
  transition: all linear 1s;
  position: absolute;
  width: 0.75em;
  height: 0.75em;
  background-color: var(--warning);
  border: var(--primary) 2px solid;
  border-radius: 50%;
}
</style>