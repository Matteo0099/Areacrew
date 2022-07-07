function Modulo() {
    // Variabili associate ai campi del modulo
    var nome = document.modulo.nome.value;
    var cognome = document.modulo.cognome.value;
    var email = document.modulo.email.value;

    // Espressione regolare dell'email
    var email_reg_exp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;

    //Effettua il controllo sul campo NOME
    if ((nome == "") || (nome == "undefined")) {
    alert("Il campo Nome è obbligatorio.");
    document.modulo.nome.focus();
    return false;
    }

    //Effettua il controllo sul campo COGNOME
    else if ((cognome == "") || (cognome == "undefined")) {
    alert("Il campo Cognome è obbligatorio.");
    document.modulo.cognome.focus();
    return false;
    }
    
    //INVIA IL MODULO
    else {
    document.modulo.action = open('mailto:matteomania09@gmail.com');
    document.modulo.submit();
    }
}

$(document).ready(function () {
    var $input1 = $("#logindata1 input");
    var $input2 = $("#logindata2 input");

    function onChangeInput1() {
        $input1.css("background-color", "#00007F");
        var value = $.trim($input1.val());

        if (value.length === 0) {
            $input1.css("background-color", "transparent");
        }
    }

    function onChangeInput2() {
        $input2.css("background-color", "#00007F");
        var value = $.trim($input2.val());

        if (value.length === 0) {
            $input2.css("background-color", "transparent");
        }
    }

    $input1.on("keyup", onChangeInput1);
    $input2.on("keyup", onChangeInput2);
});