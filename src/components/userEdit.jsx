import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from './Features/userSlice';
import axios from 'axios';

function UserEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editedUsers = useSelector((state) => state.users.editedUsers);
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: { street: '', city: '' }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editedUsers[id]) {
      setUser(editedUsers[id]);
    } else {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id, editedUsers]);

  const validate = () => {
    let errors = {};
    if (!user.name) errors.name = "Name is required*";
    if (!user.email) errors.email = "Email is required*";
    if (!user.address.street) errors.street = "Street address is required*";
    if (!user.address.city) errors.city = "City is required*";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(editUser({ id, updatedUser: user }));
    navigate('/');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={user.address.street}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                address: { ...prev.address, street: e.target.value },
              }))
            }
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        </div>
        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={user.address.city}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                address: { ...prev.address, city: e.target.value },
              }))
            }
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
