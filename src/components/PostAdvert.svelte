<script>
  import { doc, getDoc, addDoc, collection } from "firebase/firestore";
  import { db, auth } from "../firebase";
  import geofire from "geofire-common";

  let uid;
  let profile = {};
  let lat;
  let lng;
  let locationError = false;
  let levels = {};
  let hash;
  let band;
  let body;
  let title;
  let instruments = [];
  let advertGenres = [];
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

  auth.operations.then(() => {
    uid = auth.currentUser.uid;
    const colRef = doc(db, "Users", uid);
    getDoc(colRef).then((result) => {
      profile = result.data();
      uid = auth.currentUser.uid;
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        hash = geofire.geohashForLocation([coords.latitude, coords.longitude]);
        lat = coords.latitude;
        lng = coords.longitude;
      });
    });
  });

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
      advertGenres.push(e.target.value);
    } else {
      advertGenres.splice(advertGenres.indexOf(e.target.value), 1);
    }
    console.log(advertGenres);
  };

  const setAdvert = (e) => {
    e.preventDefault();
    if (!hash || !uid) {
      locationError = true;
    } else {
      addDoc(collection(db, "Adverts"), {
        advert_title: title,
        band_name: band,
        instrument_required: instruments,
        genre: advertGenres,
        level: levels,
        body,
        location: hash,
        lat,
        lng,
        owner_id: uid,
      });
    }
  };

  const setTitle = (e) => {
    title = e.target.value;
  };

  const setBand = (e) => {
    band = e.target.value;
  };

  const setBody = (e) => {
    body = e.target.value;
  };

  const setLevel = (e) => {
    levels[e.target.id] = e.target.value;
    levels = levels;
    console.log(levels);
  };
</script>

<section>
  <h1>Create Advert</h1>
  <form on:submit={setAdvert}>
    <h2>Title</h2>
    <textarea {title} on:change={setTitle} required />
    <h2>Group name</h2>
    <input type="text" {band} on:change={setBand} required />
    <h2>Description</h2>
    <textarea {body} on:change={setBody} required />
    <h2>Instruments required</h2>
    <span class="checkbox-flex">
      {#each menuInstruments as instrument}
        <div>
          <label for={instrument}
            >{instrument === "Keys" ? "Keyboard/Synth" : instrument}</label
          >
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
            checked={advertGenres.includes(genre)}
            on:change={setGenres}
          />
        </div>
      {/each}
    </span>

    <p>
      {locationError
        ? "Must be signed in with location settings on to post!"
        : ""}
    </p>

    <button type="submit">Post</button>
  </form>
</section>

<style>
  section {
    text-align: center;
    margin: auto;
    max-width: 80vw;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    border-bottom: 1px solid white;
    margin: 10px;
    text-align: left;
  }
  textarea {
    color: black;
  }
  .checkbox-flex,
  .genre-select {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 15px;
  }
  label,
  input {
    margin: 3px;
  }

  .level-dropdown {
    color: black;
  }
  ul {
    text-align: left;
    margin-left: 15px;
  }
</style>
