<template>
  <div @click.stop="closeLightBox">
    <transition
      mode="out-in"
      name="vib-container-transition"
    >
      <div
        v-if="true"
        v-show="lightBoxShown"
        ref="container"
        class="vib-container"
      >
        <div
          class="vib-content"
          @click.stop
        >
          <transition
            mode="out-in"
            :name="imageTransitionName"
          >
            <img
              v-if="currentMedia.type == undefined || currentMedia.type == 'image'"
              :key="currentMedia.src"
              :src="currentMedia.src"
              :srcset="currentMedia.srcset || ''"
              class="vib-image"
              :alt="currentMedia.caption"
            >
            <div
              v-else-if="currentMedia.type == 'youtube'"
              class="video-background"
            >
              <iframe
                :src="'https://www.youtube.com/embed/' + currentMedia.id + '?showinfo=0'"
                width="560"
                height="315"
                frameborder="0"
                allowfullscreen
              />
            </div>
            <video
              v-else-if="currentMedia.type == 'video'"
              :key="currentMedia.sources[0].src"
              ref="video"
              controls
              :width="currentMedia.width"
              :height="currentMedia.height"
              :autoplay="currentMedia.autoplay"
            >
              <source
                v-for="source in currentMedia.sources"
                :key="source.src"
                :src="source.src"
                :type="source.type"
              >
            </video>
          </transition>
        </div> <!-- .vib-content -->

        <button
          v-if="closable"
          type="button"
          :title="closeText"
          class="vib-close vib-hideable"
          :class="{ 'vib-hidden': controlsHidden }"
          @mouseover="interfaceHovered = true"
          @mouseleave="interfaceHovered = false"
        >
          <slot name="close">
            <CloseIcon />
          </slot>
        </button>
      </div> <!-- .vib-container -->
    </transition>
  </div>
</template>

<script>
import CloseIcon from './CloseIcon'


export default {
  components: {
    CloseIcon,
  },

  props: {

    disableScroll: {
      type: Boolean,
      default: true,
    },

    showLightBox: {
      type: Boolean,
      default: true,
    },

    closable: {
      type: Boolean,
      default: true,
    },

    startAt: {
      type: Number,
      default: 0,
    },

    nThumbs: {
      type: Number,
      default: 7,
    },

    showThumbs: {
      type: Boolean,
      default: true,
    },

    // Mode
    autoPlay: {
      type: Boolean,
      default: false,
    },

    autoPlayTime: {
      type: Number,
      default: 3000,
    },

    interfaceHideTime: {
      type: Number,
      default: 3000,
    },

    showCaption: {
      type: Boolean,
      default: false,
    },

    lengthToLoadMore: {
      type: Number,
      default: 0
    },

    closeText: {
      type: String,
      default: 'Close (Esc)'
    },

    previousText: {
      type: String,
      default: 'Previous',
    },

    nextText: {
      type: String,
      default: 'Next',
    },
  },

  data() {
    return {
      select: this.startAt,
      lightBoxShown: this.showLightBox,
      controlsHidden: false,
      imageTransitionName: 'vib-image-no-transition',
      timer: null,
      interactionTimer: null,
      interfaceHovered: false,
      currentMedia: { src: "https://i.imgur.com/UrLK1QG.jpg", id: 0, type: "image", srcset: "", caption: ""}
    }
  },

  watch: {
    lightBoxShown(value) {
      // istanbul ignore else
      if (document != null) {
        this.onToggleLightBox(value)
      }
    },

  },

  mounted() {
    if (this.autoPlay) {
      this.timer = setInterval(this.nextImage, this.autoPlayTime)
    }

    this.onToggleLightBox(this.lightBoxShown)

    if (this.$refs.container) {
      this.$refs.container.addEventListener('mousedown', this.handleMouseActivity);
      this.$refs.container.addEventListener('mousemove', this.handleMouseActivity);
      this.$refs.container.addEventListener('touchmove', this.handleMouseActivity);
    }
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.addKeyEvent)

    if (this.autoPlay) {
      clearInterval(this.timer)
    }

    if (this.$refs.container) {
      this.$refs.container.removeEventListener('mousedown', this.handleMouseActivity);
      this.$refs.container.removeEventListener('mousemove', this.handleMouseActivity);
      this.$refs.container.removeEventListener('touchmove', this.handleMouseActivity);
    }
  },

  methods: {
    onLightBoxOpen() {
      this.$emit('onOpened')

      if (this.disableScroll) {
        document.querySelector('html').classList.add('no-scroll')
      }

      document.querySelector('body').classList.add('vib-open')
      document.addEventListener('keydown', this.addKeyEvent)

      if (this.$refs.video && this.$refs.video.autoplay) {
        this.$refs.video.play()
      }
    },

    onLightBoxClose() {
      this.$emit('onClosed')

      if (this.disableScroll) {
        document.querySelector('html').classList.remove('no-scroll')
      }

      document.querySelector('body').classList.remove('vib-open')
      document.removeEventListener('keydown', this.addKeyEvent)

      if (this.$refs.video) {
        this.$refs.video.pause()
        this.$refs.video.currentTime = '0'
      }
    },

    onToggleLightBox(value) {
      if (value) this.onLightBoxOpen()
      else this.onLightBoxClose()
    },

    showImage(imgObj) {
      this.currentMedia = imgObj
      this.controlsHidden = false
      this.lightBoxShown = true
    },

    addKeyEvent(event) {
      switch (event.keyCode) {
        case 27: // esc
          this.closeLightBox()
          break
      }
    },

    closeLightBox() {
      if (this.$refs.video)
        this.$refs.video.pause();
      if (!this.closable) return;
      this.$set(this, 'lightBoxShown', false)
    },

    handleMouseActivity() {
      clearTimeout(this.interactionTimer);

      if (this.controlsHidden) {
        this.controlsHidden = false
      }

      if (this.interfaceHovered) {
        this.stopInteractionTimer()
      } else {
        this.startInteractionTimer()
      }
    },

    startInteractionTimer() {
      this.interactionTimer = setTimeout(() => {
        this.controlsHidden = true
      }, this.interfaceHideTime)
    },

    stopInteractionTimer() {
      this.interactionTimer = null
    },
  },
}
</script>

<style>
/* general style */

.vib-open {
  overflow: hidden;
}

.no-scroll {
  overflow-y: hidden;
}

.vib-hideable {
  transition: opacity .5s ease;
}

.vib-hidden {
  opacity: 0;
}

/* elements styling */

.vib-container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85);
  box-sizing: border-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2000;
  -webkit-align-items: center;
  -moz-box-sizing: border-box;
  -webkit-justify-content: center;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
}

.vib-content {
  position: relative;
  margin: 0;
  display: block;
}

.vib-image {
  cursor: pointer;
  max-height: calc(100vh);
  cursor: pointer;
  display: block;
  height: auto;
  margin: 0 auto;
  max-width: 100%;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vib-thumbnail-wrapper {
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 12px;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  display: inline-block;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  top: 0px;
}

.vib-thumbnail {
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px hsla(0,0%,100%,.2);
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px 2px 0 2px;
  overflow: hidden;
  width: 50px;
}

.vib-thumbnail-active {
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px white;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px 2px 0 2px;
  overflow: hidden;
  width: 50px;
}

.vib-footer {
  box-sizing: border-box;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  line-height: 1.3;
  padding: 10px;
  justify-content: space-between;
  text-align: left;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.vib-footer-count {
  flex-shrink: 0;
  padding-left: 1em;
}

.vib-close {
  background: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  outline: none;
  position: fixed;
  top: 0;
  right: 0;
  vertical-align: bottom;
  height: 65px;
  width: 60px;
  padding: 15px 12px 15px 20px;
  border-bottom-left-radius: 50%;
}

.vib-arrow {
  background: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  user-select: none;
  height: 65px;
  margin-top: -60px;
  width: 60px;
}

.vib-arrow-left {
  left: 0;
  padding-right: 20px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

.vib-arrow-right {
  right: 0;
  padding-left: 20px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}

@media (min-width: 500px) {
  .vib-thumbnail-arrow {
    width: 40px;
  }
}

@media (min-width: 768px) {
  .vib-arrow {
      width: 60px;
  }
}

/* image transitions */

.vib-image-transition-enter-active,
.vib-image-transition-leave-active {
  transition: opacity .2s ease;
}

.vib-image-transition-enter,
.vib-image-transition-leave-to {
  opacity: 0;
}

.vib-image-no-transition-enter-active,
.vib-image-no-transition-leave-active {
  transition: none;
}

.vib-image-no-transition-enter,
.vib-image-no-transition-leave-to {
  opacity: 0;
}

/* container transitions */

.vib-container-transition-enter-active,
.vib-container-transition-leave-active {
  transition: opacity .3s ease;
}

.vib-container-transition-enter,
.vib-container-transition-leave-to {
  opacity: 0;
}

.video-background {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  width: calc(90vw);
  height: calc(90vh);
}

.video-background iframe {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 50.25vw;
  max-height: 100vh;
  max-width: 182.78vh;
}

</style>
