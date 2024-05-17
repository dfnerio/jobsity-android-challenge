# React Native Challenge - Diego Frías Nerio

### Table of Contents
- [Context](#context)
- [Technical Details](#technical-details)
  - [Architecture](#architecture)
  - [Project structure and other details](#project-structure-and-other-details)
- [Build](#build)
  - [APK](#apk)
  - [Running locally](#running-locally)
- [Notes](#notes)

| Tv Shows | People | Favorites | PIN | 
| -- | -- | -- | -- |
| <img width="200px" src="https://github.com/dfnerio/jobsity-android-challenge/assets/11319430/6380c661-6d0a-49db-b234-668d0c15dcf5" /> | <img width="200px" src="https://github.com/dfnerio/jobsity-android-challenge/assets/11319430/6997498f-dd4f-42ad-9b64-bfc894a88797" /> | <img width="200px" src="https://github.com/dfnerio/jobsity-android-challenge/assets/11319430/72fd9252-896c-42ce-9e99-bc7b3659213a" /> | <img width="200px" src="https://github.com/dfnerio/jobsity-android-challenge/assets/11319430/ee687077-c8b2-4233-8d6f-96cf2875509c" /> |

### Context
This app is part of a Recat Native Android challenge for Jobsity. It's purpose is to:
- Fetch and display a list of several TvShows (from https://www.tvmaze.com/api)
- Search Tv Shows by name
- Present details for each Tv Show such as name, poster, days and time in which it airs, language, rating, a summary and a list of episodes sorted by season
- See details for each episode including name, episode number, season number, image and a summary
- Fetch and display a list of actressess and actors, presenting details like name, photo, birthdate, country of origin and the list of Tv Shows in which they appear as well as the character they portray
- Allow the user to mark Tv Shows as favorites for quick access
- Allow the user to set up a security PIN for authentication

### Technical Details
#### Architecture:
- React Native + TypeScript
- Redux + AsyncStorage for state management
- React Native Navigation for navigation
- Jest for unit testing

#### Project structure and other details
The project is structured modularly for the most part for organization and readability purposes. You'll find all of the main screens and components inside a `modules` folder under `src`, with some containing a `__tests__` folder with unit tests written in Jest (only some areas are covered just to illustrate a bit on the implementation, due to time constraints). Components are properly contained in their own files for reusability and use the appropiate RN hooks for optimized rendering performance. Hooks and selectors are also contained within their own files for reusability and to reduce cognitive complexity.

The custom search functionality integrates a custom lodash debounce wrapper to handle RN events (mainly to fix the input event value becoming stale and to silence some warnings) with a 300ms delay, which helps prevent potential issues with real-time API calls on every character change.

The copies throughout the project live inside each component directly where needed. *This is **NOT** an ideal practice.* Usually we want to support different locales using an internationalization framework such as i18n, having copies live in their own locale file and be exclusively accessed through their keys rather than their values, but this fell out of scope for this project. 

Contained style sheets live inside the components they're being used on to prevent having unecessary exports, but they all share common values through a general *Theme* object to maintain consistency.

### Build

#### APK
- The latest APK is available under the `Releases` section in this repo.

#### Running locally
- First, clone the repo
  ```
  git clone git@github.com:dfnerio/jobsity-android-challenge.git
  ```
- Then navigate to the project directoy and run the following commands
  ```
  yarn
  yarn start
  yarn android
  ```
You may need to boot up your android emulator first in order for RN to pick it up.

### Notes

- When setting up a security PIN, you will need to enter it again when you re-open the app. The PIN persists throughout sessions, so don't forget it or you'll have to re-install.
- Built exclusively for Android following the requested guidelines. **Was not tested for iOS so it may not build as is.**
