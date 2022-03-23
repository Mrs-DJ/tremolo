<script>
  export let title;
  export let group;
  export let instruments;
  export let body;
</script>

<div>
  <h2>{title}</h2>
  <p>{group}</p>
  <p>{instruments}</p>
  <p>{body.slice(0, 40) + "..."}</p>
</div>
