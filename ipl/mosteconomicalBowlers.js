function mosteconomicalBowlers(deliveries){
    const bowlers={};//for runs
    const bowlers12={};//for count of balls
    const finalResult={};
    for(let delivery of deliveries){
        var matchId=delivery.match_id;
        if(matchId>=518 && matchId<=576){
        var bowler=delivery.bowler;
        if(bowlers[bowler]){
            bowlers[bowler] += parseInt(delivery.total_runs);
            bowlers12[bowler] +=(delivery.total_runs);//without parseInt it gives numbver of balls
        }
        else
            {
            bowlers[bowler] = parseInt(delivery.total_runs);
            bowlers12[bowler] =(delivery.total_runs);//without parseInt it gives numbver of balls

        }  
        }
    }
//SORTING THE Ob:-
    var sortable = [];
    for (var i in bowlers) {
    sortable.push([i, ((bowlers[i])/((bowlers12[i].length)/6)).toFixed(3)]);
    }
    sortable.sort(function(a, b) {
    return a[1] - b[1];
    });
    var s12=sortable.slice(0,10); //TOP TEN ONLY
    for(var i=0;i<s12.length;i++){

    finalResult[s12[i][0]]=s12[i][1];
}

return(finalResult);

}

module.exports =mosteconomicalBowlers;