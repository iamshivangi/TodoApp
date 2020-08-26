$(document).ready(function () {

    let todoItems = [];//Array to store the todos
    function renderTodo(todo) {//function to render todo on the screen

        //changing the title line showing number of todo
        let update = $('#list-title').html(`<h1>You have ${todoItems.filter((todo) => todo.checked == false).length} To Dos Left</h1>`);

        const existing = $(`[data-key=${todo.id}]`);
        if (todo.deleted === true) {
            existing.remove();
            return;
        }
        const item = document.createElement('li'); // creating the element to add in the DOM

        let isChecked = todo.checked ? "done" : "";


        $(item).attr({ 'class': `tasks${isChecked}`, 'data-key': `${todo.id}` });

        $(item).html(`
            <div>
            <input id ="${todo.id}" class ="tick" type ="checkbox" />
            <label for = "${todo.id}"></label>
            <span class ="todo-text">${todo.text}</span>
            </div>

            <button class="delete-todo">Remove</button>

            `);


        if (existing.length != 0)//to prevent duplication on rendering once the nodes are checked
        {
            if (todo.checked === true) {
                $(item).html(`
                    <div>
                    <input id ="${todo.id}" class ="tick" type ="checkbox" checked/>
                    <label for = "${todo.id}"></label>
                    <span class ="todo-text">${todo.text}</span>
                    </div>
                    <button class="delete-todo">Remove</button>
                    `);
                existing.replaceWith(item);
            }
        }
        else {
            $("#list-items").append(item);
        }
    }

    function addTodo(text)//to create the todo from text and push it in the array
    {
        const todo = {
            text: text,
            checked: false,
            id: Date.now()
        }
        todoItems.push(todo);
        renderTodo(todo);
    }

    function toggle(itemkey) {
        const i = todoItems.findIndex(items => items.id === Number(itemkey));

        todoItems[i].checked = !todoItems[i].checked;


        renderTodo(todoItems[i]);
    }

    function deleteTodo(key) {
        // find the corresponding todo object in the todoItems array
        const index = todoItems.findIndex(item => item.id === Number(key));
        //New Object to  copy the  properties of the todo that has to be deleted
        const todo = {
            deleted: true,
            ...todoItems[index]
        };
        // remove the todo item from the array by filtering it out
        todoItems = todoItems.filter((item) => item.id !== Number(key));
        renderTodo(todo);
    }


    $("#todoform").submit(function (event) {
        event.preventDefault();//to prevent data loss by refreshing of the browser   
        const text = $("#todo").val().trim();

        if (text != "") {
            addTodo(text);
            $("#todo").val("");
            $("#todo").blur();
        }
    });



    //handling check and deleting event
    $("#list-items").click(function (event) {
        if (event.target.classList.contains('tick')) {
            const itemKey = event.target.parentElement.parentElement.dataset.key;
            toggle(itemKey);
        }
        if (event.target.classList.contains('delete-todo')) {
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    }
    );


    //hide completed
    $('#hider').click(event => {
        if ($("#hider:checked")) {
            todoItems.forEach(todo => {
                if (todo.checked === true) $(`[data-key="${todo.id}"]`).css("display", "none");
            });
        }
        else {
            todoItems.forEach(todo => {
                if (todo.checked === true) $(`[data-key="${todo.id}"]`).css("display", "none");
            });
        }

    });


    //filtering

    $("#filter").keyup((event) => {

        todoItems.forEach(todo => {
            if (!todo.text.includes($("#filter").val())) $(`[data-key="${todo.id}"]`).css("display", "none");

            else $(`[data-key="${todo.id}"]`).css("display", "");

        })
    })






























})