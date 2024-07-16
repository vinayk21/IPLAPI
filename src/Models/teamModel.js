const mongoose = require("mongoose")

const teamSchema = mongoose.Schema({
    teamName:{type:String, require:true}
}
)

const Team = mongoose.model('Team',teamSchema)

module.exports = { Team }