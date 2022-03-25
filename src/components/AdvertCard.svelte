<script>
  import { Link } from "svelte-routing";
  export let title;
  export let group;
  export let instruments;
  export let body;
  export let id;
</script>

<div>
  <Link to={`/advert/${id}`}><h2 class="text-xl font-bold">{title}</h2></Link>
  <!-- <h2 class="text-xl font-bold">{title}</h2> -->
  <p class="text-base text-m">{group}</p>
  <p class="text-xs">{instruments}</p>
  <p class="text-xs">{body.slice(0, 40) + "..."}</p>
</div>
