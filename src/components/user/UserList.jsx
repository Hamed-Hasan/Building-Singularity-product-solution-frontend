/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import '../../pages/Table/Table.css';
import { BiShowAlt } from 'react-icons/bi';
import { MdAddchart } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import SearchBar from '../../common/SearchBar';
import Loading from '../../shared/Loading/Loading';
import {  createUser, deleteUser, updateUser, useGetAllUsersQuery, useGetItemsQuery } from '../../services/authQueries';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../utils/api';
import EditUserForm from './EditUserForm';
import AddUserForm from './AddUserForm';
import "../../styles/styles.css"


const disabledButtonBackgroundColor = "#6B7280"; // Gray color for disabled buttons
const activeButtonBackgroundColor = "#E99400"; // Default button background color

const UserList = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
const [allUsers, setAllUsers] = useState([]);

const cancelRef = useRef();


  const usersPerPage = 5; // Number of users to display per page
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
// console.log(users)


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};



  useEffect(() => {
    // Update filteredItems when items are successfully fetched
    if (users) {
      setAllUsers(users);
      setFilteredUsers(users);
    }
  }, [users]);

  const handleSearch = () => {
    const searchTerm = searchQuery.toLowerCase();
    const filtered = users?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    setFilteredUsers(filtered);
  };

  const handleSortByDate = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };


  const handleUpdateUser = async (updatedUserData) => {
    try {
      // Make API call to update user
      const response = await updateUser(selectedUser._id, updatedUserData);
  
      // Check if the update was successful
      if (response.status === 'success') {
        // Update local state with the updated user data
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === selectedUser._id ? { ...user, ...updatedUserData } : user))
        );
  
        // Optionally, you can also update the selectedUser state if needed
        setSelectedUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
  
        // Display a success toast
        toast.success('User updated successfully');
      } else {
        // Display an error toast if the update fails
        toast.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Internal Server Error');
    }
  };
  

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userToDelete._id);

      if (response.status === 'success') {
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id));
        setDeleteDialogOpen(false);
        toast.success('User deleted successfully');
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Internal Server Error');
    }
  };

  const handleAddUser = async (newUserData) => {
    try {
      // Make API call to add a new user using the createUser function
      const response = await createUser(newUserData);

      // Check if the creation was successful
      if (response.status === 'success') {
        // Update local state with the new user
        setAllUsers((prevUsers) => [...prevUsers, response.data]); // assuming the new user is in response.data

        // Update the filteredUsers state
        setFilteredUsers((prevUsers) => [...prevUsers, response.data]);

        // Optionally, you can update the selectedUser state if needed
        // setSelectedUser(response.data);

        // Display a success toast
        toast.success('User created successfully');
      } else {
        // Display an error toast if the creation fails
        toast.error(`Failed to create user. Server response: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Internal Server Error');
    }
  };

  
  
  const { isOpen: isShowModalOpen, onOpen: onShowModalOpen, onClose: onShowModalClose } = useDisclosure();
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  const handleShowModal = (user) => {
    setSelectedUser(user);
    onShowModalOpen();
  };

  const handleAddModal = () => {
    onAddModalOpen();
  };

  const handleEditModal = (user) => {
    setSelectedUser(user);
    onEditModalOpen();
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };
  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  
  const handleNextPage = () => {
    if (indexOfLastUser >= filteredUsers.length) return;
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const isNextDisabled = indexOfLastUser >= filteredUsers.length || filteredUsers.length === 0;
  const isPrevDisabled = currentPage === 1 || currentPage > Math.ceil(filteredUsers.length / usersPerPage);
  
  const prevButtonColor = isPrevDisabled ? disabledButtonBackgroundColor : activeButtonBackgroundColor;
  const nextButtonColor = isNextDisabled

  const getBackgroundColor = (createdBy) => {
    switch (createdBy) {
      case 'admin':
        return 'bg-green-600';
      case 'super admin':
        return 'bg-yellow-600';
      case 'customer':
        return 'bg-red-600';
      default:
        return '';
    }
  };

  return (
    <section className='h-screen'>
      <div className="flex justify-center">
      <div className="container mx-auto">
      <div>

    </div>
        {/* SearchBar component */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={isLoading}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Display table data here */}
            <div className="flex items-center justify-center bg-gray-900">
              <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible">
                  <table className="blog-table text-gray-400 border-separate space-y-6 text-sm">
                    <thead className="bg-gray-800 text-gray-500">
                      <tr>
                        <th className="p-3">Index</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left cursor-pointer" onClick={handleSortByDate}>Date {sortOrder === "asc" ? "↑" : "↓"}</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Author</th>
                        <th className="p-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user, index) => (
                        <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <div className="ml-3">
                                <div className="">{index + 1}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">{user.name}</td>
                          <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                          <td className="p-3"> <span className={`text-gray-50 rounded-md px-2 ${getBackgroundColor(user.created_by)}`}>
                            {user.email}
                          </span> </td>
                          <td className="p-3"> <span className={`text-gray-50 rounded-md px-2 ${getBackgroundColor(user.created_by)}`}>
                            {user.created_by}
                          </span> </td>
                          <td className="blog-td p-3 flex justify-start gap-5 items-center mt-3">
                          <a href="#" className="text-gray-400 hover:text-gray-100 mr-2" onClick={() => handleShowModal(user)}>
                            <BiShowAlt size={18} />
                          </a>

                            <a href="#" className="text-gray-400 hover:text-gray-100 ml-2" onClick={() => handleAddModal()}>
                              <MdAddchart />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-100 ml-2" onClick={() => handleEditModal(user)}>
                            <FiEdit3 />
                          </a>

                          <a href="#" className="text-gray-400 hover:text-gray-100 ml-2" onClick={() => handleOpenDeleteDialog(user)}>
                          <RiDeleteBin6Line />
                        </a>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex items-center justify-center gap-5">
                  <Button
      onClick={handlePrevPage}
      style={{
        backgroundColor: isPrevDisabled ? disabledButtonBackgroundColor : activeButtonBackgroundColor,
        color: "white",
        cursor: isPrevDisabled ? "not-allowed" : "pointer",
      }}
      disabled={isPrevDisabled}
    >
      Previous
    </Button>

    <Button
      onClick={handleNextPage}
      style={{
        backgroundColor: isNextDisabled ? disabledButtonBackgroundColor : activeButtonBackgroundColor,
        color: "white",
        cursor: isNextDisabled ? "not-allowed" : "pointer",
      }}
      disabled={isNextDisabled}
    >
      Next
    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

       {/* Show Modal */}

       <Modal isCentered isOpen={isShowModalOpen} onClose={onShowModalClose} size='xl'>
  <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
  <ModalContent>
    <ModalCloseButton />

    <main className="mt-10">
      {/* Check if a user is selected before rendering the modal content */}
      {selectedUser && (
        <div className="mb-4 md:mb-0 w-full max-w-screen-sm mx-auto relative " style={{ height: '16em' }}>
         
         <div className="p-16 absolute bottom-0 left-0 z-20 ">
            <a
              href="#"
              className="px-4 py-1 bg-green-700 rounded-md text-gray-200 inline-flex items-center justify-center mb-2"
            >
              {selectedUser.created_by}
            </a>
            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">{selectedUser.name}</h2>
            <div className="flex mt-3">
              <div>
                <p className="font-semibold text-gray-200 text-sm">Author {selectedUser.email}</p>
                <p className="font-semibold text-gray-400 text-xs">Published {formatDate(selectedUser.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    
    </main>
  </ModalContent>
</Modal>



        {/* Add Modal */}
      {/* Implement your Add modal content here */}
      <Modal isCentered isOpen={isAddModalOpen} onClose={onAddModalClose} size='2xl'>
        {/* Add modal content */}
        {/* Use the AddUserForm component */}
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalCloseButton  margin="60px" />
          <ModalBody>
            {/* Add modal body */}
            {/* Use the AddUserForm component */}
            <AddUserForm onClose={onAddModalClose} onAddUser={handleAddUser} />
          </ModalBody>
        </ModalContent>
      </Modal>

        {/* Edit Modal */}
        <Modal isCentered isOpen={isEditModalOpen} onClose={onEditModalClose} size='2xl'>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalCloseButton margin="40px" />
        
            <EditUserForm user={selectedUser} onUpdate={handleUpdateUser} onClose={onEditModalClose} />
        </ModalContent>
      </Modal>


{/* delete modal  */}
<AlertDialog
  isOpen={isDeleteDialogOpen}
  leastDestructiveRef={cancelRef}
  onClose={() => setDeleteDialogOpen(false)}
>
  <AlertDialogOverlay>
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        Delete User
      </AlertDialogHeader>

      <AlertDialogBody>
        Are you sure you want to delete {userToDelete?.name}?
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button marginRight="20px" ref={cancelRef} onClick={() => setDeleteDialogOpen(false)}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={handleDeleteUser}>
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogOverlay>
</AlertDialog>


      </div>
    </div>
    </section>
  );
};

export default UserList;
