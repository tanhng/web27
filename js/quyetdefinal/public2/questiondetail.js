window.onload=function()
{
        //fetch API get question
        //inner HTML , innerText
        const pathname = window.location.pathname;
        const pathNameParts=pathname.split('/');
        const questionId=pathNameParts[pathNameParts.length-1];
        fetch(`/get-question-by-id?questionId=${questionId} `,{
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