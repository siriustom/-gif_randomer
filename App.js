import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://www.graphqlhub.com/playground'
});

const GIF_QUERY = gql`{
  giphy {
    random(tag: "javascript") {
      id
      url
      images {
        original {
          url
        }
      }
    }
  }
}`;
export default class App extends React.Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            <Query query={GIF_QUERY} >
              {
                ({ loading, error, data}) => {
                  if (loading) return <Text>Loading...</Text>
                  if (error) console.log(error);
                  console.log(data);
                  return (

                  <Text>haha</Text>
                  );
                }
              }
            </Query>
          </View>
        </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
