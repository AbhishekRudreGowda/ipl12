const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear=require("./ipl/matchesPlayedPerYear");
const winsPerTeameachYear=require("./ipl/winsPerTeameachYear");
const extraRunsConceded=require("./ipl/extraRunsConceded");
const mosteconomicalBowlers =require("./ipl/mosteconomicalBowlers");
const mostManOfTheMatches=require("./ipl/mostManOfTheMatches");
const winsPerVenue= require("./ipl/winsPerVenue");
const winsByAllTeams=require("./ipl/winsByAllTeams");

const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";


function main() {

  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let all_in_one_Result={};
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries =>{
        let result = matchesPlayedPerYear(matches);
        let result2 = winsPerTeameachYear(matches);
        let result3=extraRunsConceded(deliveries);
        let result4=mosteconomicalBowlers(deliveries);
        let result5=mostManOfTheMatches(matches);
        let result6=winsPerVenue(matches);
        let result7 = winsByAllTeams(matches);

        all_in_one_Result['matchesPlayedPerYear'] = result;
        all_in_one_Result['winsPerTeameachYear'] = result2;
        all_in_one_Result['extraRunsConceded'] = result3;
        all_in_one_Result['mosteconomicalBowlers'] = result4;
        all_in_one_Result['mostManOfTheMatches'] = result5;
        all_in_one_Result['winsPerVenue'] = result6;
        all_in_one_Result['winsByAllTeams'] =result7;
        const jsonString =JSON.stringify(all_in_one_Result);
        fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if(err){
        console.error(err)
        }
      });
  
  }); 
 });
}
main();



const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/mostWicketsTeam/:yearId', (req, res) => {
      // function extraRuns(matches,deliveries) {
      //   var result = {};
      //   var a = [];
      //   for (var match of matches) {
      //     var season = match.season; 
      //     if(season == (req.params.yearId)){
      //       var id = match.id;
      //       a.push(id);
      //     }
      //   }
      //   for (var delivery of deliveries) {
      //     var team = delivery.bowling_team;
      //     var matchId = delivery.match_id
      //     if (a.includes(matchId)) {
      //       if (result[team]) {
      //         result[team] += parseInt(delivery.extra_runs);
      //       } else {
      //         result[team] = parseInt(delivery.extra_runs);
      //       }
      //     }
      //   }
      //   //console.log(result);
      //   return result;
      // }

      function mostWicketsTeam(matches,deliveries){
        let result={};
  let arrofIds=[];
        for (let match of matches){
        let season =match.season;
        let match_id=match.id;
        if(season == (req.params.yearId)){
          arrofIds.push(match_id)
        }
      }for(let delivery of deliveries){
        let match_id=delivery.match_id;
        if(arrofIds.includes(match_id)){
          var team=delivery.bowling_team;
          if(delivery.player_dismissed==delivery.batsman){
            if(result[team]){
              result[team]+=1
            }else{
              result[team]=1
            }
          }
        }
      }return result;
  
      }
      

const fs = require("fs");
const csv = require("csvtojson");
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
let finalResult1 = {};
function main2() {

    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        let result={};
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries =>{
          result = mostWicketsTeam(matches,deliveries);
          console.log(result);
          finalResult1 = JSON.stringify(result);
          res.send(finalResult1);
         // res.send(result);
    }); 
   });
  }
  main2();
});

app.listen(port, () => {
  if (port == 3000){
  console.log(`server running at localhost:${port}`);
}
  else{
  console.log(`Server is Running`);
}
});
