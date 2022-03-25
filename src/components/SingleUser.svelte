<script>
    export let username;
    export let name;
    export let location;
    export let instrument;
    export let bio;
</script>
  
  <div class="text-center">
    <h2 class="text-xl font-bold">{name}</h2>
    <p class="text-base text-m">{username}</p>
    <p class="text-xs">{instrument}</p>
    <p class="text-xs">{location}</p>
    <p class="text-xs">{bio}</p>
  </div>