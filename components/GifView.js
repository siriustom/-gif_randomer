import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Star from './Star';

const KV_QUERY = gql`
    query getValueQuery($id: String!) {
      keyValue{
          getValue(id: $id) {
            id
            value
          }
        }
    }
`;

export default class GifView extends React.Component {
    componentDidMount() {
        this.props.updateGifResource(this.props.id, this.props.uri);
    }

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                <Image source={{uri: this.props.uri}}
                       style={{width: 400, height: 400}}
                />
                <Query query={KV_QUERY} variables={{id: this.props.id}}>
                    {
                        ({ loading, error, data}) => {
                            if (loading) return <Text>Loading...</Text>
                            if (error) console.log(error);
                            let value = data.keyValue.getValue.value;
                            let status = !!value;
                            return (
                                <View style={styles.starContainer}>
                                    <Star
                                        status={status}
                                        id={this.props.id}
                                    />
                                </View>
                            );
                        }
                    }
                </Query>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    starContainer: {
        height: 60,
        backgroundColor: '#fff',
        alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
        justifyContent: 'center',
    },
});