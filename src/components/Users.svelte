<script>
    import { collection, getDocs } from "firebase/firestore";
    import { db } from "../firebase";
    import UserCard from "./UserCard.svelte";

    let users = [];
    $: filteredUsers = users;
    
    const colRef = collection(db, "Users");

    getDocs(colRef).then((results) => {
      results.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        users.push({ id, ...data });
      });
      users = users;
    });

    const instruments = [
      "Piano",
      "Saxophone",
      "Guitar",
      "Xylophone",
      "Panflute",
      "MC",
      "Drums",
      "Bass guitar",
      "Harp",
      "Triangle",
      "Vocals",
      "Producer",
      "Multi-instrumentalist",
      "Flute",
      "Banjo",
      "Ukelele",
    ];

const setInstrument = ({ target: { value } }) => {
      if (value === "All") {
        filteredUsers = filteredUsers;
      } else {
        filteredUsers = users.filter((user) => user.instrument.includes(value));
  }
};
</script>
  
<section>
    <div class="instrument-filter">
      <i class="mi mi-filter-alt" />
      <select class="dropdown" on:change={setInstrument}>
        <option>All</option>
        {#each instruments as instrument}
          <option value={instrument}>{instrument}</option>
        {/each}
      </select>
    </div>
    <section class="user-grid">
    {#each filteredUsers as { username, name, location, bio, instrument, id }}
      <UserCard {username} {name} {location} {instrument} {bio} {id} />
    {/each}
  </section>
</section>
  
  <style>

    .user-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
  }
    section {
      padding: 5px;
    margin: auto;
    max-width: 90vw;
    }

    .dropdown {
    height: 2.2rem;
    background-color: #333;
  }
  </style>
