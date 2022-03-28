<script>
  import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
  } from "firebase/firestore";
  import { db, auth } from "../firebase";

  export let id;
  let uid;
  let chatId;
  let message = "";
  let messages = [];
  let messageQuery;

  const setMessage = ({ target: { value } }) => {
    message = value;
  };

  auth.operations.then(() => {
    uid = auth.currentUser.uid;
    chatId = uid < id ? `chat_${uid}_${id}` : `chat_${id}_${uid}`;
    messageQuery = query(
      collection(db, "Chats", chatId, "messages"),
      orderBy("timestamp", "asc"),
      limit(12),
    );

    onSnapshot(messageQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const latestMessages = change.doc.data();
        if (latestMessages.timestamp) {
          messages = [...messages, latestMessages];
        }
      });
    });
  });

  const getTimeElapsed = (time) => {
    const date = new Date();
    return Math.floor((date.getTime() - time) / 60000);
  };

  const addMessage = (e) => {
    e.preventDefault();
    addDoc(
      collection(db, "Chats", chatId, "messages"),
      {
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
    {#each messages as { text, timestamp }}
      <p>{text}, {getTimeElapsed(timestamp.toMillis()) + "m ago"} </p>
    {/each}
  </div>
  <form on:submit={addMessage}>
    <input type="text" value={message} on:change={setMessage} />
    <button type="submit">Send</button>
  </form>
</section>

<style>
  input {
    color: black;
  }
  p {
    color: white;
  }
</style>
