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
  <p class="text-base text-m">{group}
   | {instruments}</p>
  <p class="text-m">{body}</p>
  <Link to={`/User/${owner_id}`}><h2 class="advert-link">Owner's page</h2></Link>
</div>

<style>
  div {
    max-width: 80vw;
    margin: auto;
    border: 1px solid white;
  }

  .advert-link {
    font-size: 1rem;
    color: white;
  }

  .advert-link:hover {
    color: #00eaff;
    text-decoration: none;
  }

  p {
    text-align: left;
    margin-top: 1.5rem;
    padding: 10px;
  }
</style>
