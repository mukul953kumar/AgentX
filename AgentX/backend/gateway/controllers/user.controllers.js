const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        console.log(`error getting current user : ${error.message}`)
        return res.status(500).json({success:false,message: `error getting current user : ${error.message}`})
    }
}
export default getCurrentUser