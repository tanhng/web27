const express= require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const fs=require('fs');
const mongoose=require('mongoose');
const QuestionModel = require('./model');



mongoose.connect(`mongodb://localhost:27017/quyetde`,{useNewUrlParser: true},function(error)
{
 if(error)
 {
     console.log(error);
     process.exit();
 }   
 else{
     //start app
        console.log('Connect to mongoDB success...')

     //method + address
//get/post/put/delete
app.use(bodyParser.json());
app.get('/',function(req,res){
//validate

//database

//response

res.sendFile (path.resolve(__dirname,'./public/ans.html'));
});

app.get('/search',function(req,res){
    //validate
    
    //database
    
    //response
    
    console.log('query search ne',req.query.content);
    const contentt =req.query.content;
    QuestionModel.find({
        content : {$regex: contentt, $options:'i'},},
        function(err,data)
        {
           if(err)
           {
               res.status(500).json({
                   success: false,
                   message: err.message
               })
           }
           else {
               res.status(200).json({
                   success:true,
                   data: data,
                   total: data.length
               })
               console.log('data search ne',data);
           }
        }
    )


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
    
    
    QuestionModel.findById(req.query.questionId,function(error,data){
        if (error)
        {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        else{
            console.log("day la Id cua cau hoi query",data);
            res.json({
                ...data._doc,
                id: data._doc._id,
            })
        }
    })
    
    
    
    // fs.readFile('data.json',{encoding:'utf8' }, function(err,data)
    // {
    //     if (err)
    //     {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message,
    //         })
    //     }
    //     else {
    //         const questionslist=JSON.parse(data);
    //         const wantedquestion=questionslist.find(function(x)
    //         {
    //             return x.id==req.query.questionId ;
    //         })
    //         console.log('wantedquestion :' ,wantedquestion);
    //         res.json({
    //             data: wantedquestion,
                
    //             }
    //         )
            
    //     }
    // }
    
    // )
    
})

app.get('/get-question-by-idd',function(req,res)
{
    //query
    //logic
    
    // fs.readFile('data.json',{encoding:'utf8' }, function(err,data)
    // {
    //     if (err)
    //     {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message,
    //         })
    //     }
    //     else {
    //         const danhsachcauhoi=JSON.parse(data);
    //         const randomIndex= Math.floor(Math.random()*danhsachcauhoi.length);
    //         const randomQuest=danhsachcauhoi[randomIndex];
    //         console.log('cau hoi ngau nhien la : ',randomQuest);
    //         res.json({
    //             data: randomQuest,
                
    //             }
    //         )
    //     }
    // }
    
    // )



    QuestionModel.aggregate([{$sample: {size:1}},]).exec(function(error,data){
        if(error)
        {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        else{
            res.status(200).json({
                success: true,
                data:{
                ...data[0],
                id: data[0]._id}
            })
        }
    })




})


app.put(`/update/:questionId/:options`,function(req,res)
{
    const questionId = req.params.questionId;
            const option = req.params.options;
            var updateContent = {};
            updateContent[option] = 1;
    console.log('req.body cua update : ',req.body)



    

        QuestionModel.findById(questionId,function(e,data){
           if(e)
           {
               res.status(500).json({
                   success: false,
                   message: e.message
               })
           }
           else if(!data)
           {
               res.status(404).json({
                   success: false,
                   message: 'khong tim thay cau hoi'
               })
           }
           else {
            //    res.status(200).json({
            //        success:true,
            //     //    data:{
            //     //        ...data._doc,
            //     //        id: data._doc._id
            //     //    }
            //    })            
                // data.like=req.body.solike;
                // data.dislike=req.body.sodislike;
                console.log('data ne ',data);
                QuestionModel.findByIdAndUpdate(questionId,{$inc:updateContent},function(err,dat){
                        if(err)
                        {
                            res.status(500).json({
                                success:false,
                                message:err.message
                            })
                        }
                        else{
                            res.status(201).json({
                                success:true,
                                
                            })
                        }






                })

           }
        })


            


    // fs.readFile('data.json',{encoding:'utf8'},function(err,data)
    //     {
    //         if (err)
    //             {
    //                 res.status(500).json({
    //                     success: false,
    //                     message: error.message,
    //                 })
    //             }
    //             else{
    //         let danhsachcauhoi=JSON.parse(data);
    //         // const updateQuest = danhsachcauhoi.find(function(x)
    //         // {
    //         //      return x.id == req.body.cauhoi.id;
    //         // })
    //         //     updateQuest.like=req.body.solike;
    //         //     updateQuest.dislike=req.body.sodislike;

    //         for (let updateQuest of danhsachcauhoi)
    //         {
    //             if (updateQuest.id == req.body.id) {
    //                 updateQuest.like=req.body.solike;
    //                 updateQuest.dislike=req.body.sodislike;
    //                 break;
    //             }
    //         }
    //         //  console.log('cau hoi can update la :',updateQuest);
    //          fs.writeFile('data.json',JSON.stringify(danhsachcauhoi),function(error)
    //          {
    //              if(error)
    //              {
    //                  res.status(500).json({
    //                      success: false,
    //                      message: error.message,
    //                  })
    //              }
    //              else {
    //                  res.status(201).json({
    //                      success: true,
    //                     //  data: updateQuest,
    //                  });
    //              }
    //          });

    //         }
    //     }

    


    // )


   
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
        // like: 0,
        // dislike: 0,
        // id: new Date().getTime(),
    };


//insert into db


        QuestionModel.create(newQuestion,function(error,data){
                if (error)
                {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }
                else {
                    console.log('day la data mongo',{...data._doc});


                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._doc._id,
                        },
                    })
                }
        });





    //readfile

            // fs.readFile('data.json',{encoding:'utf8' }, function(err,data)
            // {
            //     if (err)
            //     {
            //         res.status(500).json({
            //             success: false,
            //             message: error.message,
            //         })
            //     }
            //     else{
            //         //push new quest
            //         const questions=JSON.parse(data);
            //         questions.push(newQuestion);

            //         //write File
                    
            //         fs.writeFile('data.json',JSON.stringify(questions),function(error)
            //         {
            //             if(error)
            //             {
            //                 res.status(500).json({
            //                     success: false,
            //                     message: error.message,
            //                 })
            //             }
            //             else {
            //                 res.status(201).json({
            //                     success: true,
            //                     data: newQuestion,
            //                 });
            //             }
            //         });
            //     }
            // })

    
    

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



 }
}
);

