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

<section class="grid-template-columns: repeat(1, minmax(0, 1fr))">
  {#each adverts as { advert_title: title, band_name: group, body, instrument_required: instruments }}
    <AdvertCard {title} {group} {instruments} {body} />
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
