<script>
	export let id;

	import { collection, query, where, getDocs } from "firebase/firestore";
	import { db } from "../firebase";

	const advert = [];

	const colRef = collection(db, "Adverts");

	const q = query(colRef, where("advert_id", "==", 1));

	getDocs(q).then((results) => {
		results.forEach((doc) => {
			advert.push(doc.data());
		});
	});

	console.log(advert);
</script>

<div>
	<h1>advertpage</h1>
	<!-- <h2 class="text-xl font-bold">{title}</h2>
  <p class="text-base text-m">{group}</p>
  <p class="text-xs">{instruments}</p>
  <p class="text-xs">{body}</p> -->
</div>
