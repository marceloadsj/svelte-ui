<script>
  import Box from "svelte-box";
  import Icon from "./Icon.svelte";
  import { omit } from "./utils";
  import themeStore from "./themeStore";
  import {
    intentColors,
    intentHoverColors,
    intentActiveColors,
    fontSizes
  } from "./styles";

  export let icon = null;
  export let iconAfter = null;
  export let block = false;
  export let size = "md";
  export let loading = false;
  export let appearance = null;
  export let intent = null;

  $: props = omit($$props, [
    "icon",
    "iconAfter",
    "block",
    "size",
    "loading",
    "appearance",
    "intent"
  ]);

  $: w = block && "full";

  $: borderW = $themeStore.borders && appearance !== "minimal";

  $: cursor = loading && "not-allowed";

  const sizes = {
    xs: [1, 0],
    sm: [1, 0],
    md: [2, 1],
    lg: [2, 2],
    xl: [3, 3]
  };

  let px, py, font;

  $: {
    if (size) {
      [px, py] = sizes[size];
      font = fontSizes[size];
    } else {
      px = null;
      py = null;
      font = null;
    }
  }

  let text;

  $: {
    if (loading || (appearance && !intent)) {
      text = intentColors.null;
    } else if (intent && appearance) {
      text = intentColors[intent];
    } else {
      text = "white";
    }
  }

  let bg, bg_hover, border, border_hover;

  $: {
    bg = null;
    bg_hover = null;
    border = null;
    border_hover = null;

    if (loading) {
      bg = "gray-100";

      if ($themeStore.borders) border = "gray-200";
    } else if (!appearance) {
      bg = intentColors[intent];
      bg_hover = intentHoverColors[intent];

      if ($themeStore.borders) {
        border = intentActiveColors[intent];
        border_hover = intentColors[intent];
      }
    }
  }

  let className;

  $: {
    className = null;

    if (!loading) {
      if (appearance === "minimal" || !$themeStore.gradientBg) {
        className = "buttonBgFlat";
      } else if ($themeStore.gradientBg) {
        className = "buttonBgGradient";
      }
    }
  }
</script>

<style>
  :global(.buttonBgGradient) {
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05));
  }

  :global(.buttonBgGradient:hover) {
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.02));
  }

  :global(.buttonBgGradient:active) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02));
  }

  :global(.buttonBgFlat:active) {
    background-color: rgba(0, 0, 0, 0.02);
  }
</style>

<Box
  tag="button"
  {w}
  {bg}
  {bg_hover}
  {border}
  {border_hover}
  {borderW}
  {font}
  {text}
  {cursor}
  shadow="{$themeStore.shadows}"
  rounded="{$themeStore.roundedCorners}"
  outline="none"
  shadow:focus="outline"
  overflow="hidden"
  disabled="{loading}"
  {...props}
  on:click
>
  <Box {px} {py} class="{className}">
    {#if loading}
    <Icon type="loader"></Icon>
    {:else if icon}
    <span>
      <Icon type="{icon}"></Icon>
    </span>
    {/if}

    <slot></slot>

    {#if iconAfter}
    <Icon type="{iconAfter}"></Icon>
    {/if}
  </Box>
</Box>
