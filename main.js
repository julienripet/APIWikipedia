window.onload = function(){


    let section = document.getElementsByTagName("section")[0];
    document.getElementById("rechercheWiki").placeholder = "Reinventing the wheel";
    document.getElementById("rechercheWiki").value = "";
    let previousSearch = "";

    let lanceRequete = function(){
        let timeTillExecution = 2000;
        setTimeout(function(){

            let mainContainer = document.createElement("div");
            mainContainer.className="row";

            //Create the XHR 
            let request = new XMLHttpRequest();
            let URL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
            let textRequete = document.getElementById("rechercheWiki").value;
            if (textRequete != "" && textRequete != previousSearch){

                //Removes the previous searches
                if (section.firstChild){
                    section.removeChild(section.firstChild);
                }
                request.open("GET",URL+textRequete,true);
                console.log(textRequete);
                request.onload=function(e){
                    console.log(request.readyState + " " + request.status)
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            let data = JSON.parse(request.responseText);
                            
                            //Loop in data, creates HTML from it
                            for(i=0;i<data[1].length;i++){

                                mainContainer.id= data[0];
                                let individualDivs = document.createElement("div");
                                let marginer = document.createElement("div");
                                let title = document.createElement("h2");
                                let text = document.createElement("p");
                                let link = document.createElement("a");

                                marginer.className = "marginer";
                                individualDivs.className = "col-12 col-sm-12 col-md-6 col-lg-6";
                                link.innerText = data[1][i];
                                text.innerText = data[2][i];
                                link.href = data[3][i];

                                section.appendChild(mainContainer);
                                mainContainer.appendChild(individualDivs);
                                individualDivs.appendChild(marginer)
                                marginer.appendChild(title)
                                title.appendChild(link);
                                marginer.appendChild(text);
                            }
                        }
                    }
                }
                request.onerror=function(){
                    section.innerText="Erreur durant la recherche, vérifiez votre connexion internet";
                }
                request.send();
                previousSearch = textRequete;
                
                }
            },timeTillExecution);
        }
    
    document.getElementById("rechercheWiki").addEventListener("input",lanceRequete);




}