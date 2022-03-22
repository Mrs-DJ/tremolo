<script>
	import { adverts } from "../../__testdata.json";
	import AdvertCard from "./AdvertCard.svelte";
</script>

<section>
	{#each adverts as {group, location, role}}
	<AdvertCard {group} {location} {role}/>

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
