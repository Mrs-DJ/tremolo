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
    "Hip-Hop",
    "Metal",
    "Punk",
    "Rock",
  ];

  const menuInstruments = [
    "Guitar",
    "Bass",
    "Drums",
    "Vocals",
    "Keys",
    "Other",
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
          console.log(instruments);
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
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        hash = geofire.geohashForLocation([coords.latitude, coords.longitude]);
        lat = coords.latitude;
        lng = coords.longitude;
      });
    }
  });

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
    youtubeLink = e.target.value.slice(e.target.value.indexOf("=") + 1);
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
        },
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
  };
  
  const setLevel = (e) => {
    levels[e.target.id] = e.target.value;
    levels = levels;
  };
</script>

<section>
  <h1>Hey, {profile.name || "Guest"}!</h1>
  <form on:submit={setUser}>
    <h2>Bio</h2>
    <textarea {value} on:change={setValue} />
    <h2>Instruments</h2>
    <span class="checkbox-flex">
      {#each menuInstruments as instrument}
      <div>
        <label for={instrument}>{instrument === "Keys" ? "Keyboard/Synth" : instrument}</label>
      <input
        type="checkbox"
        name={instrument}
        value={instrument}
        checked={instruments.includes(instrument)}
        on:change={setInstruments}
      />
      </div>
      {/each}
    </span>
    <h2>Proficiency</h2>
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
    <h2>Genres</h2>
    <span class="genre-select">
      {#each genres as genre}
      <div>
        <label for={genre}>{genre}</label>
        <input
          type="checkbox"
          value={genre}
          checked={userGenres.includes(genre)}
          on:change={setGenres}
        />
      </div>
      {/each}
    </span>
    <h2>Email</h2>
    <input
      class={emailError ? "email-form-error" : "email-form"}
      on:change={setEmail}
      type="text"
      placeholder="Enter your email address here..."
      value={email}
      label="email"
    />
    <p>{emailError ? "Email not valid" : ""}</p>
    <h2>Media</h2>
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
    text-align: center;
    margin: auto;
    max-width: 80vw;
  }
  textarea {
    text-align: left;
    color: black;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    border-bottom: 1px solid white;
    margin: 10px;
    text-align: left;
  }
  ul {
    text-align: left;
    margin-left: 15px;
  }
  button {
    margin: 10px;
  }
  .checkbox-flex {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 15px;
  }
  label,
  input {
    margin: 3px;
  }
  .genre-select {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 15px;
  }
  .email-form {
    color: black;
    text-align: left;
    width: 80vw;
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
      


  
  

    
