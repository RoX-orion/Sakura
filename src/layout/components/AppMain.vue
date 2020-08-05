<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div>
        <router-view :key="key" />
        <GithubCorner />
      </div>
    </transition>
  </section>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'AppMain',
  components: {
    GithubCorner
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }
  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
.github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>