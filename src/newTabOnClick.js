function newtab(){
    url = "http://127.0.0.1:5500/img/Logo/LogoAreaCrewVerro.jpeg";
    img = '<img src="'+url+'">';
    popup = window.open();
    popup.document.write(img);                        
    popup.print();
}
