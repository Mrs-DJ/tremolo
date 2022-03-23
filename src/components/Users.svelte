<script>
    import { collection, getDocs } from "firebase/firestore";
    import { db } from "../firebase";
    import UserCard from "./UserCard.svelte";

    const colRef = collection(db, "Users");
    let users = [];

    getDocs(colRef).then((results) => {
      results.forEach((doc) => {
        users.push(doc.data());
      });
      users = users;
    });
</script>
  
  <section>
    {#each users as { username, name, location, bio, instrument }}
      <UserCard {username} {name} {location} {instrument} {bio} />
    {/each}
  </section>
  
  <style>
    section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 10px;
      padding: 5px;
      max-width: 90vw;
      margin: auto;
    }
  </style>