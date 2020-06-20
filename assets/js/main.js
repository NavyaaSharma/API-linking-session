$(document).ready(function () {

    var $button = $('#addItem');
    var $input = $('#input');
    var $ol = $('ol');
    var $li = $('li');

    $button.on('click',
        function () {
            var newToDo = $input.val();
            $ol.append('<li>' + newToDo + '</li>');
            $input.val('');
        });

    $input.keyup(function (event) {
        if (event.keyCode == 13) {
            $button.click();
            $(this).val('');
        }
    });

    $(document).on('dblclick', 'li', function () {
        $(this).toggleClass('strike').fadeOut('slow');
    });

    $input.focus(function () {
        $(this).val('');
    });

    $ol.sortable();
});