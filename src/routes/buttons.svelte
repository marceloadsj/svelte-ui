<script>
  import { onMount } from "svelte";
  import feather from "feather-icons";
  import Button from "../components/Button.svelte";
  import themeStore from "../components/themeStore";

  function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  const intents = [null, "info", "success", "warning", "danger"];
  const appearances = [null, "ghost", "minimal"];
  const sizes = ["xs", "sm", "md", "lg", "xl"];

  let intent = intents[0];
  let appearance = appearances[0];
  let size = sizes[0];
  let block = false;
  let icon = null;
  let iconAfter = null;
  let loading = false;
  let slot = "Button";

  function randomizeProps() {
    intent = getRandomItem(intents);
    appearance = getRandomItem(appearances);
    size = getRandomItem(sizes);
    icon = getRandomItem(Object.keys(feather.icons));

    slot = getRandomItem([
      "Login",
      "Logout",
      "Register",
      "Submit",
      "Save",
      "Delete",
      "Open",
      "Close",
      "Next",
      "Previous"
    ]);
  }

  onMount(randomizeProps);
</script>

<div class="flex p-5">
  <div class="flex-1 border shadow p-5 rounded">
    <div class="mb-5 clearfix">
      <Button icon="grid" on:click="{randomizeProps}" float="right">
        Randomize Props
      </Button>
    </div>

    <div class="mb-5">
      <p>Intents:</p>

      {#each intents as item}
      <label class="mr-5">
        <input type="radio" bind:group="{intent}" value="{item}" />
        {item}
      </label>
      {/each}
    </div>

    <div class="mb-5">
      <p>Appearances:</p>

      {#each appearances as item}
      <label class="mr-5">
        <input type="radio" bind:group="{appearance}" value="{item}" />
        {item}
      </label>
      {/each}
    </div>

    <div class="mb-5">
      <p>Sizes:</p>

      {#each sizes as item}
      <label class="mr-5">
        <input type="radio" bind:group="{size}" value="{item}" />
        {item}
      </label>
      {/each}
    </div>

    <div class="mb-5">
      <p>Icons (feathericons.com):</p>

      <label class="mr-5">
        Icon:
        <input bind:value="{icon}" class="bg-gray-100" />
      </label>

      <label class="mr-5">
        Icon After:
        <input bind:value="{iconAfter}" class="bg-gray-100" />
      </label>
    </div>

    <div class="mb-5">
      <label class="mr-5">
        Slot:
        <input bind:value="{slot}" class="bg-gray-100" />
      </label>
    </div>

    <div class="mb-5">
      <label>Loading: <input type="checkbox" bind:checked="{loading}"/></label>
    </div>

    <div class="mb-5">
      <label>Block: <input type="checkbox" bind:checked="{block}"/></label>
    </div>

    <div class="mb-5">
      <label
        >Rounded Corners:
        <input type="checkbox" bind:checked="{$themeStore.roundedCorners}"
      /></label>
    </div>

    <div class="mb-5">
      <label
        >Gradient Bg:
        <input type="checkbox" bind:checked="{$themeStore.gradientBg}"
      /></label>
    </div>

    <div class="mb-5">
      <label
        >Borders: <input type="checkbox" bind:checked="{$themeStore.borders}"
      /></label>
    </div>

    <div class="mb-5">
      <label
        >Shadows: <input type="checkbox" bind:checked="{$themeStore.shadows}"
      /></label>
    </div>
  </div>

  <div class="ml-5"></div>

  <div
    class="flex-1 flex items-center justify-center border shadow rounded p-5"
  >
    <Button {intent} {appearance} {size} {icon} {iconAfter} {loading} {block}
      >{slot}</Button
    >
  </div>
</div>
