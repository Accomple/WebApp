import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRouteUser = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('loggedIn');
  const isOwner =localStorage.getItem('is_owner');

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn&&(isOwner==='false') ? (
          <Component {...props} />
        ) : 
          <>
          {
            isLoggedIn ?
            <Redirect to={{pathname: '/error/pagenotfoun',state:{from:props.location} }}/>
            :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          }
          </>
        
      }
    />
  )
}

export default PrivateRouteUser;