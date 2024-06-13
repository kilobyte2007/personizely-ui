export default {
  mounted (el: HTMLElement, { value }: { value: boolean }) {
    if (value) {
      requestAnimationFrame(() => el.focus())
    }
  }
}
