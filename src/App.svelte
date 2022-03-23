<script>
  import { auth, googleProvider, } from "./firebase";
  import { signInWithRedirect, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";

  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import Adverts from "./components/Adverts.svelte";

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
  




  

<main>
  <Header />
  {#if isLoggedIn}
  <Nav />
  <div>
  <button on:click={logOut}> Click to Log Out</button>
  </div>
  <Adverts />
  {:else}
    <div class="login-form">
      <button on:click={googleLogin}>
        <i class="fa fa-google" />
        Sign In with Google
      </button>
      
      <button on:click={createUserAccount}>
        <i class="fa fa-google" />
        Create An Account With Email & Password
      </button>
      
      <button on:click={signInEmail}>
        <i class="fa fa-google" />
        Sign In with Email & Password
      </button>
      
      <button on:click={signInAnon}>
        <i class="fa fa-google" />
        Sign In As Guest
      </button>
    </div>
    {/if}
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




  
