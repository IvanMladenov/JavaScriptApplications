var app = app||{};

(function (scope){
    function eventListenerFactory (type){
        var button = $('<button>');
        switch (type){
            case 'edit':
                button.text('Edit').addClass('edit').on('click', scope.editBook.getOldData);
                break;
            case 'delete':
                button.text('Delete').on('click', scope.deleteBook);
                break;
            default:
                throw new Error('Unknown type');
        }

        return button;
    }

    scope.eventListenerFactory = eventListenerFactory;
})(app);



