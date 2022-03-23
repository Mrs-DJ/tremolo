<script>
    export let username
    export let name;
    export let location;
    export let instrument;
    export let bio;
</script>
  
  <div>
    <h2>{username}</h2>
    <p>{name}</p>
    <p>{location}</p>
    <p>{instrument}</p>
    <p>{bio.slice(0, 40) + "..."}</p>
  </div>