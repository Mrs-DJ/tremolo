<script>
    import { collection, getDocs } from "firebase/firestore";
    import SingleUser from "../components/SingleUser.svelte";
    
    import { db } from "../firebase";

    const url = window.location.href.match(/(?<=user\/).*$/gi).pop();
    let user = [];
    let users = [];
    const colRef = collection(db, "Users");
    getDocs(colRef).then((results) => {
      results.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        users.push({ id, ...data });
      });
      users = users;
      user = users.filter((fullUser) => fullUser.id === url);
    });
</script>
  
  <div>
    {#each user as { id, username, name, bio, instrument, location, soundcloudUser, youtubeLink }}
      <SingleUser {id} {username} {name} {location} {instrument} {bio} {soundcloudUser} {youtubeLink} />
    {/each}
  </div>