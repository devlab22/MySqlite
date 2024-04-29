class MyEvent{

    constructor(){
        this.events = {}
    }

    addEvent(event, func){

        if (!(event in this.events)){
            this.events[event] = []
        }

        this.events[event].push(func)
        
    }

    removeEvent(event, func=null){

        if(event in this.events){
            if(func === null){
                this.events[event] = []
            }
            else{

                const index = this.events[event].indexOf(func)
                if(index > -1){
                    this.events[event].slice(index,1)
                }
                
            }
        }
    }

    submit(event, params={}){

        if(event in this.events){
            
            for(var i=0; i<this.events[event].length; i++){
                this.events[event][i](params)
            }
        }
    }

    isEventExists(event, func=null){

        var exists = false
        if(event in this.events){
            exists = true

            if(func){
                exists = false

                if(this.events[event].includes(func)){
                    exists = true
                }
            }
        }

        return exists
    }
}

module.exports = MyEvent