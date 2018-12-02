import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./utils";

let apolloClient;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

function create({ uri, initialState }) {
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri, // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }), // TODO: remove as any
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(options);
  }

  return apolloClient;
}
