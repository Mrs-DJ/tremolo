<script>
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db, auth } from "../firebase";

  let uid;
  let profile = {};
  let instruments = [];
  $: value = profile.bio || "";
  const genres = [
    "Indie",
    "Alternative",
    "Jazz",
    "Blues",
    "Folk",
    "Pop",
    "Shoegaze",
    "Dream-pop",
    "Hardcore",
    "Punk",
    "Rock",
  ];

  let email = "";

  let userGenres = [];

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  auth.operations.then(() => {
    uid = auth.currentUser.uid;
    const colRef = doc(db, "Users", uid);
    getDoc(colRef).then((result) => {
      profile = result.data();
      uid = auth.currentUser.uid;
      if (profile.instrument) {
        profile.instrument.forEach((instrument) => {
          instruments.push(instrument);
        });
      }
      if (profile.genre) {
        profile.genre.forEach((genre) => {
          userGenres.push(genre);
        });
      }
      if (profile.email) {
        email = profile.email;
      }

      instruments = instruments;
      userGenres = userGenres;
    });
  });

  // setTimeout(() => {

  const setValue = (e) => {
    value = e.target.value;
  };

  const setEmail = (e) => {
    email = e.target.value;
    console.log("set email", email);
  };

  const setUser = (e) => {
    console.log(e.target);
    e.preventDefault();
    if (emailRegex.test(email)) {
      console.log("hello");
      setDoc(
        doc(db, "Users", uid),
        {
          bio: value,
          instrument: instruments,
          genre: userGenres,
          email: email,
        },
        {
          merge: true,
        },
      );
    } else {
      console.log("invalid email");
    }
  };

  const setInstruments = (e) => {
    if (e.target.checked) {
      instruments.push(e.target.value);
    } else {
      instruments.splice(instruments.indexOf(e.target.value), 1);
    }
    console.log(instruments);
  };

  const setGenres = (e) => {
    if (e.target.checked) {
      userGenres.push(e.target.value);
    } else {
      userGenres.splice(userGenres.indexOf(e.target.value), 1);
    }
    console.log(userGenres);
  };
</script>

<section>
  <h1>{uid ? auth.currentUser.displayName : "loading..."}</h1>
  <form on:submit={setUser}>
    <textarea {value} on:change={setValue} />
    <span class="checkbox-flex">
      <label for="guitar">Guitar</label>
      <input
        type="checkbox"
        name="guitar"
        value="Guitar"
        checked={instruments.includes("Guitar")}
        on:change={setInstruments}
      />
      <label for="bass">Bass</label>
      <input
        type="checkbox"
        name="bass"
        value="Bass"
        checked={instruments.includes("Bass")}
        on:change={setInstruments}
      />
      <label for="drums">Drums</label>
      <input
        type="checkbox"
        name="drums"
        value="Drums"
        checked={instruments.includes("Drums")}
        on:change={setInstruments}
      />
      <label for="vocals">Vocals</label>
      <input
        type="checkbox"
        name="vocals"
        value="Vocals"
        checked={instruments.includes("Vocals")}
        on:change={setInstruments}
      />
      <label for="keys">Keyboards/Synth</label>
      <input
        type="checkbox"
        name="keys"
        value="Keys"
        checked={instruments.includes("Keys")}
        on:change={setInstruments}
      />
      <label for="other">Other</label>
      <input
        type="checkbox"
        name="other"
        value="Other"
        checked={instruments.includes("Other")}
        on:change={setInstruments}
      />
    </span>

    <span class="genre-select">
      {#each genres as genre}
        <label for={genre}>{genre}</label>
        <input
          type="checkbox"
          value={genre}
          checked={userGenres.includes(genre)}
          on:change={setGenres}
        />
      {/each}
    </span>

    <input
      class="email-form"
      on:change={setEmail}
      type="text"
      placeholder="Enter your email address here..."
      value={email}
    />

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
  label,
  input {
    margin: 3px;
  }
  .genre-select {
    display: flex;
  }
  .email-form {
    color: black;
  }
</style>
