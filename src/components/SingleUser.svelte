<script>
  export let id;
  export let username;
  export let name;
  export let location;
  export let instrument;
  export let bio;
  export let soundcloudUser;
  export let youtubeLink;
  import Chat from "./Chat.svelte";

  let showChat = false;

  function handleClick() {
    showChat = !showChat;
  }
</script>

<div class="text-center">
  <h2 class="text-xl font-bold">{name}</h2>
  <p class="text-base text-m">{username}</p>
  <p class="text-xs">{instrument}</p>
  <p class="text-xs">{location}</p>
  <p class="text-xs">{bio}</p>
  <p>{username} and {soundcloudUser} and {youtubeLink}</p>

  <i class="mi mi-message" on:click={handleClick} />
</div>




{#if soundcloudUser}

<div class="soundcloud">{username}'s Soundcloud<iframe allowtransparency="true" scrolling="no" frameborder="no" src={`https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F${soundcloudUser}&color=orange_white&size=64`} style="width: 64px; height: 64px;"></iframe></div>
{/if}

{#if youtubeLink}

<iframe class="youtube" width="560" height="315" src={`https://www.youtube.com/embed/${youtubeLink}`} title="YouTube video player" frameborder="50" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{/if}

{#if showChat}
  <Chat {id} />
{/if}

<style>
  .soundcloud {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
    padding: 5px;
    max-width: 90vw;
    margin: auto;
    justify-content: center;
    align-content: center;
  }

.youtube {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  padding: 5px;
  max-width: 90vw;
  margin: auto;
  justify-content: center;
  align-content: center;
}
</style>
 
