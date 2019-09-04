import React, { Component } from 'react';

class QuestionDetail extends Component {
    componentDidMount(){
        const pathname = window.location.pathname;
        const pathNameParts=pathname.split('/');
        const questionId=pathNameParts[pathNameParts.length-1];
        fetch(`http://localhost:3001/get-question-by-id?questionId=${questionId} `,{
                method: 'GET',
            

        })
        .then(function(response)
        {
                return response.json();
        } 
        )
        .then(function(data){
                
                console.log('day la test :',data);
                document.querySelector('.cauhoi').innerHTML =data.content ;
                document.querySelector('.likenumber').innerHTML ='Like:'+ data.like ;
                document.querySelector('.dislikenumber').innerHTML ='Dislike:' + data.dislike ;
                }        )
        .catch(function(errorr){
                console.log(errorr);
                window.alert(errorr.message);
        });
    }
    render() {
        
        return (
            <div className='container-fluid'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span  className="navbar-toggler-icon"></span>
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
                        
                        <form className="searching form-inline">
        
                                <div className="form-group mx-sm-3 mb-2">
                                    
                                    <input type="text" className="osearch form-control" placeholder="Search something..."/>
                                </div>
                                <input type="submit" className="searchButton btn btn-warning mb-2" value='SEARCH'/>
                            </form>
                        {/* <!-- <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> --> */}
                    </div>
                </nav>
                <div className="card" style={{width: '18rem', margin:'0 auto'}}>
                        <img src="/67627427_1258286244337342_7930898905837862912_o.jpg" alt='Ỉn' className="card-img-top" />
                        <div className="card-body">
                          <h5 className="card-title cauhoi"></h5>
                          <div className="card-text"><div className='likenumber'></div></div>
                          <div className="card-text"><div className='dislikenumber'></div></div>
                          <a href="/" className="btn btn-warning">Another Question</a>
                        </div>
                      </div>
        <h1 className='thongtin'>
    
        </h1>
        
       
    </div>
        );
    }
}

export default QuestionDetail;