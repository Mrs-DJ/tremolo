<script>
  import Select, { Option } from "@smui/select";
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

  const genres = ["Indie", "Alternative", "Jazz", "Blues", "Folk", "Pop", "Shoegaze", "Dream-pop", "Hardcore", "Punk", "Rock"];
  let value;
</script>

<section>
	<div>
		<Select bind:value>
			{#each genres as genre}
			  	<Option value={genre}>{genre}</Option>
			{/each}
		</Select>
		<p>Selected:{value}</p>
	</div>
  {#each adverts as advert}
    <AdvertCard {...advert} />
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
