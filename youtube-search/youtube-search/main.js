window.onload = function () {
    const nut = document.querySelector('#nut');
    
    if (nut) {
        nut.addEventListener('click', function (event) {
            event.preventDefault();
            const keyword = document.querySelector('#keyword').value;
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var nextPageToken = data.nextPageToken;
                    const hienthi = document.querySelector('#result-list');
                    hienthi.innerHTML = '';
                    var a;
                    for (let item of data.items) {
                        a = document.createElement('DIV');
                        a.innerHTML = `
                    <a class='result col-md-12' href='https://www.youtube.com/watch?v=${item.id.videoId}' target='_blank'>

<div class='row'>

<div class='col-4'>

<img src='${item.snippet.thumbnails.medium.url}' />

</div>

<div class='col-8'>

<div class='video-info'>

<h2 class='title'>${item.snippet.title}</h2>

<p class='description'>${item.snippet.description}</p>

<span>View >></span>

</div>

</div>

</div>

</a>`;
                        hienthi.appendChild(a);
                    }
                    var co = true;
                        window.onscroll= function (event) {
            
                            if ((document.documentElement.offsetHeight-window.innerHeight-window.scrollY<=200)) {
                                
                                if(co)
                                {
                                    console.log('hihi');
                                    co = false;hienthi.innerHTML=`<div class="spinner-grow text-warning" role="status">
                                    <span class="sr-only">Loading...</span>
                                  </div>`;
                                fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`)
                                    .then(function (res) {
                                        return res.json();
                                    })
                                    .then(function (doc) {console.log('doc ne',doc);
                                        nextPageToken = doc.nextPageToken;
                                        console.log(nextPageToken);
                                        for (let item of data.items) {
                                            a = document.createElement('DIV');
                                            a.innerHTML = `
                                    <a class='result col-md-12' href='https://www.youtube.com/watch?v=${item.id.videoId}' target='_blank'>
                
                <div class='row'>
                
                <div class='col-4'>
                
                <img src='${item.snippet.thumbnails.medium.url}' />
                
                </div>
                
                <div class='col-8'>
                
                <div class='video-info'>
                
                <h2 class='title'>${item.snippet.title}</h2>
                
                <p class='description'>${item.snippet.description}</p>
                
                <span>View >></span>
                
                </div>
                
                </div>
                
                </div>
                
                </a>`;
                                            hienthi.appendChild(a);
                                        }
                                        co = true;
                                        
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        co = true;
                                    })
                                    
                                }
                                    
                            }
                        }
                    }
                )
                .catch(function (error) {
                    console.log(error);
                });
        })
    }
}