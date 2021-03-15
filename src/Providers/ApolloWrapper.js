import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ApolloClient, createHttpLink, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { onError } from 'apollo-link-error'
import {cache} from '../utils/Cache'
import { setContext } from 'apollo-link-context'
import { useAuth0 } from '@auth0/auth0-react'


const ApolloWrapper = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const history = useHistory()
  const [bearerToken, setBearerToken] = useState("")
  const urlLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL || 'http://localhost:4000/',
  });

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : ""
      setBearerToken(token)
    }
    getToken()
  }, [isAuthenticated, getAccessTokenSilently])

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: bearerToken ? `Bearer ${bearerToken}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        if (message.includes('not authenticated')) {
          return history.push('/');
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(urlLink)),
    cache,
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloWrapper