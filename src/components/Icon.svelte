<script>
  import feather from "feather-icons";
  import Box from "svelte-box";
  import { intentColors, fontSizes } from "./styles";

  export let type;
  export let intent = null;
  export let size = null;
  export let flip = null;

  $: className = `${flip === "x" ? "iconFlipX" : ""} ${
    flip === "y" ? "iconFlipY" : ""
  } ${flip === "xy" ? "iconFlipXy" : ""} ${
    type === "loader" ? "iconTypeLoader" : ""
  }`;

  $: text = intent ? intentColors[intent] : null;

  $: font = size ? fontSizes[size] : null;

  let element;

  $: {
    const icon = feather.icons[type];

    if (icon) {
      element = icon.toSvg({
        class: "iconClass relative inline stroke-current",
        width: "1em",
        height: "1em"
      });
    } else {
      element = null;
    }
  }
</script>

<style>
  :global(.iconClass) {
    top: -0.1em;
  }

  :global(.iconTypeLoader) {
    animation-name: iconTypeLoader;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes -global-iconTypeLoader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  :global(.iconFlipX) {
    transform: scale(-1, 1);
  }

  :global(.iconFlipY) {
    transform: scale(1, -1);
  }

  :global(.iconFlipXy) {
    transform: scale(-1, -1);
  }
</style>

<Box class="{className}" display="inline-block" {text} {font}>
  {@html element}
</Box>
