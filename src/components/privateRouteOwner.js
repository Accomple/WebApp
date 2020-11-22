import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRouteOwner = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('loggedIn');
  const isOwner =localStorage.getItem('is_owner');

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn&&(isOwner==='true') ? (
          <Component {...props} />
        ) : 
          <>
          {
            isLoggedIn ?
            <Redirect to={{pathname: '/error/pagenotfound',state:{from:props.location} }}/>
            :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          }
          </>
        
      }
    />
  )
}

export default PrivateRouteOwner;