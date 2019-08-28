import { writable } from "svelte/store";

const themeStore = writable({
  roundedCorners: true,
  gradientBg: true,
  borders: true,
  shadows: false
});

export default themeStore;
