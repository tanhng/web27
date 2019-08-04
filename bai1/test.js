console.log('hello world');

//get button element


function canhbao(){
    const nameinput1=document.getElementById('nameinput');
console.log(nameinput1.value);
const emailinput1=document.getElementById('emailinput');
const passinput1=document.getElementById('passinput');
const reppassinput1=document.getElementById('reppassinput');


const namevalue=nameinput1.value;
const emailvalue=emailinput1.value;
const passvalue=passinput1.value;
const reppassvalue=reppassinput1.value;
console.log(passvalue,reppassvalue);
if ( namevalue==='' || emailvalue==='' || passvalue==='' || reppassvalue===''  )
{
    var a=document.getElementById('thongBao');
    a.innerHTML='<h3  > Hãy nhập đầy đủ các ô có tích dấu sao đỏ </h3> ';
    
}
else if (passvalue !== reppassvalue) 
{
    var b=document.getElementById('thongBao');
    b.innerHTML='<h3  > Pass và Repeat Pass sai dồi </h3> ';
}
}
const b=document.getElementById('myButton');
b.addEventListener('click',canhbao);
//add event listener




//