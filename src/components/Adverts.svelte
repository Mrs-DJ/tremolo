<script>
    import { collection, getDocs, doc, getDoc, orderBy, startAt, endAt, query } from "firebase/firestore";
  import { db, auth } from "../firebase";
  import NavLink from "../components/NavLink.svelte";
  import geofire from "geofire-common";
  import AdvertCard from "./AdvertCard.svelte";
    
    let uid;
    let hash;
    let lat;
    let lng;
    export let open = false;
    let profile = {};
    let adverts = [];
    $: filteredAdverts = adverts;

    const colRef = collection(db, "Adverts");
    
    getDocs(colRef).then((results) => {
      results.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        adverts.push({ id, ...data });
      });
      adverts = adverts;
    });
    
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
    const setGenre = ({ target: { value } }) => {
      if (value === "All") {
        filteredAdverts = filteredAdverts;
      } else {
        filteredAdverts = adverts.filter((ad) => ad.genre.includes(value));
      }
    };
    auth.operations.then(() => {
    uid = auth.currentUser.uid;
    const colRef = doc(db, "Users", uid);
    getDoc(colRef).then((result) => {
    profile = result.data();
    uid = auth.currentUser.uid;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        hash = geofire.geohashForLocation([coords.latitude, coords.longitude]);
        lat = coords.latitude;
        lng = coords.longitude;
      });
    }
  });
});
    
const setDistance = ({ target: { value } }) => {
    if (value === "All") {
      filteredAdverts = filteredAdverts;
    }
    if (value === "5km") {
      const center = [lat, lng];
      const radiusInM = 5 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Adverts"), orderBy("location"), startAt(b[0]), endAt(b[1]));
  promises.push(getDocs(q));
}
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const data = doc.data()
      const id = doc.id
      const lat = doc.get('lat');
      const lng = doc.get('lng');
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push({id, ...data});
      }
    }
}
        return matchingDocs;
      }).then((matchingDocs) => {
        filteredAdverts = matchingDocs;
      });
    }
    if (value === "10km") {
      const center = [lat, lng];
      const radiusInM = 10 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Adverts"), orderBy("location"), startAt(b[0]), endAt(b[1]));
  promises.push(getDocs(q));
}
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const data = doc.data()
      const id = doc.id
      const lat = doc.get('lat');
      const lng = doc.get('lng');
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push({id, ...data});
      }
    }
}
        return matchingDocs;
      }).then((matchingDocs) => {
        filteredAdverts = matchingDocs;
      });
    };
 if (value === "25km") {
      const center = [lat, lng];
      const radiusInM = 25 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Adverts"), orderBy("location"), startAt(b[0]), endAt(b[1]));
  promises.push(getDocs(q));
}
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const data = doc.data()
      const id = doc.id
      const lat = doc.get('lat');
      const lng = doc.get('lng');
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push({id, ...data});
      }
    }
}
        return matchingDocs;
      }).then((matchingDocs) => {
        filteredAdverts = matchingDocs;
      });
    };
if (value === "50km") {
      const center = [lat, lng];
      const radiusInM = 50 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Adverts"), orderBy("location"), startAt(b[0]), endAt(b[1]));
  promises.push(getDocs(q));
}
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const data = doc.data()
      const id = doc.id
      const lat = doc.get('lat');
      const lng = doc.get('lng');
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push({id, ...data});
      }
    }
}
return matchingDocs;
      }).then((matchingDocs) => {
        filteredAdverts = matchingDocs;
      });
    };
  }
</script>


<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<section>
  <button>
    <NavLink to={"Post"} bind:open={open}>Post Advert</NavLink>
  </button>
  <div class="genre-filter">
    <i class="mi mi-filter-alt" />
    <select class="dropdown" on:change={setGenre}>
      <option>All</option>
      {#each genres as genre}
        <option value={genre}>{genre}</option>
      {/each}
    </select>
    <select class="dropdown" on:change={setDistance}>Distance
      <option>All</option>
      <option>5km</option>
      <option>10km</option>
      <option>25km</option>
      <option>50km</option>
    </select>
  </div>
  <section class="advert-grid">
    {#each filteredAdverts as {advert_title: title, band_name: group, body, instrument_required: instruments, id, owner_id }}
      <AdvertCard {title} {group} {instruments} {body} {id} {owner_id}/>
    {/each}
  </section>
</section>

<style>
  .advert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
  }

  section {
    padding: 5px;
    margin: auto;
    max-width: 90vw;
  }
  /* p {
    margin-right: 5px;
  } */
   
  button {
    font-size: 15px;
    align-self: center;
  }
  .genre-filter {
    display: flex;
    justify-content: flex-end;
  }

  .dropdown {
    height: 2.2rem;
    background-color: #333;
  }

  .mi {
    font-size: 2rem;
  }
</style>
