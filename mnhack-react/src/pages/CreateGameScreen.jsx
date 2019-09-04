import React, { Component } from 'react';

class CreateGameScreen extends Component {
state ={
    player1: '',
    player2: '',
    player3: '',
    player4: '',
};

handlePlayerNameChange= (playerNumber,value) => {
        const player = `player${playerNumber}`;
        this.setState({
            [player]: value ,
        })
}

handleFormSubmit = (event) => {
    event.preventDefault();
    // let player1=this.state.player1;
    // let player2=this.state.player2;
    // let player3=this.state.player3;
    // let player4=this.state.player4;

    let player1=document.querySelector('.player1').value;
    let player2=document.querySelector('.player2').value;
    let player3=document.querySelector('.player3').value;
    let player4=document.querySelector('.player4').value;
    let playersArr=[player1,player2,player3,player4];
    console.log(playersArr);
    fetch(`http://localhost:3001/newGames?players=${playersArr}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        window.location.href=`/games/${data.data.id}`
    })
    .catch((error)=>{
        console.log(error);
        window.alert(error.message);
    });
}
    render() {
        return (
            <div>
                <div className='container'>
        <div>
            <h1 className='title1'>ScoreKeeper</h1>
        </div>
        <form className='create-game-form' onSubmit={this.handleFormSubmit}>
            <div className='Players'>
                <textarea className='player1' placeholder="Player 1" required={true} 
                value={this.state.player1}
                onChange={(event)=> {
                    this.handlePlayerNameChange(1,event.target.value);
                }}
                ></textarea>
                <textarea className='player2' placeholder="Player 2" required={true} 
                value={this.state.player2}
                onChange={(event)=> {
                    this.handlePlayerNameChange(2,event.target.value);
                }}></textarea>
                <textarea className='player3' placeholder="Player 3" required={true} 
                value={this.state.player3}
                onChange={(event)=> {
                    this.handlePlayerNameChange(3,event.target.value);
                }}></textarea>
                <textarea className='player4' placeholder="Player 4" required={true} 
                value={this.state.player4}
                onChange={(event)=> {
                    this.handlePlayerNameChange(4,event.target.value);
                }}></textarea>
            </div>

            <button type="submit" className="newGameBtn btn btn-danger">Create New Game</button>
        </form>
    </div>
            </div>
        );
    }
}
 
export default CreateGameScreen;