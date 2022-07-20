import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// base css script
import './index.css';

// components
import Header from './components/Header';
import Footer from './components/Footer';
// pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import Details from './pages/Details';
import NoMatch from './pages/NoMatch';

// create connection to backend server
const httpLink = createHttpLink({
  uri: '/graphql'
});

// instantiate apollo client instance and create connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client} >
      <Router>
        <div className=''>
          <Header />
          <div className=''>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<LoginSignup />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/details' element={<Details />} />
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
