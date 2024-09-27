import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// This action will trigger when the AuthForm is submitted.
// See "how react router Action feature works" section in Udemy React course for more details. 
export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  // Get the "mode" of the form(We want to send different request based on the mode of the form)
  const mode = searchParams.get('mode') || 'login'; 

  console.log('Mode is: ' + mode);

  if(mode !== 'login' || mode !== 'signup') {
     throw json({ message: 'Unsupported mode.'}, { status: 422 });
  };

  const data = await request.formData(); // Hold data submitted with the form
  const authData = {  // Retrieve "emil, password" using the "data" object
    email: data.get('email'),
    password: data.get('password')
  };

  console.log('xxx' + authData);

  // create the request and store the response in a constant
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  // Handle the response
  if(response.status === 422 || response.status === 401) {
    return response;
  }

  if(!response.ok) {
    throw json({ message: 'Could not authenticate user.'}, { status: 500 });
  }

  // soon: manage that token
  
  return redirect('/');
}
