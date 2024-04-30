import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css'

function User(){
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        website: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        };

        fetchData();
    }, []);

    function deleteUser(id){
        setUsers(users.filter(user => user.id !== id));
    }

    function AddUser(e){
        e.preventDefault();
        let ids = users.map(user => user.id);
        let newId = 1;
        while(ids.includes(newId)) {
            newId++;
        }
        setNewUser(prevUser => ({...prevUser, id: newId}));
        setUsers(prevUsers => [...prevUsers, {...newUser, id: newId}]);
    }

    function handleChange(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h1>Users List</h1>
            <form onSubmit={AddUser}>
                <label>Name</label>
                <input type='text' name='name' value={newUser.name} onChange={handleChange} />

                <label>Email</label>
                <input type='email' name='email' value={newUser.email} onChange={handleChange} />

                <label>Phone Number</label>
                <input type='text' name='phone' value={newUser.phone} onChange={handleChange} />

                <label>Website</label>
                <input type='text' name='website' value={newUser.website} onChange={handleChange} />

                <button type='submit'>Add User</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                            <td><input type='checkbox' onClick={() => deleteUser(user.id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default User;
