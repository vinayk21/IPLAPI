

const registerUser = async (req,res) =>{
  
    return await res.status(200).json({
       message:"ok"
    })
}

module.exports = { registerUser }