import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://astronauts-back.herokuapp.com/',
});

export default client