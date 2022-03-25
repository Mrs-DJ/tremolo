<script>
	import AdvertCard from "../components/AdvertCard.svelte"
	import {
  collection, query, where, getDocs, doc,
} from "firebase/firestore";
import { db } from "../firebase";

const url = window.location.href.slice(-20);
let advert = []
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
  console.log(advert)
});



	// const advert = [];
	// const colRef = collection(db, "Adverts");
// 	const q = query(colRef, where(doc.id, "==", "1Lr3rLz196u6L82234jP"));
// 	getDocs(q).then((results) => {
//   console.log(results);
//   results.forEach((doc) => {
//     advert.push(doc.data());
//     console.log(advert)
//   });
// });
</script>

<div>
  {#each advert as {advert_title: title, band_name: group, body, instrument_required: instruments, id }}
      <AdvertCard {title} {group} {instruments} {body} {id} />
  {/each}
	<!-- <h2 class="text-xl font-bold">{title}</h2>
  <p class="text-base text-m">{group}</p>
  <p class="text-xs">{instruments}</p>
  <p class="text-xs">{body}</p> -->
</div>
