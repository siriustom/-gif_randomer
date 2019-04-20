import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { LIKE, NOT_LIKE } from '../constants';

const LIKE_GIF = gql`
  mutation LikeGif($input: SetValueForKeyInput!) {
    keyValue_setValue(input: $input) {
      item {
        id
        value
      }
      clientMutationId
    }
  }
`;

export default class Star extends React.Component {
    state = {
        status: this.props.status
    }
    handleStarTap = () => {
        this.setState((preState) => ({
            status: !preState.status
        }));
    }
    render() {
        let clientMutationId = "Xiaoran Lin";
        return (
            <Mutation mutation={LIKE_GIF}>
                {(keyValue_setValue) => (
                    <Icon
                        name='star'
                        color={this.state.status ? "yellow" : "gray"}
                        onPress={() => {
                            keyValue_setValue(
                                {
                                    variables: {
                                        input: {
                                            id: this.props.id,
                                            value: !this.state.status,
                                            clientMutationId: clientMutationId
                                        }
                                }
                            });
                            this.handleStarTap();
                        }}
                    />
                )}
            </Mutation>
        );
    }
}