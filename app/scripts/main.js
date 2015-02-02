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
            $('#labelNIF').text('CIF*');
        }
        else
        {
            $('#labelFacNombre').text('Nombre*');
            $('#labelNIF').text('NIF*');
        }    
    });

    $('#Email').focusout(function() {
        var emilio= $('#Email').val();
        $('#Usuario').prop('placeholder',emilio);

    });

});

                                   