<script>
  import { onMount } from "svelte";
  import feather from "feather-icons";
  import Icon from "../components/Icon.svelte";
  import Button from "../components/Button.svelte";

  function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  const intents = [null, "info", "success", "warning", "danger"];
  const sizes = [null, "xs", "sm", "md", "lg", "xl"];
  const flips = [null, "x", "y", "xy"];

  let intent = intents[0];
  let size = sizes[0];
  let type = "loader";
  let flip = flips[0];

  function randomizeProps() {
    intent = getRandomItem(intents);
    size = getRandomItem(sizes);
    type = getRandomItem(Object.keys(feather.icons));
    flip = getRandomItem(flips);
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
      <p>Sizes:</p>

      {#each sizes as item}
      <label class="mr-5">
        <input type="radio" bind:group="{size}" value="{item}" />
        {item}
      </label>
      {/each}
    </div>

    <div class="mb-5">
      <p>Flips:</p>

      {#each flips as item}
      <label class="mr-5">
        <input type="radio" bind:group="{flip}" value="{item}" />
        {item}
      </label>
      {/each}
    </div>

    <div class="mb-5">
      <label
        >Type (feathericons.com):
        <input bind:value="{type}" class="bg-gray-100" />
      </label>
    </div>
  </div>

  <div class="ml-5"></div>

  <div
    class="flex-1 flex items-center justify-center border shadow rounded p-5"
  >
    <Icon {intent} {size} {type} {flip}></Icon>
  </div>
</div>
