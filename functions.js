export function createElementImage(element, classn,location, value){
    let ele = document.createElement(element);
    ele.className = classn
    ele.src = value
    location.appendChild(ele)
}
export function Randomizer(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isFour(CARDS, values){
    
    let istrue = false
    
    for(let i = 0; i < 3; i++){
        let fruit = CARDS.filter( card => values[i] == card.dataset.value)   
        do{
        console.log(values[i])
        console.log(fruit)
        if( fruit.length == 3 ){
            istrue = false;
            break
        } else {
            istrue = false

            break
        }
    }while(istrue)
        console.log("break")

    }
}
export function setValue(outer,values,cards, images, max, len){
    let y = 0;
    for(let j = 0; j < cards.length; j++){
        let isCom = false;
        let  s = 0;
        do{
                 while( s < cards.length){
                
                let x = Randomizer(0,max);
                cards[s].dataset.value = values[x];
                let fruit = cards.filter( c => values[x] == c.dataset.value)
                if(fruit.length < len){
                    isCom = false
                    createElementImage("img", `${cards[s].dataset.value}_f`,outer[y], images[cards[s].dataset.value]);
                    y++
                    s++
                } else {
                    isCom = true;
                }
                }    
        }while(isCom);
        
    }
        
}
export function resetValue(cards){
    const img_cards = document.querySelectorAll(".cards .outer-card img")
    let img = Array.from(img_cards)
    cards.forEach(o => o.dataset.value = "" );
    cards.forEach(o => o.dataset.complete = "false" );
    img.forEach( i => i.remove())
}

export function checkCard(cards,dif_lvl){
    
    const diff = Number(dif_lvl)
    const card_same = cards.filter( c => c.dataset.open == "open" && c.dataset.complete == "false")
    let cardOpen = card_same.length
    let card_ar = 0
    const lvl_no = diff + 1 // NOTE: BEWARE OF THIS, DON"T CHANGE THE DIFF LEVEL ORDER

    for(let i = 0; i < cardOpen; i++){
        const current = card_same[i]?.dataset.value
        const prev = card_same[i - 1]?.dataset.value
        const next = card_same[i + 1]?.dataset.value

        if(current == ( prev === undefined || prev === null ? current : prev) ){
            card_ar++
            if(cardOpen == lvl_no && card_ar == lvl_no ){    
                cardOpen = 0
                card_same.forEach( c => {
                    c.dataset.complete = "true"
                })
            }
        } else if(current != ( prev === undefined || prev === null ? current : prev)){
            cards.forEach( c => {
                if(c.dataset.complete == "false"){
                    setTimeout(function(){
                        $(c).css({
                            transform: "rotateY(0deg)",
                            transition: "transform 0.5s ease"
                        })
                    }, 1000)
                    cards.forEach( c => {
                        if(c.dataset.open === "open" && c.dataset.complete == "false") 
                            c.dataset.open = "close"
                    })
                }
            })
            
            console.log(cardOpen)
        }
    }
    
}

