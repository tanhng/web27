window.onload=function(){


var b= document.getElementById('textarea');
b.addEventListener('input',()=>
{
const d=document.getElementById('thongbao');
d.innerText=200-b.value.length;

});


const submitButton=document.querySelector('.submit-button');
if (submitButton)
{
    submitButton.addEventListener('click',function(event)
    {
        event.preventDefault();
        const textAreavalue=document.querySelector('.question-content').value;
        //send request to server
        

        
        // create new question
        
        
        
        // question content
            fetch('./create-question',{
                method:'POST', //PUT
                headers: {
                        'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    questionContent: textAreavalue
                
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
                window.location.href=` /question/${data.data.id} `;
            })
            .catch(function(err)
            {
                console.log(err);
                window.alert(err.message);
            })
    })
}


}
   