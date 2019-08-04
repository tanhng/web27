const express= require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const fs=require('fs');
//method + address
//get/post/put/delete
app.use(bodyParser.json());
app.get('/',function(req,res){
//validate

//database

//response

res.sendFile (path.resolve(__dirname,'./public/ans.html'));
});


// public folder

app.use(express.static('public'));





app.get('/ask',function(req,res){
    res.sendFile (path.resolve(__dirname,'./public/ask.html'));

        



    
    
})

app.get(`/question/:questionId`,function(req,res)
{
    //params
    //req.params.questionId
    res.sendFile( path.resolve(__dirname,'./public/question-detail.html'))
    
})


app.get('/get-question-by-id',function(req,res)
{
    //query
    //logic
    console.log('req.qurey:',req.query);
    console.log('req.query.questionId' ,req.query.questionId);
    fs.readFile('data.json',{encoding:'utf8' }, function(err,data)
    {
        if (err)
        {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        else {
            const questionslist=JSON.parse(data);
            const wantedquestion=questionslist.find(function(x)
            {
                return x.id==req.query.questionId ;
            })
            console.log('wantedquestion :' ,wantedquestion);
            res.json({
                data: wantedquestion,
                
                }
            )
            
        }
    }
    
    )
    
})

app.get('/get-question-by-idd',function(req,res)
{
    //query
    //logic
    
    fs.readFile('data.json',{encoding:'utf8' }, function(err,data)
    {
        if (err)
        {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        else {
            const danhsachcauhoi=JSON.parse(data);
            const randomIndex= Math.floor(Math.random()*1000%danhsachcauhoi.length-1);
            const randomQuest=danhsachcauhoi[randomIndex];
            console.log('cau hoi ngau nhien la : ',randomQuest);
            res.json({
                data: randomQuest,
                
                }
            )
        }
    }
    
    )
    
})


app.post(`/update`,function(req,res)
{
    console.log('req.body cua update : ',req.body)
    fs.readFile('data.json',{encoding:'utf8'},function(err,data)
        {
            if (err)
                {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                }
                else{
            let danhsachcauhoi=JSON.parse(data);
            // const updateQuest = danhsachcauhoi.find(function(x)
            // {
            //      return x.id == req.body.cauhoi.id;
            // })
            //     updateQuest.like=req.body.solike;
            //     updateQuest.dislike=req.body.sodislike;

            for (let updateQuest of danhsachcauhoi)
            {
                if (updateQuest.id == req.body.cauhoi.id) {
                    updateQuest.like=req.body.solike;
                    updateQuest.dislike=req.body.sodislike;
                    break;
                }
            }
            //  console.log('cau hoi can update la :',updateQuest);
             fs.writeFile('data.json',JSON.stringify(danhsachcauhoi),function(error)
             {
                 if(error)
                 {
                     res.status(500).json({
                         success: false,
                         message: error.message,
                     })
                 }
                 else {
                     res.status(201).json({
                         success: true,
                        //  data: updateQuest,
                     });
                 }
             });

            }
        }

    


    )


   
})

app.post('/create-question',function(req,res)
{
    //content
    //like
    //dislike
    //id
    console.log('req.body: ',req.body);
    const newQuestion={
        content: req.body.questionContent,
        like: 0,
        dislike: 0,
        id: new Date().getTime(),
    };





    //readfile

            fs.readFile('data.json',{encoding:'utf8' }, function(err,data)
            {
                if (err)
                {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                }
                else{
                    //push new quest
                    const questions=JSON.parse(data);
                    questions.push(newQuestion);

                    //write File
                    
                    fs.writeFile('data.json',JSON.stringify(questions),function(error)
                    {
                        if(error)
                        {
                            res.status(500).json({
                                success: false,
                                message: error.message,
                            })
                        }
                        else {
                            res.status(201).json({
                                success: true,
                                data: newQuestion,
                            });
                        }
                    });
                }
            })

    
    

//     console.log(req.body);
// res.json(
//     {
//         success: true,
//     }
// );
});



app.listen(3000,function(error)
{
if(error){
    console.log(error);
}
    else 
    {
        console.log('Server listen on port 3000....');
    }
});

