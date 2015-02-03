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
                                rule: function(){
                                    $('#CP').focusout(function() {
                                        var cp = $('#CP').val();
                                        if (cp.length<5)
                                        {
                                            $('#CP').val('0'+cp);
                                            
                                        }
                                    });
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
                                required:true
                        }
                    }
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

    $('#CP').focusout(function() {
        //Comprobar CP
        $.get('php/CP.php', {cp: $('#CP').val(), PoM: 'Provincia'},
            function (provincia) {
                $('#Provincia').val(provincia);
            }
        );
       $('#localidad').load('php/CP.php',{cp: $('#CP').val(), PoM: 'Localidad'},
            function (localidad){
                //$('#localidad').val(localidad);
            }
        ); 
    });

});

                                   