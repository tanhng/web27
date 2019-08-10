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

        
        console.log('day la cau hoi :',data);
       document.querySelector('.questionContent').innerHTML=data.data.content;
       const likeButton=document.querySelector('.like');
       const dislikeButton=document.querySelector('.dislike');
       var questionId = data.data._id;
        likeButton.addEventListener('click',function(event){
            fetch(`/update/${questionId}/like`,{
                method:'PUT'
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                window.location.href = `/question/${questionId}`;
            })
            .catch((error)=>{
                console.log(error);
                window.alert(error.message);
            });
        })


        dislikeButton.addEventListener('click',function(event){
            fetch(`/update/${questionId}/dislike`,{
                method:'PUT'
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                window.location.href = `/question/${questionId}`;
            })
            .catch((error)=>{
                console.log(error);
                window.alert(error.message);
            });
        })




//         if ( likeButton)
//         {
//             likeButton.addEventListener('click',function(event)
//             {
//                 data.data.like++;
//                 console.log('day la cauhoi sau khi bam :',data.data);
//                 document.querySelector('.traloi1').innerText='co '+data.data.like +' nguoi chon co';
//                 document.querySelector('.traloi2').innerText='co '+data.data.dislike +' nguoi chon khong';
//                 fetch(`/update`,{
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type':'application/json',
//                 },
//                 body: JSON.stringify({
//                     // cauhoi: data.data,
//                     content: data.data.content,
//                     solike: data.data.like,
//                     sodislike: data.data.dislike,
//                     soid: data.data.id,
//                 }),
//                 })  
//                 .then(function(response)
//             {
//                 //response.JSON() -> only when server response with json
//                 //response.text() -> only when server response with string
//                 return response.json();
                
//             })
//             .then(function(data)
//             {
//                 // handle response data
//                 console.log(' Data:', data);
//                 window.location.href=` /question/${data.data._id} `;
//             })
//             .catch(function(err)
//             {
//                 console.log(err);
//                 window.alert(err.message);
//             })
//             })
//         }
//         if ( dislikeButton)
//         {
//             dislikeButton.addEventListener('click',function(event)
//             {
//                 data.data.dislike++;
//                 console.log('day la cauhoi sau khi bam :',data.data);
//                 document.querySelector('.traloi1').innerText='co '+ data.data.like +' nguoi chon co';
//                 document.querySelector('.traloi2').innerText='co '+ data.data.dislike +' nguoi chon khong';
//                 fetch(`/update`,{
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type':'application/json',
//                 },
//                 body: JSON.stringify({
//                     // cauhoi: data.data,
//                     content: data.data.content,
//                     solike: data.data.like,
//                     sodislike: data.data.dislike,
//                     soid: data.data.id,
//                 }),
//                 })  
//                 .then(function(response)
//             {
//                 //response.JSON() -> only when server response with json
//                 //response.text() -> only when server response with string
//                 return response.json();
                
//             })
//             .then(function(data)
//             {
//                 // handle response data
//                 console.log(' Data:', data);
//                 window.location.href=` /question/${data.data._id} `;
//             })
//             .catch(function(err)
//             {
//                 console.log(err);
//                 window.alert(err.message);
//             })
//             })
//         }
//         }       
//         )
// .catch(function(errorr){
//         console.log(errorr);
//         window.alert(errorr.message);
// });
})
.then(function()
{   const onSearch=document.querySelector('.searching');
    onSearch.addEventListener('submit',function(event){
        event.preventDefault();
        const contentt=document.querySelector('.osearch').value;
        console.log(contentt);
        fetch(`/search/?content=${contentt}`,{
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
    })
    
}
)
.catch((error)=>{
    console.log(error);
    window.alert(error.message);
})
}