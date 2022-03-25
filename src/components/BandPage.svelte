<script>
	import { collection, getDoc } from "firebase/firestore";
	import { db } from "../firebase";

	let band = [];

	const bandRef = collection(db, "Bands");

	getDoc(bandRef).then((results) => {
		results.forEach((doc) => {
			band.push(doc.data());
		});
	});

</script>

<h2></h2>

<style>
</style>
