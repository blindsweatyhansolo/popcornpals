const LoginSignup = () => {
  return (
    <div className='container col-12 col-md-10 col-lg-8'>
      <div className='loginForm text-center'>
        <p>Already a popcorn pal? Welcome back!</p>

        <form>
          <div className='form-group'>
            <input 
             className='form-input form-control'
             placeholder='Your email'
             name='loginEmail'
             type='email'
             id='loginEmail'
            />
            <input 
              className='form-input form-control'
              placeholder='Your password'
              name='loginPassword'
              type='password'
              id='loginPassword'
            />
            <button className='btn btn-primary d-block w-100' type='submit'>
              Login!
            </button>
          </div>
        </form>
      </div>

      <div className='signupForm text-center mt-4'>
        <p>Ready to start sharing with your friends? Sign up below!</p>

        <form>
          <div className='form-group'>
            <input
              className='form-input form-control'
              placeholder='Your username'
              name='username'
              type='username'
              id='username'
            />
            <input 
              className='form-input form-control' 
              placeholder='example@mail.com'
              name='signupEmail' 
              type='email' 
              id='signupEmail'
            />
            <input
              className='form-input form-control'
              placeholder='******'
              name='signupPassword'
              type='password'
              id='signupPassword'
            />
            <small className='form-text text-muted'>
              Don't worry, we'll never share your information with anyone else.
            </small>
            <button className='btn btn-primary d-block w-100' type='submit'>
              Sign-up!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default LoginSignup;