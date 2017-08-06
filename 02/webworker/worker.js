addEventlistener("message",(arg) => {
    let j = arg.length;
    let mid;
    for (let i = 0; i<j-1; i++){
        for (let k = i+1; k<j-1; k++){
            if (arg[i] > arg[i+1]) {
            mid = arg[i];
            arg[i] = mid;
            arg[i+1] = mid; 
            }
        }
        
    }
    postMessage(arg);
})