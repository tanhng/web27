import React, { Component } from 'react';

class logout extends Component {

componentWillMount(){
    fetch('http://localhost:3001/users/logout',{
        method:'GET',
        credentials: 'include',
    })
    .then(function (response) {
        //response.JSON() -> only when server response with json
        //response.text() -> only when server response with string
        return response.json();

    })
    .then(function(data){
        window.location.href='/users/login'
    })
}

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default logout;