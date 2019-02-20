
window.onload = function(){
    let section = document.getElementsByTagName("section")[0];
    document.getElementById("rechercheWiki").placeholder = "Reinventing the wheel"

    let lanceRequete = function(){
        //Removes the previous searches
        if (section.firstChild){
            section.removeChild(section.firstChild)
        }


        let mainContainer = document.createElement("div");
        let request = new XMLHttpRequest();
        let URL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
        let textRequete = document.getElementById("rechercheWiki").value;
        if (textRequete!=""){
            request.open("GET",URL+textRequete,false);
            request.send();
            let data = JSON.parse(request.responseText);
            for(i=0;i<data[1].length;i++){
                // console.log(data[1][i])
                // console.log(data[2][i])
                // console.log(data[3][i])

                mainContainer.id= data[0];
                let title = document.createElement("h2")
                let text = document.createElement("p")
                let link = document.createElement("a")
                title.innerText = data[1][i]
                text.innerText = data[2][i]
                link.href = data[3][i]

                section.appendChild(mainContainer);
                mainContainer.appendChild(link);
                link.appendChild(title);
                mainContainer.appendChild(text)
            }
        }
    }
    document.getElementById("rechercheWiki").addEventListener("input",lanceRequete)
    // document.getElementById("rechercheWiki").addEventListener("mouseover",function(){
    //     document.getElementById("rechercheWiki").value = ""})

}