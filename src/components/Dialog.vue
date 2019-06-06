<template>
  <div>
    <md-dialog :md-active.sync="showMe">
      <md-dialog-title>{{ title }}</md-dialog-title>

      <md-content>{{ content }}</md-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="close">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",

  props: {
    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    show: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      showMe: false
    };
  },

  methods: {
    close() {
      this.showMe = false;
      this.$emit("closed");
    }
  },

  watch: {
    show: {
      immediate: true,
      handler(value) {
        this.showMe = value;
      }
    }
  }
};
</script>

<style scoped>
.md-content {
  padding: 24px;
}
</style>
