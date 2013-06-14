$(function() {

    $('form').each(function(i, form) {
        $(form).ajaxForm({
            beforeSubmit : function() {
                $(form)
                    .find('.errorBlock')
                    .html('')
                    .hide()
                ;
            },
            success : function(url) {
                document.location.href = url;
            },
            error : function(data) {
                if (data.status == CONST.ERROR_HTTP_FORM) {
                    var errors = data.responseJSON;

                    for (var name in errors) {
                        $(form)
                            .find('[data-name="'+ name +'"] .errorBlock')
                            .html(errors[name])
                            .show()
                        ;
                    }
                }
            }
        });
    })
});
