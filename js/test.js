function makeArrayConsecutive2(statues) {
    let min=999;let max=0;let result=0;
    for ( let i =0;i<statues.length;i++)
     {
      if (statues[i]<min) min=statues[i];
      if (statues[i]>max) max=statues[i];
     }
    console.log(min,max);
   
   
   for ( i= min+1;i<max-1;i++)
    {let doesExist=0;
        for ( let j=0;j<statues.length;j++)
         {
          if (statues[j]==i) doesExist=1;
         }
     if (doesExist==0) result=result+1;}
     console.log(result);
     return result;
    
}

makeArrayConsecutive2([6,7,3,1]);
   