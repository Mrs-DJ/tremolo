# tremolo

Deployed App:

https://tremolo-project.netlify.app/

## About

This app was designed as a final product for a coding bootcamp in a group of 5 people. The app is designed to help connect musicians together in a social network. The app works by having users post adverts about what they are looking for, be it a new member for there band or just looking for people to play some music together in their spare time.

Users can look through adverts and then message other users, through an in app instant messaging service, about these adverts to show their interest and arrange to meet up and play. Adverts can be filtered by the distance from the users location, or by the genre of music they are looking to play, and the users list can also be filtered by instruments played or again, distance from current location.

Users can build a profile to help showcase their talents and interests within music, including the intstruments they play and level they play at, their genre preferences and can even link their sound cloud profile and embed a youtube video on to their profile page to further demonstrate their ability.

The app was created as a PWA so that it can be downloaded onto a phone and have a native application experience. The app also features google login for users to sign in easily.

## Tech Stack

### Back-end

For the back end of the app we implemented Firebase which allowed us to quickly input test information in the firestore database. We also used firebase authorisation to allow signing into the app with google login information.

### Front-end

For the front end of the app we used Svelte.

We made Tremolo a progressive web application so that we could also download the app onto a phone through a browser and have a quick responsive, native application feel to it.

## Set-up

To set this project up on your local machine, you will need to fork the project for this repository and take the url for your newly forked project and clone it down to your machine through the command line using the below:

```
$ git clone /github-url-of-project/
```

Then navigate into the Tremolo folder using:

```
$ cd tremolo
```

You will then need to install the dependency packages on your first time using the project with:

```
$ npm i
```

You can then locally host the app by running:

```
$ npm run dev
```

And then going to the local host provided in the terminal.

### Tech Version

This project uses the following software versions

```
node: 16.13.1;
rollup: 2.3.4;
svelte: 3.0.0;
svelte-link: 1.2.0;
svelte-routing: 1.6.0;
firebase: 9.6.9;
geofire-common: 5.2.0;
postcss: 7.0.39;
sirv-cli: 2.0.0;
```
