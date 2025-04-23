/// <reference lib="webworker" />
import { FirebaseOptions, initializeApp } from "firebase/app";
import { precacheAndRoute } from "workbox-precaching";
import { Auth, getAuth } from "firebase/auth";

declare const self: ServiceWorkerGlobalScope;
// declare const clients: Clients;

export const initFirebaseSw = () => {
  precacheAndRoute(self.__WB_MANIFEST);

  const CUSTOM_HEADER_KEY = "x-from-sw";
  const CACHE_NAME = "cache-v1";
  const urlsToCache = ["/"];
  const excludes = [
    "api",
    "_next/static",
    "_next/image",
    "__nextjs_font",
    "favicon.ico",
    "/v1/accounts:lookup",
    "sitemap.xml",
    "robots.txt",
    "firebase-sw.js",
    "__nextjs_original-stack-frames",
  ];

  const firebaseConfig: FirebaseOptions = {
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
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
   * @param idToken string
   * */
  const getBodyContent = async (req: Request, idToken: string) => {
    // Clone headers as request headers are immutable.
    const headers = new Headers();
    for (const entry of req.headers.entries()) {
      headers.append(entry[0], entry[1]);
    }
    // Add ID token to header. We can't add to Authentication header as it
    // will break HTTP basic authentication.
    headers.append("Authorization", "Bearer " + idToken);

    if (req.method !== "GET") {
      console.log("Authorization");
      if (req.headers.get("Content-Type")?.indexOf("json") !== -1) {
        console.log("1");
        const body = await req.json().then((json) => JSON.stringify(json));
        return new Request(req.url, {
          ...req,
          method: req.method,
          headers: headers,
          mode: "same-origin",
          credentials: req.credentials,
          redirect: req.redirect,
          referrer: req.referrer,
          referrerPolicy: req.referrerPolicy,
          integrity: req.integrity,
          cache: req.cache,
          body,
          // bodyUsed: req.bodyUsed,
          // context: req.context,
        });
      } else {
        console.log("2");
        const body = await req.text();
        return new Request(req.url, {
          ...req,
          method: req.method,
          headers: headers,
          mode: "same-origin",
          credentials: req.credentials,
          redirect: req.redirect,
          referrer: req.referrer,
          referrerPolicy: req.referrerPolicy,
          integrity: req.integrity,
          cache: req.cache,
          body,
          // bodyUsed: req.bodyUsed,
          // context: req.context,
        });
      }
    } else {
      console.log("3");
      return new Request(req.url, {
        ...req,
        method: req.method,
        headers: headers,
        mode: req.mode,
        credentials: req.credentials,
        redirect: req.redirect,
        referrer: req.referrer,
        referrerPolicy: req.referrerPolicy,
        integrity: req.integrity,
        cache: req.cache,
        // body,
        // bodyUsed: req.bodyUsed,
        // context: req.context,
      });
    }
  };

  /**
   * For same origin https requests, append idToken to header.
   */
  const checkOriginHttps = async (event: FetchEvent) => {
    console.log("CUSTOM_HEADER_KEY", event.request.headers.get("Authorization"));
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
    console.log("%cservice worker installed", "color: blue;");
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
    console.log("%cservice worker fetched", "color: blue;");
    // const fetchEvent = event;

    const url = new URL(event.request.url);

    const regExp = new RegExp(`^(?!.*(${excludes.join("|")})).*$`);

    if (regExp.test(url.pathname)) {
      console.log(`%cservice worker run: ${url.pathname}`, "color: blue");
      const requestProcessor = async () => {
        let req = event.request;

        console.log("req", req);

        const idToken = await checkOriginHttps(event);

        console.log(idToken);

        // // For same origin https requests, append idToken to header.
        if (idToken) {
          // const headers = new Headers(req.headers);
          // headers.append("Authorization", `Bearer ${idToken}`);
          // headers.append(CUSTOM_HEADER_KEY, "firebase-auth");
          //
          // console.log("add token", headers.keys());
          req = await getBodyContent(req, idToken);
        }

        console.log("req", req);

        return fetch(req);
      };
      // Try to fetch the resource first after checking for the ID token.
      event.respondWith(requestProcessor());
    } else {
      console.log(`%cservice worker exclude: ${url.pathname}`, "color: red");
    }
  });

  self.addEventListener("activate", (event) => {
    console.log("%cservice worker activated", "color: blue;");
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
