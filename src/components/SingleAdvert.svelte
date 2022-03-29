<script>
  import {Link} from "svelte-routing";
  export let title;
  export let group;
  export let instruments;
  export let body;
  export let owner_id;
</script>

<div class="text-center">
  <h2 class="text-xl font-bold">{title}</h2>
  <p class="text-base text-m">{group}</p>
  <p class="text-xs">{instruments}</p>
  <p class="text-xs">{body}</p>
  <Link to={`/User/${owner_id}`}><h2 class="text-xl font-bold">Go to owner's page and talk directly!</h2></Link>
</div>
