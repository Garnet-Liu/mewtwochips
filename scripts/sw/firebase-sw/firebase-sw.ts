/// <reference lib="webworker" />
import { FirebaseOptions, initializeApp } from "firebase/app";
import { precacheAndRoute } from "workbox-precaching";
import { Auth, getAuth } from "firebase/auth";

import { env } from "@/env";

declare const self: ServiceWorkerGlobalScope;
// declare const clients: Clients;

export const initFirebaseSw = () => {
  precacheAndRoute(self.__WB_MANIFEST);

  const CUSTOM_HEADER_KEY = "x-from-sw";
  const CACHE_NAME = "cache-v1";
  const urlsToCache = ["/"];

  const firebaseConfig: FirebaseOptions = {
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);

  console.log("===================== init firebase app =====================");

  const firebaseAuth = getAuth(firebaseApp);

  const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
    unsubscribe();
    if (user) {
      console.log(`SW: user signed in ${user.displayName}`, user.uid);
    } else {
      console.log("SW: user signed out");
    }
  });

  /**
   * Returns a promise that resolves with an ID token if available.
   * @return {void} The promise that resolves with an ID token if available. Otherwise, the promise resolves with null.
   */
  const getIdToken = (auth: Auth): Promise<string | null> => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();

        user?.getIdToken().then((idToken) => {
          resolve(idToken);
        });
      });
    });
  };

  /**
   * @param {string} url The URL whose origin is to be returned.
   * @return {string} The origin corresponding to given URL.
   */
  const getOriginFromUrl = (url: string): string => {
    // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
    const pathArray = url.split("/");
    const protocol = pathArray[0];
    const host = pathArray[2];
    return `${protocol}//${host}`;
  };
  /**
   * Get underlying body if available. Works for text and json bodies.
   * @param req
   * */
  const getBodyContent = async (req: Request) => {
    if (req.method !== "GET") {
      if (req.headers.get("Content-Type")?.indexOf("json") !== -1) {
        return await req.json().then((json) => JSON.stringify(json));
      } else {
        return await req.text();
      }
    } else {
      return undefined;
    }
  };

  /**
   * For same origin https requests, append idToken to header.
   */
  const checkOriginHttps = async (event: FetchEvent) => {
    if (
      location.origin === getOriginFromUrl(event.request.url) &&
      (location.protocol === "https:" || location.hostname === "localhost") &&
      !event.request.headers.get(CUSTOM_HEADER_KEY)
    ) {
      return await getIdToken(firebaseAuth);
    } else {
      return "";
    }
  };

  self.addEventListener("install", (event) => {
    // Perform install steps.
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        // Add all URLs of resources we want to cache.
        try {
          return await cache.addAll(urlsToCache);
        } catch (error) {
          console.log("cache addAll error", error);
        }
      }),
    );
  });

  self.addEventListener("fetch", (event) => {
    const requestProcessor = async () => {
      let req = event.request;

      const idToken = await checkOriginHttps(event);

      // // For same origin https requests, append idToken to header.
      if (idToken) {
        // Clone headers as request headers are immutable.
        const headers = new Headers(req.headers);
        // Add ID token to header. We can't add to Authentication header as it
        // will break HTTP basic authentication.
        headers.append("Authorization", `Bearer ${idToken}`);
        headers.append(CUSTOM_HEADER_KEY, "firebase-auth");

        const body = await getBodyContent(req);

        req = new Request(req.url, {
          method: req.method,
          headers: headers,
          mode: "same-origin",
          credentials: req.credentials,
          cache: req.cache,
          redirect: req.redirect,
          referrer: req.referrer,
          integrity: req.integrity,
          referrerPolicy: req.referrerPolicy,
          body,
          // bodyUsed: req.bodyUsed,
          // context: req.context,
        });
      }

      return fetch(req);
    };
    // Try to fetch the resource first after checking for the ID token.
    event.respondWith(requestProcessor());
  });

  self.addEventListener("activate", (event) => {
    // Update this list with all caches that need to remain cached.
    const cacheWhitelist = ["cache-v1"];
    event.waitUntil(
      caches.keys().then(async (cacheNames) => {
        await Promise.all(
          cacheNames.map((cacheName) => {
            // Check if cache is not whitelisted above.
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              // If not whitelisted, delete it.
              return caches.delete(cacheName);
            }
          }),
        );
        return self.clients.claim();
      }),
    );
  });
};
