import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import Head from "next/head";
import React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";

import initApollo from "../initApollo";
import { isBrowser } from "../utils";

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

interface WithDataPropTypes {
  graphqlUri;
  serverState: {
    apollo: {
      data: object;
    };
  };
}

export default (ComposedComponent) => {
  return class WithData extends React.Component<WithDataPropTypes> {
    public static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent,
    )})`;

    public static async getInitialProps(ctx) {
      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {},
        },
      };

      // eslint-disable-next-line no-underscore-dangle
      const { graphqlUri } = ctx.req || (window as any).__NEXT_DATA__.props;

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      const apollo = initApollo({ uri: graphqlUri });

      // Provide the `url` prop data in case a GraphQL query uses it
      const url = { query: ctx.query, pathname: ctx.pathname };

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>,
          {
            router: {
              asPath: ctx.asPath,
              pathname: ctx.pathname,
              query: ctx.query,
            },
          },
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      if (!isBrowser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      serverState = {
        apollo: {
          data: apollo.cache.extract(),
        },
      };

      return {
        serverState,
        graphqlUri,
        ...composedInitialProps,
      };
    }

    public apollo: ApolloClient<NormalizedCacheObject>;

    constructor(props) {
      super(props);

      const { serverState, graphqlUri } = this.props;

      this.apollo = initApollo({
        uri: graphqlUri,
        initialState: serverState && serverState.apollo.data,
      });
    }

    public render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
