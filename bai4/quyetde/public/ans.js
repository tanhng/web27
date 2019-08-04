window.onload=function(){
    fetch(`/get-question-by-idd `,{
        method: 'GET',
    

})
.then(function(response)
{
        return response.json();
}
)
.then(function(data){
        
        console.log('day la cauhoi :',data.data);
       document.querySelector('.questionContent').innerHTML=data.data.content;
       const likeButton=document.querySelector('.like');
       const dislikeButton=document.querySelector('.dislike');
        if ( likeButton)
        {
            likeButton.addEventListener('click',function(event)
            {
                data.data.like++;
                console.log('day la cauhoi sau khi bam :',data.data);
                document.querySelector('.traloi1').innerText='co '+data.data.like +' nguoi chon co';
                document.querySelector('.traloi2').innerText='co '+data.data.dislike +' nguoi chon khong';
                fetch(`/update`,{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    cauhoi: data.data,
                    solike: data.data.like,
                    sodislike: data.data.dislike,
                    soid: data.data.id,
                }),
                })  
                .then(function(response)
            {
                //response.JSON() -> only when server response with json
                //response.text() -> only when server response with string
                return response.json();
                
            })
            .then(function(data)
            {
                // handle response data
                console.log(' Data:', data);
                // window.location.href=` /question/${data.data.id} `;
            })
            .catch(function(err)
            {
                console.log(err);
                window.alert(err.message);
            })





            })
        }
        if ( dislikeButton)
        {
            dislikeButton.addEventListener('click',function(event)
            {
                data.data.dislike++;
                console.log('day la cauhoi sau khi bam :',data.data);
                document.querySelector('.traloi1').innerText='co '+ data.data.like +' nguoi chon co';
                document.querySelector('.traloi2').innerText='co '+ data.data.dislike +' nguoi chon khong';
            })
        }


       

        


        }       
        )
.catch(function(errorr){
        console.log(errorr);
        window.alert(errorr.message);
});
}