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
                
                console.log('day la test :',data.data);
                document.querySelector('.thongtin').innerHTML =data.data.content;
        
                }        )
        .catch(function(errorr){
                console.log(errorr);
                window.alert(errorr.message);
        });

    
}