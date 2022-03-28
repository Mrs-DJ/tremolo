<script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import getTimeElapsed from "../utils/time";

  export let authorId;
  export let text;
  export let timestamp;

  let name;
  const time = `${getTimeElapsed(timestamp.toMillis())} ago`;

  getDoc(doc(db, "Users", authorId)).then((result) => {
    name = result.data().username;
  });
</script>

<div class="message">
  <span class="message-header">
    <h4><strong>{name}</strong></h4>
    <p>{time}</p>
  </span>
  <p>{text}</p>
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
