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
  "Shoegaze",
  "Dream-pop",
  "Hardcore",
  "Punk",
  "Rock",
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
    },
  )
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
    if(!hash || !uid) {
        locationError = true;
  } else {
        addDoc(
          collection(db, "Adverts"),
          {
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
          },
        );
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
    <h1>Advert details</h1>
    <form on:submit={setAdvert}>
        <textarea {title} on:change={setTitle} required></textarea>Title
        <textarea {band} on:change={setBand} required></textarea>Band Name
        <textarea {body} on:change={setBody} required></textarea>Advert Text
        <span class="checkbox-flex">Instruments:
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
              <select id={instrument} class="level-dropdown" on:change={setLevel} value={levels[instrument]}>
                <option value="Hobbyist">Hobbyist</option>
                <option value="Amateur">Amateur</option>
                <option value="Semi-pro">Semi-pro</option>
                <option value="Pro">Pro</option>
              </select>
            {/each}
          </ul>

          <span class="genre-select">Genres:
            {#each genres as genre}
              <label for={genre}>{genre}</label>
              <input
                type="checkbox"
                value={genre}
                checked={advertGenres.includes(genre)}
                on:change={setGenres}
              />
            {/each}
          </span>

          <p>{locationError ? "Must be signed in with location settings on to post!" : ""}</p>

          <button type="submit">Post</button>
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
    .level-dropdown {
      color: black;
    }
  </style>