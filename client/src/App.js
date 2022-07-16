import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// base css script
import './index.css';

// create connection to backend server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

// instantiate apollo client instance and create connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
