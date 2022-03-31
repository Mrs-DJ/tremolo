<script>
  import { collection, getDocs } from "firebase/firestore";
  import SingleAdvert from "../components/SingleAdvert.svelte";
  
  import { db } from "../firebase";

  const url = window.location.href.match(/(?<=advert\/).*$/gi).pop();
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
  });
</script>

<div>
  {#each advert as { advert_title: title, band_name: group, body, instrument_required: instruments, owner_id }}
    <SingleAdvert {title} {group} {instruments} {body} {owner_id} />
  {/each}
</div>
