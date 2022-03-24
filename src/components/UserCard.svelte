<script>
    export let username
    export let name;
    export let location;
    export let instrument;
    export let bio;
</script>
  
  <div>
    <h2 class="text-xl font-bold">{username}</h2>
    <p class="text-base text-m">{name}</p>
    <p class="text-base text-m">{instrument}</p>
    <p class="text-base text-m">{location}</p>
    <p class="text-xs">{bio.slice(0, 40) + "..."}</p>
  </div>