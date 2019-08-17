const fs= require('fs');
// fs.readFile('data.txt',{encoding:'utf8' },function(err,data)
// {   console.log(err);
//     console.log(data);
// })

fs.watchFile('data.txt',function (current,previous)
{console.log(current);
    console.log('file changed');

})


fs.writeFile('data.txt','blackmetal',function(err){})


