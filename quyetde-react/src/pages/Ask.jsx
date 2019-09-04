import React, { Component } from 'react';

class Ask extends Component {
    state = {
        inputNumber:200,
        inputValue:'',
    };
    
 
handleSubmit = (event) =>{
    event.preventDefault();
    fetch('http://localhost:3001/create-question',{
        method:'POST', //PUT
        headers: {
                'Content-Type':'application/json',
        },
        body: JSON.stringify({
            questionContent:this.state.inputValue,
        
        }),
    })
    .then((response)=>
    {
        //response.JSON() -> only when server response with json
        //response.text() -> only when server response with string
        return response.json();
        
    })
    .then((data)=>
    {
        // handle response data
        console.log(' Data:', data);
        window.location.href=` /question/${data.data.id} `;
    })
    .catch((err)=>
    {
        console.log(err);
        window.alert(err.message);
    })
}


    render() {
        return (
            <div className='container-fluid'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">QUYETDE by TANHNG</a>
        
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/ask">ASK QUICK <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">REP FAST</a>
                            </li>
                            
                        </ul>
        
                        <form className="searching form-inline" onSubmit={this.handleSubmit}>
        
                                <div className="form-group mx-sm-3 mb-2">
                                   
                                    <input type="text" className="osearch form-control" placeholder="Search something..."/>
                                </div>
                                <input type="submit" className="searchButton btn btn-warning mb-2" value='SEARCH'/>
                            </form>
                        {/* <!-- <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> --> */}
                    </div>
                </nav>

   

        <form className='form-container' onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1" className='chuto'>ASK A QUESTION!</label>
                <textarea maxLength="200" className="textarea question-content" className="form-control"
                    id="exampleFormControlTextarea1" rows="5" value={this.state.inputValue} onChange={(eve)=>{
                        var a=this.state.inputValue.length;

                        this.setState({
                            inputValue:eve.target.value,
                            inputNumber:200-a,
                        })
                        console.log('target ne' ,this.state.inputValue.length);
                    }} ></textarea>
                    <div className='chudo'> <span> {this.state.inputNumber}</span> /200 elements left</div>
                    <button type="submit" className="submit-button btn btn-danger">Send</button>
                   
            </div>
        </form>


        {/* /* // <!-- <div class='form-container'>
        //     <h2> Ask a question kudasai</h2>
        //     <textarea maxlength="200" rows='10' style=' width: 40%;' id='textarea' class='question-content'></textarea>
        //     <div>con lai <span id='thongbao'>200</span> /200 ky tu</div>
        //     <input type='submit' value=' Gui' class='submit-button'/>
        // </div> --> */ }
    </div>
        );
    }
}

export default Ask;