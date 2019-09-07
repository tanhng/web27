import React, { Component } from 'react';

class register extends Component {
    state = {
        email: '',
        password: '',
        repeatPass: '',
        fullName: ''
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleRepeatPassChange = (event) => {
        this.setState({
            repeatPass: event.target.value,
        })
    }

    handleFullNameChange = (event) => {
        this.setState({
            fullName: event.target.value,
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.repeatPass) { document.querySelector('.canhbao').innerText='Password and Repeat Pass dont match'; }
        else 
        if(this.state.password.length <6 ) {document.querySelector('.canhbao1').innerText="Password must be more than 6 characters"}
        
        else
        
        {
            fetch('http://localhost:3001/users/register', {
                method: 'POST', //PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    repeatPass: this.state.repeatPass,
                    fullName: this.state.fullName
                }),
            })
                .then(function (response) {
                    //response.JSON() -> only when server response with json
                    //response.text() -> only when server response with string
                    return response.json();

                })
                .then(function (data) {
                    // handle response data
                    console.log(' Data:', data);
                    console.log('data message ne',data.message);
                    if(data.message==='Email has been used') 
                    {
                        document.querySelector('.canhbao2').innerHTML='Email has been used';
                    }
                    else{
                    window.location.href=`/users/login `;
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
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                     <p  className="chudo" className="canhbao2"></p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            className="form-control" id="exampleInputPassword1" placeholder="Password" required={true} />
                            <p className="chudo" className="canhbao1 "></p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Repeat Password</label>
                        <input type="password"
                            value={this.state.repeatPass}
                            onChange={this.handleRepeatPassChange}
                            className="form-control"  placeholder="Repeat Password" required={true} />
                        <p   className="chudo" className="canhbao"></p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Full Name</label>
                        <input type="text"
                            value={this.state.fullName}
                            onChange={this.handleFullNameChange}
                            className="form-control" required={true} placeholder="Full Name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}

export default register;