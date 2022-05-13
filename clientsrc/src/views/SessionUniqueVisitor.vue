<template>
  <div
    class="SessionUniqueVisitor bg-info font-site container-fluid full-height rm-my"
  >
    <div class="row bg-warning"></div>

    <div class="row">
      <queue />
    </div>

    <div class="row align-items-center">
      <div class="col-12">
        <div class="row px-5 py-3">
          <div id="songModal" class="modal fade" tabindex="-1" role="dialog">
            <div
              class="modal-dialog modal-dialog-scrollable h-75"
              role="document"
            >
              <div class="modal-content bg-warning">
                <div class="modal-header">
                  <h5 class="modal-title"></h5>

                  <form
                    class="form-inline mr-5"
                    @submit.prevent="searchBySong()"
                  >
                    <input
                      v-model="search"
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      class="btn btn-outline-danger btn-block rounded-pill my-2 p-3"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>

                  <button
                    type="button"
                    @click="clearTrackResults(), clearSearch()"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div
                    class="m-2 p-2 row justify-content-between align-items-center btn-pill-search result"
                    @click.prevent="selectSong(result)"
                    v-for="result in trackResults"
                    :key="result.id"
                  >
                    <div class="col-2 ml-1">
                      <img
                        class="rounded img-fluid"
                        :src="result.album.images[0].url"
                        alt
                      />
                    </div>
                    <div class="col result-name">
                      {{ result.artists[0].name }}- {{ result.name }}
                    </div>
                    <div class="col-2">
                      <i class="fa fa-plus mt-1"></i>
                    </div>
                  </div>
                  <InfiniteLoading
                    v-if="!noLoadForYou && infiniteWait"
                    spinner="waveDots"
                    :identifier="infiniteId"
                    @infinite="infiniteHandler"
                  ></InfiniteLoading>
                  <div v-if="noLoadForYou">
                    <div class="row bg-primary justify-content-center">
                      End of results!
                    </div>
                  </div>
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn bg-fade p-3 text-info my-5 mx-4 add-button fixed-bottom"
            data-toggle="modal"
            data-target="#songModal"
            @click="yesLoadForYou"
          >
            <h2>
              <i class="pt-3 fa fa-plus"></i>
            </h2>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { onAuth } from "@bcwdev/auth0-vue";
import queue from "../components/Queue";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "SessionUniqueHost",
  data() {
    return {
      search: "",
      oldSearchLength: 0,
      noLoadForYou: false,
      infiniteWait: false,
      oldSearchTerm: 0,
      isLoading: false,
      infiniteId: "",
    };
  },

  // async beforeMount() {
  //   await this.hostCheck();
  // },

  mounted() {
    this.joinSessionVisitor();
    this.$store.dispatch("getSpotifyVisitorAuth");
    this.$store.dispatch("joinRoom", "session-" + this.$route.params.code);
    this.$store.dispatch("findActiveSong", this.$route.params.code);

    // this.$store.dispatch("getQueue", {
    //   sessionCode: this.$route.params.code
    // })
  },

  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
    trackResults() {
      return this.$store.state.trackSearchResults;
    },
  },
  methods: {
    yesLoadForYou() {
      this.noLoadForYou = false;
    },

    async infiniteHandler($state) {
      if (!this.isLoading && this.trackResults.length <= 50) {
        this.isLoading = true;
        await this.searchBySong();
        // this.getTrackResults((this.trackResults.length + 10));
        $state.loaded();
        console.log("load more");
      } else if (this.trackResults.length > 0) {
        console.log("no load");
        $state.complete();
        this.noLoadForYou = true;
      }

      // $state.loaded()
    },
    clearTrackResults() {
      this.$store.commit("clearTrackSearchResults");
      this.noLoadForYou = false;
      this.infiniteWait = false;
      // NOTE Mick- Do we still need these in a different place??
      // this.oldSearchLength = 0;
      // this.search = "";
    },

    // async hostCheck() {
    //   await onAuth();
    //   this.$store.dispatch("setBearer", this.$auth.bearer);
    //   this.$store.dispatch("getProfile", this.$auth.user);
    //   let email = await this.$store.dispatch(
    //     "getSessionEmail",
    //     this.$route.params.code
    //   );
    //   if (email == this.$auth.user.email) {
    //     await this.callTokens();
    //   }
    // },

    beforeDestory() {
      this.$store.dispatch("leaveRoom", "session");
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
        score: 0,
        sessionCode: this.$route.params.code,
      });
    },
    async searchBySong() {
      if (this.oldSearchTerm != this.search) {
        this.clearTrackResults();
        this.noLoadForYou = false;
        this.infiniteId = this.search;
      }
      this.oldSearchLength = this.trackResults.length;
      this.oldSearchTerm = this.search;
      console.log(this.trackResults.length);
      await this.$store.dispatch("searchBySong", {
        data: this.search,
        page: this.trackResults.length,
      });
      this.isLoading = false;
      this.infiniteWaited();
    },

    infiniteWaited() {
      this.infiniteWait = true;
    },

    // getTrackResults(offset){
    //   let offsetResults = this.$store.state.trackSearchResults[offset];
    //   console.log(offsetResults);

    // },

    // async callTokens() {
    //   if (this.$store.state.hostTokens.accessToken == false) {
    //     if (this.activeSession.creatorEmail == this.$auth.user.email) {
    //       await this.$store.dispatch("callDownTokens");
    //     } else {
    //       console.log("Not the host, no tokens for you");
    //     }
    //   }
    // },
    async joinSessionVisitor() {
      if (this.$route.params.code) {
        await this.$store.dispatch(
          "joinSessionVisitor",
          this.$route.params.code
        );
      } else {
        console.log("no route params code found");
      }
    },
  },

  components: {
    queue,
    InfiniteLoading,
  },
};
</script>



<style scoped>
.add-button {
  border-radius: 50%;
  width: 110px;
  height: 110px;
  z-index: 10;
}
.result {
  height: 8vh;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}
.result-name {
}

.result:active {
  background-color: var(--warning);
  border: 1px solid var(--primary);
}
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>