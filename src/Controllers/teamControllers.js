const { Team } = require("../Models/teamModel");

class teamControllers{
 
async Create(req,res){
   const { teamName } = req.body;
   console.log(teamName);
   const createTeam =await new Team({teamName}).save()
   console.log("cretae",createTeam);
   res.send(createTeam)
 }

}

module.exports =new teamControllers();   