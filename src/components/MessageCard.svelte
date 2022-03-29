<script>
  import { doc, getDoc, deleteDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import getTimeElapsed from "../utils/time";

  export let authorId;
  export let text;
  export let timestamp;
  export let id;

  let isDeleted = false;

  let name;
  const time = `${getTimeElapsed(timestamp.toMillis())} ago`;

  getDoc(doc(db, "Users", authorId)).then((result) => {
    name = result.data().username;
  });

  const deleteMsg = () => {
    deleteDoc(doc(db, "Chats", chatId, "messages", id));
  };
</script>

<div class="message">
  {#if isDeleted}
  <p>Message deleted</p>
  {:else}
  <span class="message-header">
    <h4><strong>{name}</strong></h4>
    <p>{time}</p>
  </span>
  <p>{text}</p>
  <button on:click={deleteMsg}>Delete</button>
  {/if}
</div>

<style>
  .message {
    text-align: left;
    border-top: 1px solid white;
  }

  .message-header h4,
  .message-header p {
    display: inline-block;
  }

  h4 {
    margin: 10px;
    margin-left: 0;
  }
</style>
