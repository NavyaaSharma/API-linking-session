$(document).ready(function () {

    var $button = $('#addItem');
    var $input = $('#input');
    var $ol = $('#toDoList');
    var $li = $('li');

    $button.on('click',
        function () {
            var newToDo = $input.val();
            $ol.append('<li class="toDoDel">' + newToDo + '</li>');
            $input.val('');
        });

    $input.keyup(function (event) {
        if (event.keyCode == 13) {
            $button.click();
            $(this).val('');
        }
    });

    $(document).on('dblclick', '.toDoDel', function () {
        $(this).toggleClass('strike').fadeOut('slow');
    });

    $input.focus(function () {
        $(this).val('');
    });

    $ol.sortable();
});