<script>
    import { collection, getDocs } from "firebase/firestore";
    import { db } from "../firebase";
    import AdvertCard from "./AdvertCard.svelte";
    
    
    let adverts = [];
    $: filteredAdverts = adverts;
    
    const colRef = collection(db, "Adverts");
    
    getDocs(colRef).then((results) => {
      results.forEach((doc) => {
        adverts.push(doc.data());
      });
      adverts = adverts;
    });
    
    const genres = [
      "Indie",
      "Alternative",
      "Jazz",
      "Blues",
      "Folk",
      "Pop",
      "Shoegaze",
      "Dream-pop",
      "Hardcore",
      "Punk",
      "Rock",
    ];

    const setGenre = ({ target: { value } }) => {
      if (value === "All") {
        filteredAdverts = filteredAdverts;
      } else {
        filteredAdverts = adverts.filter((ad) => ad.genre.includes(value));
      }
    };
</script>


<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<section>
  <div class="genre-filter">
    <i class="mi mi-filter-alt" />
    <select class="dropdown" on:change={setGenre}>
      <option>All</option>
      {#each genres as genre}
        <option value={genre}>{genre}</option>
      {/each}
    </select>
  </div>
  <section class="advert-grid">
    {#each filteredAdverts as {advert_id: id, advert_title: title, band_name: group, body, instrument_required: instruments }}
      <AdvertCard {title} {group} {instruments} {body} {id}/>
    {/each}
  </section>
</section>

<style>
  .advert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
  }

  section {
    padding: 5px;
    margin: auto;
    max-width: 90vw;
  }

  /* p {
    margin-right: 5px;
  } */

  .genre-filter {
    display: flex;
    justify-content: flex-end;
  }

  .dropdown {
    height: 2.2rem;
    background-color: #333;
  }

  .mi {
    font-size: 2rem;
  }
</style>
