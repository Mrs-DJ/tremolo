<script>
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db } from "../firebase";

  export let loggedInUser;
  export let uid;
  let profile = {};

  const colRef = doc(db, "Users", uid);
  getDoc(colRef).then((result) => {
    profile = result.data();
  });
</script>

<section>
  <p>{loggedInUser.displayName ? loggedInUser.displayName : "Guest"}</p>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
  }
</style>
