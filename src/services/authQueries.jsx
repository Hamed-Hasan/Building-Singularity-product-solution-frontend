import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';


export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export const useSignupMutation = () => {
  return useMutation(signup);
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation(login);
};



export const getItems = async () => {
    const response = await api.get('/items');
    return response.data;
  };
  
  export const useGetItemsQuery = () => {
    return useQuery('items', getItems);
  };
  
  export const createItem = async (itemData) => {
    const response = await api.post('/items/create-item', itemData);
    return response.data;
  };
  

  export const getItemById = async (itemId) => {
    const response = await api.get(`/items/${itemId}`);
    return response.data;
  };
  
  export const useGetItemByIdQuery = (itemId) => {
    return useQuery(['item', itemId], () => getItemById(itemId), {
      enabled: !!itemId,
    });
  };



  export const useCreateItemMutation = () => {
    const queryClient = useQueryClient(); // Initialize queryClient
  
    return useMutation(createItem, {
      onSuccess: () => {
        // Optionally, refetch the items query after a successful mutation
        queryClient.refetchQueries('items');
      },
    });
  };
  
  export const useUpdateItemMutation = () => {
    const queryClient = useQueryClient(); // Initialize queryClient
  
    return useMutation(updateItem, {
      onSuccess: () => {
        queryClient.refetchQueries('items');
      },
    });
  };
  
  export const useDeleteItemMutation = () => {
    const queryClient = useQueryClient(); // Initialize queryClient
  
    return useMutation(deleteItem, {
      onSuccess: () => {
        queryClient.refetchQueries('items');
      },
    });
  };
  
  
  
  export const createUser = async (userData) => {
    try {
        // Make a POST request to the endpoint for creating a user
        const response = await api.post('/users/create-user', userData);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors, log them, or throw them to be caught by the calling function
        throw error;
    }
};





  // Fetch all users
const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data.data;
};

export const useGetAllUsersQuery = () => {
  return useQuery('allUsers', getAllUsers);
};

// // Fetch a specific user by ID
// const getUserById = async (userId) => {
//   const response = await api.get(`/users/${userId}`);
//   return response.data;
// };

// export const useGetUserByIdQuery = (userId) => {
//   return useQuery(['userById', userId], () => getUserById(userId), {
//     enabled: !!userId,
//   });
// };

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new user
// const createUser = async (userData) => {
//   const response = await api.post('/users/create-user', userData);
//   return response.data.data;
// };

// export const useCreateUserMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation(createUser, {
//     onSuccess: () => {
//       // Optionally, refetch the allUsers query after a successful mutation
//       queryClient.refetchQueries('allUsers');
//     },
//   });
// };

// Update a user by ID
// const updateUser = async (userId, userData) => {
//   const response = await api.put(`/users/${userId}`, userData);
//   return response.data.data;
// };

// export const useUpdateUserMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation(updateUser, {
//     onSuccess: () => {
//       // Optionally, refetch the allUsers query after a successful mutation
//       queryClient.refetchQueries('allUsers');
//     },
//   });
// };

// Delete a user by ID
// const deleteUser = async (userId) => {
//   const response = await api.delete(`/users/${userId}`);
//   return response.data;
// };

// export const useDeleteUserMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation(deleteUser, {
//     onSuccess: () => {
//       // Optionally, refetch the allUsers query after a successful mutation
//       queryClient.refetchQueries('allUsers');
//     },
//   });
// };
