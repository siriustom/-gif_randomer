import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import { Button } from 'react-native';
import GifView from './components/GifView';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://www.graphqlhub.com/graphql'
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
  state = {
    id: null,
    uri: null,
  }
  updateGifResource = (id, uri) => {
    this.setState({
      id: id,
      uri: uri
    });
  }
  render() {
    return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            <Query query={GIF_QUERY} >
              {
                ({ loading, error, data, refetch }) => {
                  if (loading) return <Text>Loading...</Text>
                  if (error) console.log(error);
                  let random = data.giphy.random;
                  let id = random.id;
                  let uri = random.images.original.url;
                  // console.log(id);
                  return (
                      <View style={styles.container}>
                        <GifView
                          id={id}
                          uri={uri}
                          updateGifResource={this.updateGifResource}
                        />
                        <View style={styles.buttonStyle}>
                          <Button
                            title="Re-roll"
                            color="white"
                            onPress={() => {
                              refetch();
                            }}
                          />
                        </View>
                      </View>
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
  buttonStyle: {
    backgroundColor: '#f4426e',
    width: 60,
    height: 60,
    borderRadius: 100
  }
});

