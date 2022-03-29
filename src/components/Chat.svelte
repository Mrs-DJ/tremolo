<script>
  import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
  } from "firebase/firestore";
  import { db, auth } from "../firebase";
  import MessageCard from "./MessageCard.svelte";

  export let id;
  let uid;
  let chatId;
  let message = "";
  let messages = [];
  let messageQuery;

  const setMessage = ({ target: { value } }) => {
    message = value;
  };

  const deleteMessage = (toBeRemoved) => {
    messages.splice(toBeRemoved, 1);
    messages = messages;
  };

  auth.operations.then(() => {
    uid = auth.currentUser.uid;
    chatId = uid < id ? `chat_${uid}_${id}` : `chat_${id}_${uid}`;
    messageQuery = query(
      collection(db, "Chats", chatId, "messages"),
      orderBy("timestamp", "asc"),
      limit(12)
    );

    onSnapshot(messageQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          const toBeRemoved = messages.findIndex(
            (msg) => msg.id === change.doc.id,
          );
          setTimeout(() => deleteMessage(toBeRemoved), 3000);
        } else {
          const latestMessages = { id: change.doc.id, ...change.doc.data() };

          if (latestMessages.timestamp) {
            messages = [...messages, latestMessages];
          }
        }
      });
    });
  });

  const addMessage = (e) => {
    e.preventDefault();
    addDoc(
      collection(db, "Chats", chatId, "messages"),
      {
        author: uid,
        text: message,
        timestamp: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
    message = "";
  };
</script>

<section class="text-center">
  <div>
    {#each messages as { author: authorId, text, timestamp, id }}
      <MessageCard {id} {authorId} {text} {timestamp} {chatId} {uid} />
    {/each}
  </div>
  <form on:submit={addMessage}>
    <input type="text" value={message} on:change={setMessage} />
    <button type="submit">Send</button>
  </form>
</section>

<style>
  .text-center {
    max-width: 80vw;
    margin: auto;
  }
  input {
    color: black;
  }
  p {
    color: white;
  }
</style>
