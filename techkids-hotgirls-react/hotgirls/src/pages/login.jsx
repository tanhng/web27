import React, { Component } from 'react';

class login extends Component {

    state = {
        email: '',
        password: '',
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.password.length < 6) { document.querySelector('.canhbao1').innerText ='Password must be more than 6 characters'; }
        else {
            fetch('http://localhost:3001/users/login', {
                method: 'POST', //PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
            })
                .then(function (response) {
                    //response.JSON() -> only when server response with json
                    //response.text() -> only when server response with string
                    return response.json();
                })
                .then(function(data){
                    if(data.message===`Email doesn't exist`){
                        document.querySelector('.canhbao').innerText=`Email doesn't exist`;
                    }
                    else if(data.message==='Wrong Password'){
                        document.querySelector('.canhbao1').innerText=`Wrong Password`;
                    }
                    else {
                            console.log('data login',data);
                            window.location.href='/users/current-user'
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    window.alert(err.message);
                })
        }
    }



    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <p className="chudo" className="canhbao"></p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        <p className="chudo" className="canhbao1"></p>
                    </div>
                    <button type="submit" className="btn btn-primary">login</button>
                </form>
            </div>
        );
    }
}

export default login;