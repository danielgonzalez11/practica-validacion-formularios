$(document).ready(function() {
    $('#formulario').validate({
                    rules: {
                        Nombre:{
                                required:true
                        },
                        Apellidos:{
                                required:true
                        },
                        Telefono:{
                                required:true,
                                digits: true,
                                minlength: 9
                        },
                        Email: {
                                required: true,
                                minlength:4,
                                remote:'php/email.php' 
                        },
                        repetirEmail: {
                                 required: true,   
                                 equalTo: '#Email' 
                        },
                        conocido:{
                                required:true
                        },
                        Demandante:{
                                required:true
                        },
                        NIF: {  
                                required: true,
                                minlength:9,
                                nifES: function(){
                                    if($('#Demandante').val()==='Particular'){
                                        return true;
                                    }
                                },
                                cifES:function(){
                                     if($('#Demandante').val()==='Empresa'){
                                        return true;
                                    }
                                },
                                remote: 'php/NIF.php'
                        },  
                        facNombre:{
                                required:true
                        },
                        Direccion:{
                                required:true
                        },
                        CP:{
                                required:true,
                                digits:true,
                                minlength: 5,
                                rule: function () {
                                    var size =$('#CP').val();
                                    if(size.length<5){
                                        $('#CP').focusin(function(){
                                            var ceros = 5 - size.length;
                                            var add ='';
                                            for(var i = 0; i<ceros;i++){
                                                add +='0';
                                            }
                                            $('#CP').val(add+size);
                                        })
                                        .focus(); 
                                    }
                                    else{
                                        $.get('php/CP.php', {cp: $('#CP').val(), PoM: 'Provincia'},
                                            function (provincia) {
                                            $('#Provincia').val(provincia);
                                        });
                                       $('#localidad').load('php/CP.php',{cp: $('#CP').val(), PoM: 'Localidad'},
                                        function (localidad){
                                            var municipios = jQuery.parseJSON(localidad);
                                            var options='';
                                            for(var i = 0; i < municipios.length; i++){
                                               options+='<option value="'+municipios[i]+'">'+municipios[i]+'</option>';
                                            }
                                            $("#localidad").html(options);
                                        });    
                                    }
                                }
                        },
                        localidad:{
                                required:true
                        },
                        Provincia:{
                                required:true
                        },
                        Pais:{
                                required:true
                        },
                        IBAN: {
                                required: true,
                                iban: true
                        },
                        Pago:{
                                required:true
                        },
                        Usuario: {
                                required:true
                        },
                        password:{
                                required:true,
                                complexify: true
                        },
                        passRepetir:{
                                required:true,
                                equalTo: '#password'
                        }
                    },
                    submitHandler: function() {
                        var pago = $('#Pago').val();
                        if(pago==='Mensual'){
                            pago='50€';
                            alert('Dado de alta correctamente, próxima cuota '+pago, 'Alert Dialog');
                            window.location.href='https://github.com/danielgonzalez11';
                        }
                        else if(pago==='Trimestral'){
                            pago='140€';
                            alert('Dado de alta correctamente, próxima cuota '+pago, 'Alert Dialog');
                            window.location.href='https://github.com/danielgonzalez11';
                        }
                        else{
                            pago='550€';
                            alert('Dado de alta correctamente, próxima cuota '+pago, 'Alert Dialog');
                            window.location.href='https://github.com/danielgonzalez11';
                        }
                        
                    }
    });

    $('#boton2').click(function(){
        alert('Cancelamos el registro');
        window.location.href='https://github.com/danielgonzalez11';

    });

    $('#facNombre').focusin(function() {
        var nombre = $('#Nombre').val();
        var apellidos = $('#Apellidos').val();
        if($('#Demandante').val()==='Particular')
        {
              $('#facNombre').val(nombre +' '+apellidos);
        }
    });

    $('#Demandante').change(function() {
        if($('#Demandante').val()==='Empresa')
        {
            $('#labelFacNombre').text('Empresa*');
            $('#facNombre').val('');
            $('#labelNIF').text('CIF*');
            $('#NIF').val('');
        }
        else
        {
            $('#labelFacNombre').text('Nombre*');
            $('#facNombre').val('');
            $('#labelNIF').text('NIF*');
            $('#NIF').val('');
        }    
    });
    //Al ser readonly, el input y css esta deshabilitado, solo puedo darle placeholder
    $('#Email').focusout(function() {
        var emilio= $('#Email').val();
        $('#Usuario').prop('placeholder',emilio);

    });

    $('#password').focusin(function() {
            $('#password').complexify({}, function(valid, complexity){
                    $('#progressBar').val(complexity);
             });
    });   

 /*   $('#CP').focusout(function() {
        //Comprobar CP
        var postal = $('#CP').val();
       
            if(postal.length===5)
            {
                 $.get('php/CP.php', {cp: $('#CP').val(), PoM: 'Provincia'},
                function (provincia) {
                    $('#Provincia').val(provincia);
                });
               $('#localidad').load('php/CP.php',{cp: $('#CP').val(), PoM: 'Localidad'},
                    function (localidad){
                    var municipios = jQuery.parseJSON(localidad);
                    var options='';
                    for(var i = 0; i < municipios.length; i++){
                        options+='<option value="'+municipios[i]+'">'+municipios[i]+'</option>';
                    }
                    $("#localidad").html(options);
                });    
            }
            else{
                $('#CP').val('0'+postal);
            }
    });*/

});

                                   