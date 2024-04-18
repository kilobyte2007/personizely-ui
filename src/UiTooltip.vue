<template>
  <div class="ui-tooltip">
    <slot></slot>
  </div>
</template>

<script>
import tippy from "tippy.js";
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/scale.css';

import elementRef from "./helpers/element-ref";

export default {
  name: "UiTooltip",

  props: {
    animation: {
      type: String,
      default: "fade", // 'fade', 'shift-away', 'scale' or 'none'
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    openOn: {
      type: String,
      default: "mouseenter focus", // 'mouseenter', 'focus', 'click', or 'manual', plus 'hover' (compat)
    },
    position: {
      type: String,
      default: "bottom", // 'top', 'right', 'bottom', 'left', 'top-{start|end}', 'right-{start|end}', etc.
    },
    trigger: {
      validator(value) {
        return elementRef.validate(
          value,
          '[UiTooltip]: Invalid prop: "trigger". Expected Element, VueComponent or CSS selector string.'
        );
      },
    },
    zIndex: Number,
  },

  mounted() {
    this.triggerEl = elementRef.resolve(this.trigger, this.$el.parentElement);

    if (!this.triggerEl) {
      console.error("[UiTooltip]: Trigger element not found.");
      return;
    }

    // When the element is placed inside a shadow DOM node we need to attach the popover to its root instead of the document root
    const body =
      this.triggerEl.getRootNode() === document ? document.body : this.triggerEl.getRootNode();

    const options = {
      appendTo: this.appendToBody ? body : this.triggerEl.parentElement,
      arrow: false,
      content: this.$el,
      delay: [this.openDelay, 0],
      offset: [0, 4],
      duration: this.animation === "none" ? 0 : [250, 200],
      ignoreAttributes: true,
      placement: this.position,
      theme: "ui-tooltip",
      trigger: this.openOn.replace("hover", "mouseenter"),
      zIndex: this.zIndex,
      popperOptions: {
        modifiers: [
          {
            name: "computeStyles",
            options: {
              // Disable GPU acceleration to fix blurry text in popover on Windows (Chrome)
              // https://github.com/twbs/bootstrap/issues/23590
              gpuAcceleration: !(window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform))
            }
          }
        ]
      },
    };

    if (!['none', 'fade'].includes(this.animation)) {
      options.animation = this.animation
    }

    this.tip = tippy(this.triggerEl, options);
  },

  beforeUnmount() {
    if (this.tip) {
      this.tip.destroy();
      this.tip = null;
    }
  },
};
</script>

<style lang="scss">
@import "./styles/imports";
@import "./styles/tippy/tippy";

.tippy-box[data-theme='ui-tooltip'] {
  background-color: rgba($md-grey-900, 0.9);
  border-radius: $ui-default-border-radius;
  color: white;
  font-size: rem(13px);
  line-height: 1.4;
  padding: 0.3rem rem(8px);
  text-align: center;

  .tippy-backdrop {
    background-color: rgba($md-grey-900, 0.9);
  }
}
</style>
