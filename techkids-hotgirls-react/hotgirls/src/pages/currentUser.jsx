import React, { Component } from 'react';
import logout from './logout';

class currentUser extends Component {
    state = {
        email: '',
        _id: '',
    }

    hienthi = (email,id) => {
        return (
            <div>
                <h2>Email: {email}</h2>
                <h2>Id: {id}</h2>
            </div>
        )
    }

    componentDidMount() {
        fetch(`http://localhost:3001/users/current-user`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(function (response) {
                //response.JSON() -> only when server response with json
                //response.text() -> only when server response with string
                return response.json();

            })
            .then(function (data) {
                console.log('data jsx session', data);
                if (data.data.currentUser) {
                    document.querySelector('.hienthi').innerHTML=data.data.currentUser.email+data.data.currentUser._id + '<button onClick={window.location.href=`/users/logout`} type="button" class="btn btn-primary">Log out</button>';
                }
                else {
                    document.querySelector('.hienthi').innerHTML = '<button onClick={window.location.href=`/users/login`} type="button" class="btn btn-primary">Login</button>'
                }
            })
    }



    render() {
        return (
            <div className='container'>
                <div className='hienthi'>

                </div>
            </div>
        );
    }
}

export default currentUser;