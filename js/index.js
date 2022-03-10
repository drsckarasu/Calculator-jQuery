$(document).ready(function(){
    const TWO = 2;
    $('.digit').on('click', function() {
        let currentValue = $('.input-display').val();
        let length = currentValue.length;
        let flag = false;
        let char = $(this).attr('value');
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            flag = true;
        }
        if (length === 0) {
            if (flag) {
                return;
            }
        }
        let flagNew = false;
        let lastCharacter = currentValue[length-1];
        if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === '*' || lastCharacter === '/') {
            flagNew = true;
        }
        if (flag && flagNew) {
            $('.input-display').val(currentValue.substring(0,length-1) + char);
        } else {
            $('.input-display').val($('.input-display').val() + char);
        }
    });

    $('.clear').on('click', function() {
        $('.input-display').val('');
    });

    $('.equal').on('click', function() {
        let currentValue = $('.input-display').val();
        let length = currentValue.length;
        let flag = false;
        let char = currentValue[length-1];
        if (char === '+' || char === '-' || char === '*' || char === '/' 
            || $('.input-display').val().includes('ERROR')) {
            flag = true;
        }
        if (flag) {
            $('.input-display').val('ERROR');
        } else {
            let res = parseFloat(evil($('.input-display').val()).toFixed(TWO));
            if (res === Infinity){
                $('.input-display').val('ERROR');
            } else {
                $('.input-display').val(res);
                let logText = `${currentValue} = ${res}`;
                if (currentValue === res.toString()) {
                    return;
                } else {
                    $('.calculator-desk').prepend( `<div class="log"><span class="circle"></span>${logText}
                    <span class="close"><span class="close-one"></span>
                    <span class="close-two"></span></span></div>` );
                    $('.circle' )
                        .on('mouseenter', function() {
                            $( this ).css({
                            'border-color': 'red'
                            });
                        })
                        .on('mouseleave', function() {
                            let styles = {
                                borderColor: ''
                            };
                            $( this ).css( styles );
                        });
                    $('.close' )
                        .on( 'mouseenter', function() {
                            $(this).children('.close-one').css({
                                'background-color': 'red'
                            });
                            $(this).children('.close-two').css({
                                'background-color': 'red'
                            });
                        })
                        .on('mouseleave', function() {
                            $(this).children('.close-one').css({
                                'background-color': 'white'
                            });
                            $(this).children('.close-two').css({
                                'background-color': 'white'
                            });
                        });
                    $('.close').click(function() {
                        $(this).closest('.log').remove();
                    });
                }
            }
            
        }
    });
    $(document).on('click', '.circle', function(){
        $( this ).toggleClass('toggle-color');
    }); 
    function evil(fn) {
        return new Function('return ' + fn)();
    }
});