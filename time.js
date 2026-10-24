export function Countdown(value,timer_x){
    this.value = value;
    this.timer_x = timer_x;
    this.time_sep = this.value.split(":");
    this.time_conv = this.time_sep.map( n => Number(n))
    this.min = this.time_conv[0]
    this.sec = this.time_conv[1]
    this.timeId = null;
    this.start;
    this.stopp;
} 
Countdown.prototype.checker = function(){
    console.log(this.value);
    console.log(this.timer_x.textContent);
    console.log(this.time_sep);
    console.log(this.time_conv);
    console.log(this.min)
    console.log(this.sec);
    console.log(this.timeId);

}

Countdown.prototype.start = function(){
    const self = this
    //BUGGGGGGGGGGG
    self.timer_x.textContent = self.min.toString().padStart(2,"0") + ":" + self.sec.toString().padStart(2,"0")
    if( self.timeId !== null) return
    console.log(self.min)
    console.log(self.sec);
    return new Promise ((resolve ) => {
        self.timeId = setInterval(function(){
            console.log(self.min)
            console.log(self.sec);
            console.log(`Time Id ${self}`)

            if(notif()){
                if(self.min > 0 && self.sec == 0){
                    self.min--
                    self.sec = 59 
                    console.log(self.timeId)
                } else if (self.sec > 0 ){ 
                    self.sec--
                    // console.log(self.min)
                    // console.log(self.sec);
                    console.log(self)
                    console.log(self.timeId)

                } else if(self.min == 0 && self.sec == 0) {
                    console.log("DONE")
                    self.stopp()
                    console.log(self)
                    console.log(self.timeId)
                    alert("You LOSE")
                }
            } else if(!notif()) {
                self.stopp()
                alert("You WIN")
                resolve("You WIN")
            }
            console.log(self.min)
            console.log(self.sec);
            console.log(self.timeId);
            self.timer_x.textContent = String(self.min).padStart(2,"0") + ":" + String(self.sec).padStart(2,"0")
        }, 1000);
    }).then()
}
Countdown.prototype.stopp = function(){
    // console.log(this.timeId)
    // console.log("STOPPPP " + this.timeId)
    clearInterval(this.timeId)
    this.timeId = null;
    this.min = 0;
    this.sec = 0;
    this.timer_x.textContent = String(this.min).padStart(2,"0") + ":" + String(this.sec).toString().padStart(2,"0")
}
function notif(){
    const cardS = document.querySelectorAll(".cards")
    const cards = Array.from(cardS)
    const cardOpen = cards.filter( n => n.dataset.open == "open" && n.dataset.complete == "true");
    // console.log("NOTIF FUNCTION" + cardOpen.length)
    if(cardOpen.length == 12) return false
    else return true
}
