<script>
  import { doc, getDoc, deleteDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import getTimeElapsed from "../utils/time";

  export let authorId;
  export let text;
  export let timestamp;
  export let id;
  export let chatId;
  export let uid;

  let isDeleted = false;
  let error;

  let name;
  const time = `${getTimeElapsed(timestamp.toMillis())} ago`;

  getDoc(doc(db, "Users", authorId)).then((result) => {
    name = result.data().username;
  });

  const deleteMsg = () => {
    deleteDoc(doc(db, "Chats", chatId, "messages", id)).catch((err) => {
      error = err;
    });
    isDeleted = true;
  };
</script>

<div class="message">
  {#if error}
    <p>There was a problem deleting your message. Please try again.</p>
  {:else if isDeleted}
    <p>Message deleted</p>
  {:else}
    <span class="message-header">
      <h4><strong>{name}</strong></h4>
      <p>{time}</p>
      <button class={uid !== authorId ? "button-disabled" : "button"} on:click={deleteMsg} disabled={uid !== authorId} ><i class="mi mi-delete" /></button>
    </span>
    <p>{text}</p>
    
  {/if}
</div>

<style>
  .message {
    text-align: left;
    border-top: 1px solid white;
    padding: 10px;
  }

  .button {
    background-color: #fc02b8;
  }

  .button-disabled {
    visibility: hidden;
  }

  .message-header h4,
  .message-header p,
  .message-header button {
    display: inline-block;
  }

  h4 {
    margin: 10px;
    margin-left: 0;
  }
</style>
