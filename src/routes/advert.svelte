<script>
  export let id;
  export let title;
  export let group;
  export let instruments;
  export let body;
  import { collection, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  //   import AdvertCard from "./AdvertCard.svelte";

  let advert = [];

  const adRef = collection(db, "advert");
  getDoc(adRef).then((results) => {
    results.forEach((doc) => {
      advert.push(doc.data());
    });
    advert = advert;
  });
</script>

<div>
  <h2 class="text-xl font-bold">{title}</h2>
  <p class="text-base text-m">{group}</p>
  <p class="text-xs">{instruments}</p>
  <p class="text-xs">{body}</p>
</div>
