onmessage = (arg) => {
    
    let mid;
    arg = arg.data;
    let j = arg.length;
    console.log(j)
    
    for (let i = 0; i<j; i++){
        
        for (let k = 0; k<i; k++){
            if (arg[i] > arg[k]) {
            mid = arg[i];
            arg[i] = arg[k];
            arg[k] = mid; 
            
            }
            
        }
        
    }
    postMessage(arg);
    
    
    
}