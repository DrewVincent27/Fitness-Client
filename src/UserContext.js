import React from 'react';

// createContext() is a method to create a context object
// a context object as the same states is of data type object that can be used to store information that can be shared to other components within the app

// the context object is a different approach to passing information between components and allows easier access by avoiding the use of props drilling

const UserContext = React.createContext();

// Provider component allow other components to use the context object and supply the necessary information needed to the context object
export const UserProvider = UserContext.Provider;
//console.log(UserContext.Provider);

export default UserContext;