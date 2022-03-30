<script>
  import { Link } from "svelte-routing";
  export let username;
  export let name;
  export let location;
  export let instrument;
  export let bio;
  export let id;
</script>

<div>
  <Link to={`/User/${id}`}><h2 class="card-header">{username}</h2></Link>
  <p class="text-base text-m">{name}</p>
  <p class="text-base text-m">{instrument}</p>
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