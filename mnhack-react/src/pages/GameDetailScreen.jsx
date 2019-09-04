import React, { Component } from 'react';

class GameDetailScreen extends Component {

    componentWillMount() {
        console.log('Black Metal Ist Krieg');
        const pathname = window.location.pathname;
        const pathNameParts = pathname.split('/');
    const gameId = pathNameParts[pathNameParts.length - 1];
    console.log('gameId : ',gameId);
        // get gameId from URL 
        fetch(`http://localhost:3001/get-game-detail?id=${gameId}`)
        .then(function (response) {
            return response.json();
        })
        .then( (data) => {
            console.log('data ne ', data);
            let receiveData = data.data;
            const player1 = receiveData.players[0].name;
            const player2 = receiveData.players[1].name;
            const player3 = receiveData.players[2].name;
            const player4 = receiveData.players[3].name;
            document.querySelector('#player1').innerHTML = player1;
            document.querySelector('#player2').innerHTML = player2;
            document.querySelector('#player3').innerHTML = player3;
            document.querySelector('#player4').innerHTML = player4;
            var tr;
            var tempSum = [0, 0, 0, 0];
            const addRoundBtn = document.querySelector('#addRoundBtn');
            var i = 0;
            for (i; i < receiveData.players[0].game.length; i++) {
                tr = document.createElement("TR");
                tr.innerHTML = `<th scope="row">${i + 1}</th>
            <td><input type='number' value=${receiveData.players[0].game[i]} id="1${i + 1}"></td>
            <td><input type='number' value=${receiveData.players[1].game[i]} id="2${i + 1}"></td>
            <td><input type='number' value=${receiveData.players[2].game[i]} id="3${i + 1}"></td>
            <td><input type='number' value=${receiveData.players[3].game[i]} id="4${i + 1}"></td>`;
                document.querySelector('#tbContent').appendChild(tr);
                for (let j = 0; j < 4; j++) {
                    const player = j + 1;
                    const round = i + 1;
                    console.log(`${player}${round}`);
                    document.getElementById(`${player}${round}`).addEventListener('input', function (eve) {
                        var ketquamoi = document.getElementById(`${player}${round}`).value;
                        console.log(ketquamoi);
                        fetch(`http://localhost:3001/update`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: gameId,
                                player: player,
                                round: round,
                                ketquamoi: ketquamoi,
                            })

                        })
                            .then(function (res) {
                                return res.json();
                            })
                            .then(function (doc) {
                                console.log(doc);
                                document.querySelector(`#player${player}sum`).innerHTML = doc.data;

                            })
                    })
                }
                tempSum[0] += receiveData.players[0].game[i];
                tempSum[1] += receiveData.players[1].game[i];
                tempSum[2] += receiveData.players[2].game[i];
                tempSum[3] += receiveData.players[3].game[i];
            }
            for (let j = 0; j < 4; j++) {
                document.querySelector(`#player${j + 1}sum`).innerHTML = tempSum[j];
            }
            addRoundBtn.addEventListener('click', function (event) {
                i++;
                fetch(`http://localhost:3001/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: gameId,
                        player: 1,
                        round: i,
                        ketquamoi: 0,
                    })

                })
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (doc) {
                        console.log(doc);
                    });



                tr = document.createElement("TR");
                tr.innerHTML = `<th scope="row">${i}</th>
            <td><input type='number' value=0 id="1${i}"></td>
            <td><input type='number' value=0 id="2${i}"></td>
            <td><input type='number' value=0 id="3${i}"> </td>
            <td><input type='number' value=0 id="4${i}"> </td>`;
                document.querySelector('#tbContent').appendChild(tr);
                for (let j = 0; j < 4; j++) {
                    const player = j + 1;
                    const round = i;
                    console.log(`${player}${round}`);

                    document.getElementById(`${player}${round}`).addEventListener('input', function (eve) {
                        let ketquamoi = document.getElementById(`${player}${round}`).value;
                        fetch(`http://localhost:3001/update`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: gameId,
                                player: player,
                                round: round,
                                ketquamoi: ketquamoi,
                            })

                        })
                            .then(function (res) {
                                return res.json();
                            })
                            .then(function (doc) {
                                console.log(doc);
                                document.querySelector(`#player${player}sum`).innerHTML = doc.data;
                                console.log('xin loi');
                                var a=document.querySelector(`#player${2}sum`).innerText;
                                // var b=a.split(`>`);
                                console.log('a ne' ,a);
                                 document.querySelector(`#sumofscore`).innerHTML= Number(document.querySelector(`#player${1}sum`).innerText)+Number(document.querySelector(`#player${2}sum`).innerText)+Number(document.querySelector(`#player${3}sum`).innerText) +Number(document.querySelector(`#player${4}sum`).innerText);
                            });
                    })
                }
            })

        })
        // fetch
    }   

    componentDidMount () {
        console.log('Spleen Black Metal');
    }

    render() {



        return (
            <div className='container'>
            <h1 className='title2'>ScoreKeeper</h1>
           
    
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" id='player1'></th>
                        <th scope="col" id='player2'></th>
                        <th scope="col" id='player3'></th>
                        <th scope="col" id='player4'></th>
                    </tr>
                    <tr>
                        <th scope="col">Sum of Score (<span id='sumofscore'></span>)</th>
                        <th scope="col" id='player1sum'></th>
                        <th scope="col" id='player2sum'></th>
                        <th scope="col" id='player3sum'></th>
                        <th scope="col" id='player4sum'></th>
                    </tr>
                </thead>
                <tbody id='tbContent'>
                   

                </tbody>
            </table>
            <div className='row justify-content-center'>
                <button type="button" id='addRoundBtn' className=" btn btn-outline-danger center">Add Round</button>
    
            </div>
        </div>
        );
    }
}
 
export default GameDetailScreen;