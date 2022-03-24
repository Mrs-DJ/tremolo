<script>
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db, auth } from "../firebase";

  const { uid } = auth.currentUser;

  let profile = {};
  let instruments = [];
  $: value = profile.bio || "";

  const colRef = doc(db, "Users", uid);
  getDoc(colRef).then((result) => {
    profile = result.data();
    console.log(profile);
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
    <span class="checkbox-flex">
    <label for="guitar">Guitar</label>
    <input type="checkbox" name="guitar" value="guitar" checked={instruments.includes(value.toLowerCase())}/>
    <label for="bass">Bass</label>
    <input type="checkbox" name="bass" value="bass" />
    <label for="drums">Drums</label>
    <input type="checkbox" name="drums" value="drums" />
    <label for="vocals">Vocals</label>
    <input type="checkbox" name="vocals" value="vocals" />
    <label for="keys">Keyboards/Synth</label>
    <input type="checkbox" name="keys" value="keys" />
    <label for="other">Other</label>
    <input type="checkbox" name="other" value="other" />
    </span>


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
  .checkbox-flex {
    display: flex;

  }
  label, input {
    margin: 3px;
  }
</style>
