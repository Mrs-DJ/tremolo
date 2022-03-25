<script>
  import SingleAdvert from "../components/SingleAdvert.svelte";
  //   import AdvertCard from "../components/AdvertCard.svelte";
  import { collection, query, where, getDocs, doc } from "firebase/firestore";
  import { db } from "../firebase";

  const url = window.location.href.slice(-20);
  let advert = [];
  let adverts = [];
  const colRef = collection(db, "Adverts");
  getDocs(colRef).then((results) => {
    results.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      adverts.push({ id, ...data });
    });
    adverts = adverts;
    advert = adverts.filter((fullAdvert) => fullAdvert.id === url);
    console.log(advert);
  });
</script>

<div>
  {#each advert as { advert_title: title, band_name: group, body, instrument_required: instruments, id }}
    <SingleAdvert {title} {group} {instruments} {body} />
  {/each}
</div>
