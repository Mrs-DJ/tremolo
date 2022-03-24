<script>
  import { Router, Route } from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./routes/Home.svelte";
  import Header from "./components/Header.svelte";
  import Users from "./routes/Users.svelte";
  import Profile from "./routes/Profile.svelte";
  import { auth, googleProvider, } from "./firebase";
  import { signInWithRedirect, onAuthStateChanged, signOut, 
          createUserWithEmailAndPassword, 
          signInWithEmailAndPassword, 
          signInAnonymously } from "firebase/auth";
  
  let open = false;
  
  export let url = "";


  let isLoggedIn = false;
  let loggedInUser;
  let uid;

  // --DUMMY EMAIL DETAILS --WILL BE REPLACED BY DYNAMIC VARIABLES SET BY FORM
  const email = "test_email@email.com";
  const password = "test_password";

  // --AUTH STATE LISTENER
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedInUser = auth.currentUser;
      console.log("user obj in auth state", loggedInUser);
      isLoggedIn = true;
      uid = user.uid;
      console.log("user ID in auth state", uid);
    } else {
      console.log("user logged out", loggedInUser, uid);
    }
  });

  // -- LOGIN FUNCTIONS

  function googleLogin() {
    signInWithRedirect(auth, googleProvider)
    .then((result) => {
      loggedInUser = result.user;
      console.log(loggedInUser, "user in google sign in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      console.log(errorCode, errorMsg, "errors in google catch block");
    });
  }

  function createUserAccount() {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential, ">>userCred in create account");
      loggedInUser = userCredential.user;
      console.log("logged in user", loggedInUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      console.log("errors in create account", errorCode, errorMsg);
    });
  }

  function signInEmail() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      loggedInUser = userCredential.user;
      console.log("user obj in email sign-in", loggedInUser);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      console.log("email sign-in error", errorCode, errorMsg);
    });
  }

  function signInAnon() {
    signInAnonymously(auth)
      .then(() => {
        console.log("signed in anon");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log("errors in sign in anon", errorCode, errorMsg);
      });
  }

  // --LOG OUT FUNCTION
  function logOut() {
    signOut(auth);
    console.log("clicked");
    console.log(loggedInUser);
    isLoggedIn = false;
  }
</script>

<Router url="{url}">
<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>
  <main>
    <Header />
  {#if isLoggedIn}
  <div>
  <button on:click={logOut}> Click To Log Out</button>
  </div>
  {:else}
    <div class="login-form">
      <button on:click={googleLogin}>
        <i class="fa fa-google" />
        Sign-In With Google
      </button>
      
      <button on:click={createUserAccount}>
        <i class="fa fa-google" />
        Create An Account With Email & Password
      </button>
      
      <button on:click={signInEmail}>
        <i class="fa fa-google" />
        Sign-In With Email & Password
      </button>
      
      <button on:click={signInAnon}>
        <i class="fa fa-google" />
        Sign-In As Guest
      </button>
    </div>
    {/if}
  </main>
  <div>
    <Route path="Profile" component="{Profile}" />
    <Route path="Users" component="{Users}" />
    <Route path="/" component="{Home}" />
  </div>
</Router>

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

  .login-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
    padding: 5px;
    max-width: 90vw;
    margin: auto;
    justify-content: center;
  }
</style>