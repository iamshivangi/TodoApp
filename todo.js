
'use strict'
document.addEventListener("DOMContentLoaded", function(event) {
    // - Code to execute when all DOM content is loaded. 
  let todoItems=[];//Array to store the todos

     function renderTodo(todo){
    //function to render todo on the screen
         const list = document.querySelector('#list-items');
      

         const existing= document.querySelector(`[data-key='${todo.id}']`);
         if(todo.deleted!=undefined)
         {
             existing.remove();
             return;
         }

    const item = document.createElement('li');

    let isChecked=todo.checked?"done":"";
    item.classList.add("tasks");
    item.setAttribute('class',`tasks${isChecked}`);
    item.setAttribute('data-key', todo.id);



    item.innerHTML= `

    <span>
    <input id ="${todo.id}" class ="tick" type ="checkbox" />
    <label for = "${todo.id}"></label>
    <span class ="todo-text">${todo.text}</span>
    </span>
    
    <button class="delete-todo">Remove</button>  
        
    `;
  


    if(existing)


    {
       if(todo.checked==true)
        {item.innerHTML= `

        <span>
        <input id ="${todo.id}" class ="tick" type ="checkbox" checked/>
        <label for = "${todo.id}"></label>
        <span class ="todo-text">${todo.text}</span>
        </span>
        
        <button class="delete-todo">Remove</button>  
            
        `;
      
    
        list.replaceChild(item, existing)}
        
        

    }


    else{
    list.appendChild(item);
   }
    
  }

   function addTodo(text)//to create the todo from text and push it in the array
   {  
    const todo={
        text:text,
        checked:false,
        id:Date.now()
        
    }
    todoItems.push(todo);
    renderTodo(todo);
    
    }

    function toggle(itemkey){
        const i = todoItems.findIndex(items=>items.id===Number(itemkey));

        todoItems[i].checked=  !todoItems[i].checked;


       
        renderTodo(todoItems[i]);
    }

    function deleteTodo(key) {
        // find the corresponding todo object in the todoItems array
        const index = todoItems.findIndex(item => item.id === Number(key));
        // Create a new object with properties of the current todo item
        // and a `deleted` property which is set to true
        const todo = {
          deleted: true,
          ...todoItems[index]
        };
        // remove the todo item from the array by filtering it out
        todoItems = todoItems.filter((item)=> item.id !== Number(key));
        renderTodo(todo);
      }
      






   const form = document.querySelector('#todoform');
   form.addEventListener('submit', handler);



  function handler(event){
    event.preventDefault();//to prevent data loss by refreshing of the browser
    const input = document.getElementById("todo") // get the input of the form
    const text = input.value.trim(); // removing whitespaces
    
    if(text!="")
    {
        addTodo(text);
        input.value="";
        input.focus();
    }


   }

 
//handling check
    let list = document.querySelector("#list-items");
  list.addEventListener('click', (event)=> {
    if(event.target.classList.contains('tick'))
    {
       
        const itemKey = event.target.parentElement.parentElement.dataset.key;
        toggle(itemKey);
     
        
        
    }
    if(event.target.classList.contains('delete-todo'))
    {
        const itemKey =event.target.parentElement.dataset.key;

        deleteTodo(itemKey);
    }

});

//hide completed


let hider = document.querySelector('#hider');




hider.addEventListener('click', hiderfunc);

function hiderfunc(event){

  if(hider.checked)

  {todoItems.forEach(todo=>{
    if(todo.checked==true)
    {
      const elem = document.querySelector(`[data-key="${todo.id}"]`);
      elem.style.display="none";

    }
  });

  }
  else{
    todoItems.forEach(todo=>{
      if(todo.checked==true)
      {
        const elem = document.querySelector(`[data-key="${todo.id}"]`);
        elem.style.display="";
  
      }
    });
  
    
  }
 

 



}
 





let filter = document.querySelector('#filter')
filter.addEventListener('keyup', (event)=>{

  let tvalue=filter.value;

  todoItems.forEach(todo=>{
    if(!todo.text.includes(tvalue))
    {
      const elem = document.querySelector(`[data-key="${todo.id}"]`);
      elem.style.display="none";
    }
    else{
    
      const elem = document.querySelector(`[data-key="${todo.id}"]`);
        elem.style.display="";
    }

  });



})










})