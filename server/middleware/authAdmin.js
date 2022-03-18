const auth = async (req,res,next) => {
    if(req.body.secret !== 'jomoc') res.status(403).json({message : "Sorry but you are not authorized"})
    next()
}

module.exports = { auth }