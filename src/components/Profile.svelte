<script>
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db, auth } from "../firebase";

  const { uid } = auth.currentUser;

  let profile = {};
  let instruments = [];
  $: value = profile.bio;

  const colRef = doc(db, "Users", uid);
  getDoc(colRef).then((result) => {
    profile = result.data();
    profile.instrument.forEach((instrument) => {
      instruments.push(instrument);
    });
    instruments = instruments;
  });

  const setValue = (e) => {
    value = e.target.value;
  };

  const setUser = (e) => {
    console.log(e.target);
    e.preventDefault();
    setDoc(
      doc(db, "Users", uid),
      {
        bio: value,
      },
      {
        merge: true,
      },
    );
  };
</script>

<section>
  <h1>{auth.currentUser.displayName}</h1>
  <form on:submit={setUser}>
    <textarea {value} on:change={setValue} />
    <button type="submit">Update</button>
  </form>
</section>

<style>
  section {
    margin: auto;
    max-width: 90vw;
  }
  textarea {
    color: black;
  }
  h1 {
    font-size: 40px;
  }
</style>
