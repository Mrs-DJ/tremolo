<script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  import AdvertCard from "./AdvertCard.svelte";

  const colRef = collection(db, "Adverts");
  let adverts = [];

  getDocs(colRef).then((results) => {
    results.forEach((doc) => {
      adverts.push(doc.data());
    });
    adverts = adverts;
  });
</script>

<section>
  {#each adverts as {advert_title, band_name, body, instrument_required}}
    <AdvertCard
      {advert_title}
      {band_name}
      {instrument_required}
      {body}
    />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
    padding: 5px;
    max-width: 90vw;
    margin: auto;
  }
</style>
