import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  // CLOSURE - useMutation creates/prepares a function that is returned (login)
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='container col-12 col-md-10 col-lg-8'>
      <div className='loginForm text-center'>
        <p>Welcome back, pal!</p>

        <form onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <input 
             className='form-input form-control'
             placeholder='Your email'
             name='email'
             type='email'
             id='email'
             value={formState.email}
             onChange={handleChange}
            />
            <input 
              className='form-input form-control'
              placeholder='Your password'
              name='password'
              type='password'
              id='password'
              value={formState.password}
              onChange={handleChange}
            />
            <button className='btn btn-primary d-block w-100' type='submit'>
              Login!
            </button>
          </div>
        </form>

        {error && <div className='text-danger pt-2'>Login failed. Please check credentials.</div>}

      </div>
    </div>
  )
};

export default Login;