import React, { Component } from 'react';
import { EventEmitter } from 'events';

class Answer extends Component {

state={
    questionId:'',
    searchValue:'',
}

componentDidMount() {
    fetch(`http://localhost:3001/get-question-by-idd `,{
        method: 'GET',
    

})
.then((response)=>
{
        return response.json();
}
)
.then((data)=> {
    this.setState({
        questionId: data.data._id,
    })
    document.querySelector('.questionContent').innerHTML='<h1>' +data.data.content+'</h1>';
    console.log('id ne',this.state.questionId);
})
}



handleLikeBtn =(event)=>{
    
    fetch(`http://localhost:3001/update/${this.state.questionId}/like`,{
        method:'PUT'
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        window.location.href = `http://localhost:3000/question/${this.state.questionId}`;
    })
    .catch((error)=>{
        console.log(error);
        window.alert(error.message);
    });
}
handleDislikeBtn =(event)=>{
    
    fetch(`http://localhost:3001/update/${this.state.questionId}/dislike`,{
        method:'PUT'
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        window.location.href = `http://localhost:3000/question/${this.state.questionId}`;
    })
    .catch((error)=>{
        console.log(error);
        window.alert(error.message);
    });
}


handleSearch =(eve) => {
    eve.preventDefault();
        fetch(`http://localhost:3001/search/?content=${this.state.searchValue}`,{
            method:'GET',
            headers: {
                                        'Content-Type':'application/json',
                                }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){ let hienthilen=document.querySelector('.hienthi');let str='';
        console.log('data data ',data.data)
            for (let x of data.data){
               str=str + '<div>' + x.content +'</div>';
                

            }
            hienthilen.innerHTML=str;
            console.log(str);
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

                <form className="searching form-inline" onSubmit={this.handleSearch}>

                        <div className="form-group mx-sm-3 mb-2">
                           
                            <input type="text" className="osearch form-control"
                            value={this.state.searchValue} onChange={(eve)=>
                            {
                                this.setState({
                                    searchValue: eve.target.value,
                                })
                            }} placeholder="Search something..."/>
                        </div>
                        <input type="submit"  className="searchButton btn btn-warning mb-2" value='SEARCH'/>
                    </form>
               
            </div>
        </nav>


        

        
        <div className="ahihi badge badge-warning text-wrap" >
                Try to answer this question down below:
              </div>
        <div className=" questionContent alert alert-warning" role="alert">

        </div>


        <h1 className='questionContent'></h1>
        <button type="submit" className=" like btn btn-outline-warning" onClick={this.handleLikeBtn}>Like/Yes/True</button>
        <button type="submit" className=" dislike btn btn-outline-warning" onClick={this.handleDislikeBtn}>Dislike/No/False</button>

        

        
        <div className='hienthi'>

        </div>
        </div>
        );
    }
}

export default Answer;