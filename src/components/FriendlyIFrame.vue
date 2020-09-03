<template>
<div class="vue-friendly-iframe">
</div>
</template>

<script>
/* eslint-disable */
import uuidV1 from 'uuid/v1';
function generateGuid() {
  return uuidV1();
}
export default {
  name: 'friendly-iframe',
  props: {
    script: {
      type: Array,
      required: false,
      default: []
    },
    crossorigin: {
      type: String,
      required: false,
      default: 'anonymous'
    },
    target: {
      type: String,
      required: false,
      default: '_parent'
    },
    className: {
      type: String,
      required: false
    },
    allow: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      iframeEl: null,
      iframeLoadedMessage: `IFRAME_LOADED_${generateGuid()}`,
      iframeOnReadyStateChangeMessage: `IFRAME_ON_READ_STATE_CHANGE_${generateGuid()}`
    };
  },
  computed: {},
  methods: {
    removeIframe() {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }
    },
    setIframeUrl() {

      var scriptTags = '';
      this.script.forEach(element => {
          scriptTags += '<script type="text\/javascript" src="' + element + '"><\/script>';
      });

      const iframeDoc = this.iframeEl.contentWindow.document;
      iframeDoc.open()
        .write(
          `
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>Swarm Visualization<\/title>
            <\/head>
            <body onload="parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>
            <script>
                window.document.onreadystatechange = function () {
                    if (window.document.readyState === 'complete') {
                    parent.postMessage('${this.iframeOnReadyStateChangeMessage}', '*')
                    }
                };
            <\/script>
            ${scriptTags}
          `
        );
      iframeDoc.close(); //iframe onload event happens
    },
    initIframe() {
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('style', 'visibility: hidden; position: absolute; top: -99999px; border: none;');
      if (this.className) this.iframeEl.setAttribute('class', this.className);
      if (this.class) this.iframeEl.setAttribute('class', this.class);
      if (this.crossorigin) this.iframeEl.setAttribute('crossorigin', this.crossorigin);
      if (this.target) this.iframeEl.setAttribute('target', this.target);
      if (this.allow) this.iframeEl.setAttribute('allow', this.allow);
      if (this.name) this.iframeEl.setAttribute('name', this.name);
      if (this.width) this.iframeEl.setAttribute('width', this.width);
      if (this.height) this.iframeEl.setAttribute('height', this.height);
      this.$el.appendChild(this.iframeEl);
      this.setIframeUrl();
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      const eventer = window[eventMethod];
      const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
      // Listen to message from child window
      eventer(messageEvent, event => {
        if (event.data === this.iframeLoadedMessage) {
          this.$emit('iframe-load');
          this.iframeEl.setAttribute('style', 'visibility: visible; border: none;');
        }
        if (event.data === this.iframeOnReadyStateChangeMessage) {
          this.$emit('load');
        }
      }, false);
    }
  },
  mounted() {
    this.listenForEvents();
    this.initIframe();
  }
};
</script>