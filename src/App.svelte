<script>
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import Adverts from "./components/Adverts.svelte";
</script>
  

<main>
  <Header />
  <Nav />
  <Adverts />
</main>
  

<style>
  main {
    text-align: center;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
