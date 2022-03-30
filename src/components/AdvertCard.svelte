<script>
  import { Link } from "svelte-routing";
  export let title;
  export let group;
  export let instruments;
  export let body;
  export let id;
</script>

<div>
  <Link to={`/advert/${id}`}
    ><h2 class="card-header"><strong>{title}</strong></h2></Link
  >
  <span class="span-advert-card">
    <p class="text-base text-m">{group}</p>
    <p class="text-m">{instruments}</p>
  </span>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 3px;
    background-color: rgb(58, 55, 55);
  }

  .card-header {
    font-size: 1.5rem;
    color: white;
  }

  .span-advert-card {
    display: flex;
    justify-content: space-between;
  }

  div:hover {
    color: #00eaff;
    box-shadow: 0 3px 3px 0 #00eaff;
    transition: 0.5s;
  }

  div:hover .card-header {
    color: #00eaff;
    transition: 0.5s;
  }
</style>
