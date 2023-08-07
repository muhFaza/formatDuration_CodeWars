function formatDuration (seconds) {
  
    //seconds
    const sec = function (x) {
      if(x <= 60 && x >= 0){
        if(x > 1) return `${x} seconds`
        else return `${x} second`
      }
    }
  
    //minutes
    const min = x =>{
      
      const plural = y =>{
        if(y > 1) return `${y} minutes`
        else return `${y} minute`
      }
  
      //if no reminder
      if(x%60 == 0 && x/60 >= 0) return plural(x/60)
  
      //with leftover
      let reminder = x%60
      x = Math.floor(x/60)
      return `${plural(x)} and ${sec(reminder)}`
    }
    
    const hour = x =>{
  
      const plural = y =>{
        if(y > 1) return `${y} hours`
        else return `${y} hour`
      }
  
      //if no reminder done
      if(x/60%60 == 0 && x/60 >= 0) return plural(x/60/60)
  
      //with leftover
      let reminder = x/60%60 //minutes left
      x = Math.floor(x/60/60) //hours
  
      //leftover min only done
      if(reminder > 1 && reminder*60%60 == 0){
        return `${plural(x)} and ${min(reminder*60)}`
      }
  
      //leftover min and sec
      if(reminder > 1){
        return `${plural(x)}, ${min(Math.round(reminder*60))}`
      }
  
      //leftover sec only
      if(reminder < 1) return `${plural(x)} and ${sec(Math.floor(reminder*60))}`
    }
  
    const day = x =>{
      // get days x/60/60/24
      const plural = y =>{
        if(y > 1) return `${y} days`
        else return `${y} day`
      }
      //only day
      let manyDays = Math.floor(x/60/60/24) //get days floored
      let reminder = x%86400;
      if(x/60/60%24 == 0) return plural(manyDays)

      //day hour min sec
      if(reminder >= 3600 && reminder < 86400){
        return `${plural(manyDays)}, ${hour(reminder)}`
      }

      //day min sec
      if(reminder >= 60 && reminder < 3600){
        return `${plural(manyDays)}, ${min(reminder)}`
      }

      //day sec
      if(reminder < 60){
        return `${plural(manyDays)} and ${sec(reminder)}`
      }
    }
    
    if(seconds < 60) return sec(seconds);
    if(seconds < 3600) return min(seconds);
    if(seconds < 86400) return hour(seconds);
    if(seconds < 2592000) return day(seconds);
  }
  formatDuration(3600) //1h
  formatDuration(3555) //59m 15s
  formatDuration(3900) //1h 5m
  formatDuration(86399) //23h 59m 59s
  formatDuration(7230) // 2h 30s
  formatDuration(86400) // 1d
  formatDuration(172800) // 2d
  formatDuration(141930)//1d 15h 25m 30s
  //Incorrect answer for seconds=15731080: expected undefined to equal '182 days, 1 hour, 44 minutes and 40 s…'