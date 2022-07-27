import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
// base css script
import './index.css';

// components
import Header from './components/Header';
import Footer from './components/Footer';
// pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Details from './pages/Details';
import NoMatch from './pages/NoMatch';

// create connection to backend server
const httpLink = createHttpLink({
  uri: '/graphql'
});

// retreive token from local storage, set the HTTP req headers of every
// request to include returned token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// instantiate apollo client instance and create connection to the API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client} >
      <Router>
        <div className=''>
          <Header />
          <div className='px-4'>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />

              {/* <Route path='/profile/' element={<Profile />} /> */}
              <Route path='/profile'>
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>

              <Route path='/details/:imdbID' element={<Details />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
