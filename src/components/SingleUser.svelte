<script>
    export let username;
    export let name;
    export let location;
    export let instrument;
    export let bio;
    import Chat from "./Chat.svelte";

    let showChat = false;

    function handleClick() {
      console.log("clicked");
      showChat = true;
    }
    </script>
      
  
  <div class="text-center">
    <h2 class="text-xl font-bold">{name}</h2>
    <p class="text-base text-m">{username}</p>
    <p class="text-xs">{instrument}</p>
    <p class="text-xs">{location}</p>
    <p class="text-xs">{bio}</p>
    <button on:click={handleClick}>
    <i class="mi mi-message"></i>
  </button>
  </div>
    {#if showChat}
    <Chat />
    {/if}
