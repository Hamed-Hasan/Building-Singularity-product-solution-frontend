import React, { useState } from 'react';
import { RiLoader2Line } from 'react-icons/ri';

const EditUserForm = ({ user, onUpdate, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ name: user.name, email: user.email, created_by: user.created_by });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Call the onUpdate function with the updated user data
      await onUpdate(userData);

      // Close the modal
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full p-8 sm:rounded-lg md:rounded-none">
          <div className="w-full space-y-12">
            <div className="lg:text-left text-center">
              <div className="flex items-center justify-center">
                <div className="add-user-bg flex flex-col w-full border border-gray-900 rounded-lg px-8 py-10">
                  <form className="flex flex-col  ">
                    <label htmlFor="name" className="font-bold text-lg text-left text-white">Name</label>
                    <input
                      type="text" name="name" value={userData.name} onChange={handleInputChange} 
                      placeholder="Write Your Name.."
                      className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                    />
                    <label htmlFor="name" className="font-bold text-lg text-left text-white">Update created_by</label>
                    <input
                      type="text" name="created_by" value={userData.created_by} onChange={handleInputChange} 
                      placeholder="Write Your Name.."
                      className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                    />

                    <label htmlFor="email" className="font-bold text-lg text-left  text-white mt-3">Email</label>
                    <input
                      type="email" name="email" value={userData.email} onChange={handleInputChange}
                      required
                      placeholder="Write Your Email.."
                      className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white mb-3"
                    />

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="border mt-12 border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold relative"
                      disabled={loading}
                    >
                      <div className='flex items-center justify-center'>
                        <div>
                          {loading && <RiLoader2Line className="animate-spin mr-2" />}
                        </div>
                        <div>
                          Update User
                        </div>
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUserForm;
