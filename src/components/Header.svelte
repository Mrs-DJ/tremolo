<script>
  import { Link } from "svelte-routing";
</script>

<header>
  <Link to="/">
    <div class="header-card">
      <img src="images/logo.png" alt="Logo" class="logo" />
      <img src="images/logo-alt.png" class="logo-front" alt="Logo" />
    </div>
  </Link>
</header>

<style>
  img {
    width: 50%;
  }
  .header-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logo-front {
    display: none;
    position: absolute;
  }
  .header-card:hover .logo-front {
    display: inline;
  }
</style>
