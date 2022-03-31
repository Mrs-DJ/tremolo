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

<div>
  <h1>{name}</h1>
  <div class="chat-inline" on:click={handleClick}>
    <i class="mi mi-message"  />
    <p class="chat-text">Chat</p>
  </div>
  <p class="text-base text-m">{username}</p>
  <p>{instrument.map((instrument) => {
    return ` ${instrument}`;
  })}</p>
  <h2>Bio</h2>
  <p>{bio}</p>
</div>

{#if showChat}
  <Chat {id} {name} />
{/if}

{#if soundcloudUser}
  <div class="soundcloud">
    {username}'s Soundcloud<iframe
      allowtransparency="true"
      scrolling="no"
      frameborder="no"
      src={`https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F${soundcloudUser}&color=orange_white&size=64`}
      style="width: 64px; height: 64px;"
    />
  </div>
{/if}

{#if youtubeLink}
  <iframe
    class="youtube"
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${youtubeLink}`}
    title="YouTube video player"
    frameborder="50"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
{/if}

<style>
  div {
    max-width: 80vw;
    margin: auto;
    border: 1px solid white;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    width: 90%;
    margin: 10px;
    border-bottom: 1px solid white;
  }
  p {
    margin-left: 10px;
  }
  .mi {
    color: #fc02b8;
    font-size: 2rem;
  }
  .chat-inline {
    margin-bottom: 5px;
  }
  .chat-inline .mi,
  .chat-inline .chat-text {
    display: inline-block;
  }
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
