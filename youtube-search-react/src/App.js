import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    inputValue: '',
    searchResult: [],
    nextPageToken: '',
  };
  handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.inputValue}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data ne', data);
        console.log('keyword ne', this.state.inputValue);

        
        this.setState({
          searchResult: [...this.state.searchResult, ...data.items],
          nextPageToken: data.nextPageToken,

        });
        
      }
      )
      .catch((error) => {
        console.log(error);
      });
      this.setState({
        searchResult: [],
      });
  }
  handleLoadMore = (event) => {
    event.preventDefault();

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.inputValue}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${this.state.nextPageToken}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data ne', data);
        console.log('keyword ne', this.state.inputValue);

        
        this.setState({
          searchResult: [...this.state.searchResult, ...data.items],
          nextPageToken: data.nextPageToken,

        });
        
      }
      )
      .catch((error) => {
        console.log(error);
      });
      
  }
  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <img src={`https://www1-lw.xda-cdn.com/files/2017/08/After-12-Years-Google-Gives-YouTube-a-New-Logo.png`}
            />
            <h1>Let's search!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <form id="search" onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <input type="text" name="keyword" id="keyword" className="form-control"
                  onChange={(event) => {
                    this.setState({
                      inputValue: event.target.value,
                    })
                  }}
                  required value={this.state.inputValue} />

                <br />
                <input type="submit" id='nut' className="btn btn-primary form-control" value="Submit" />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" id="result-list">
            {  
              this.state.searchResult.map((item, index) => {
                console.log('data', index, 'ne', item);
                return (
                  <a key={index} className='result col-md-12' href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target='_blank'>

                    <div className='row'>

                      <div className='col-4'>

                        <img src={`${item.snippet.thumbnails.medium.url}`} />

                      </div>

                      <div className='col-8'>

                        <div className='video-info'>

                          <h2 className='title'>{item.snippet.title}</h2>

                          <p className='description'>{item.snippet.description}</p>

                          <span>View >></span>

                        </div>

                      </div>

                    </div>

                  </a>);
              })
            }

          </div>
        </div>
        {this.state.nextPageToken === '' ? null : <div className='row'>
              <div className='col-12'>
              <button type="submit" id='nut2' className="btn btn-primary form-control" 
               onClick = {this.handleLoadMore}
               > Load More</button>
              </div>
        </div> }
      </div>
    );
  }
}

export default App;
