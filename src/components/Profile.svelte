<script>
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db, auth } from "../firebase";
  import geofire from "geofire-common";

  let uid;
  let profile = {};
  let instruments = [];
  let levels = {};
  let emailError = false;
  let hash;
  let lat;
  let lng;
  let soundcloudUser = "";
  let youtubeLink = "";

  $: value = profile ? profile.bio || "" : "";
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

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  auth.operations.then(() => {
    uid = auth.currentUser.uid;
    const colRef = doc(db, "Users", uid);
    getDoc(colRef).then((result) => {
      profile = result.data();
      uid = auth.currentUser.uid;
      if (profile) {
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
        if (profile.level) {
          levels = profile.level;
        }
        if (profile.soundcloudUser) {
          soundcloudUser = profile.soundcloudUser;
        }
        if (profile.youtubeLink) {
          youtubeLink = profile.youtubeLink;
        }
      }

      instruments = instruments;
      userGenres = userGenres;
      console.log(levels);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        hash = geofire.geohashForLocation([coords.latitude, coords.longitude]);
        lat = coords.latitude;
        lng = coords.longitude;
      });
    }
  });

  // setTimeout(() => {

  const setValue = (e) => {
    value = e.target.value;
  };

  const setEmail = (e) => {
    email = e.target.value;
  };

  const setSoundcloudUser = (e) => {
    soundcloudUser = e.target.value;
  };

  const setYoutubeLink = (e) => {
    youtubeLink = e.target.value;
  };

  const setUser = (e) => {
    e.preventDefault();
    if (emailRegex.test(email)) {
      emailError = false;
      setDoc(
        doc(db, "Users", uid),
        {
          bio: value,
          instrument: instruments,
          genre: userGenres,
          level: levels,
          email,
          location: hash,
          lat,
          lng,
          soundcloudUser,
          youtubeLink,
        },
        {
          merge: true,
        }
      );
    } else {
      emailError = true;
    }
  };

  const setInstruments = (e) => {
    if (e.target.checked) {
      instruments.push(e.target.value);
      instruments = instruments;
    } else {
      instruments.splice(instruments.indexOf(e.target.value), 1);
      instruments = instruments;
    }
  };

  const setGenres = (e) => {
    if (e.target.checked) {
      userGenres.push(e.target.value);
    } else {
      userGenres.splice(userGenres.indexOf(e.target.value), 1);
    }
    console.log(userGenres);
  };

  const setLevel = (e) => {
    levels[e.target.id] = e.target.value;
    levels = levels;
    console.log(levels);
  };
</script>

<section>
  <h1>{uid ? auth.currentUser.displayName || "Guest" : "loading..."}</h1>
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
    <ul>
      {#each instruments as instrument}
        <li>{instrument}</li>
        <select
          id={instrument}
          class="level-dropdown"
          on:change={setLevel}
          value={levels[instrument]}
        >
          <option value="Hobbyist">Hobbyist</option>
          <option value="Amateur">Amateur</option>
          <option value="Semi-pro">Semi-pro</option>
          <option value="Pro">Pro</option>
        </select>
      {/each}
    </ul>

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
      class={emailError ? "email-form-error" : "email-form"}
      on:change={setEmail}
      type="text"
      placeholder="Enter your email address here..."
      value={email}
      label="HELLO"
    />
    <p>{emailError ? "Email not valid" : ""}</p>

    <input
    on:change={setSoundcloudUser}
    type="text"
    placeholder="Soundcloud username: "
    value={soundcloudUser}
    label="soundcloud"
    class="soundcloud-input"
  />

  <input
    on:change={setYoutubeLink}
    type="text"
    placeholder="YouTube link: "
    value={youtubeLink}
    label="youtube"
    class="youtube-input"
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
  .email-form-error {
    color: black;
    border: 3px solid red;
  }
  .soundcloud-input {
    color:black;
  }
  .youtube-input {
    color:black
  }
  .level-dropdown {
    color: black;
  }
</style>
