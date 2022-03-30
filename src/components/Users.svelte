<script>
   import { collection, getDocs, doc, getDoc, orderBy, startAt, endAt, query } from "firebase/firestore";
  import { db, auth } from "../firebase";
  import geofire from "geofire-common";
    import UserCard from "./UserCard.svelte";

    let uid;
    let hash;
    let lat;
    let lng;
    let profile = {};
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

const setInstrument = ({ target: { value } }) => {
      if (value === "All") {
        filteredUsers = filteredUsers;
      } else {
        filteredUsers = users.filter((user) => user.instrument.includes(value));
  }
};

const setDistance = ({ target: { value } }) => {
    if (value === "All") {
      filteredUsers = filteredUsers;
    }
    if (value === "5km") {
      const center = [lat, lng];
      const radiusInM = 5 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Users"), orderBy("location"), startAt(b[0]), endAt(b[1]));
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
        filteredUsers = matchingDocs;
      });
    }
    if (value === "10km") {
      const center = [lat, lng];
      const radiusInM = 10 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Users"), orderBy("location"), startAt(b[0]), endAt(b[1]));
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
        filteredUsers = matchingDocs;
      });
    };
 if (value === "25km") {
      const center = [lat, lng];
      const radiusInM = 25 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Users"), orderBy("location"), startAt(b[0]), endAt(b[1]));
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
        filteredUsers = matchingDocs;
      });
    };
if (value === "50km") {
      const center = [lat, lng];
      const radiusInM = 50 * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
    const q = query(collection(db, "Users"), orderBy("location"), startAt(b[0]), endAt(b[1]));
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
        filteredUsers = matchingDocs;
      });
    };
  }
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
      <select class="dropdown" on:change={setDistance}>Distance
        <option>All</option>
        <option>5km</option>
        <option>10km</option>
        <option>25km</option>
        <option>50km</option>
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

  .instrument-filter {
    display: flex;
    justify-content: flex-end;
  }

  .mi {
    font-size: 2rem;
  }
  </style>
