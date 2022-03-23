<script>
  export let title;
  export let group;
  export let instruments;
  export let body;
</script>

<div>
  <h2 class="text-xl font-bold">{title}</h2>
  <p class="text-base text-m">{group}</p>
  <p class="text-xs">{instruments}</p>
  <p class="text-xs">{body.slice(0, 40) + "..."}</p>
</div>
