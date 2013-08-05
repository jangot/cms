$(function() {
    var form = $('form.poker');
    var submit = form.find('input[type="submit"]');
    submit.click(function() {
        stopUpdate();
    });



    $('.remove').click(function() {
        var href = $(this).attr('href');
        form.find('input[name="' + href +'"]').attr('checked', false);
        submit.click();
        return false;
    });

    $('.add select').change(function() {
        var val = $(this).val();
        form.find('input[name="' + val +'"]').attr('checked', true);
        submit.click();
    });

    $('.add input').keyup(function() {
        stopUpdate();
        var val = $(this).val();
        var RE = new RegExp(val);

        var ul = $('.add ul').html('');
        if (!val) {

            return false;
        }
        $('.add select option').each(function(i, item) {
            var name = $(item).attr('value');


            if(RE.test(name)) {
                ul.append('<li>' + name+ '</li>');
            }
        });
    });

    $('.add ul').delegate('li', 'click', function() {
        var name = $(this).html();
        form.find('input[name="' + name +'"]').attr('checked', true);
        submit.click();
    });
    $('button').click(function() {
        startUpdate();
    })
    startUpdate();
});

var t = null;
function startUpdate() {
    t = setInterval(function() {
        var submit = $('form.poker').find('input[type="submit"]');
        submit.click();
    }, 10000);
}
function stopUpdate() {
    if (t !== null) {
        clearInterval(t);
    }
}
