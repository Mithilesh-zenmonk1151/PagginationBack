const User = require('../models/User');

const userController = {};

userController.getUsers = async (req,res) => {

console.log("helood")
    const pageNuumber = req.query.page || 1;
    const limit = req.query.limit || 3; 

  const Account=req.query.name;
  const AccountTypes=req.query.AccountType

   console.log(AccountTypes)

    const users = await User.find().limit(limit).skip((pageNuumber - 1) * limit );
    const query={
      name: { $regex: new RegExp(`^${Account}`, 'i') }
    }
    if(AccountTypes){
      query.AccountType=AccountTypes
    }
    const search = await User.find(query).limit(limit).skip((pageNuumber - 1) * limit).lean();
  


    const count =await User.countDocuments();    
    return res.status(200).json({
        success: true,
         no_of_records:count,
        search : search,
        page : Math.ceil( count / 4 ),
      })

      const ID = await User.id
}

userController.createUser = async (req,res) => {
    try {
    
        const {
          name,
          email,
        
        AccountType,
          description
          
        } = req.body
        
        
        
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
        }
        const allUser=await User.find({AccountType:AccountType })
        console.log(allUser)
        
       
       
        
        let approved = ""
        approved === "Retailer" ? (approved = false) : (approved = true)
    
        
        
        const user = await User.create({
          name,
         
          email,
         AccountType,
         description
        })
    
        return res.status(200).json({
          success: true,
          user,
          message: "User Written successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be written. Please try again.",
        })
      }

}


userController.getUser = async (req,res) => {

    const user = await User.findById(req.params.id);
    res.json(user);
}

userController.editUser = async (req,res) => {
    const { id } = req.params;
    console.log(req.body)
    console.log(id)
   
    try {
        const data = await User.findByIdAndUpdate({_id: id}, req.body)
      console.log(data)
        if(data.matchedCount == 0)
        {
            res.json({'status': 'user not found'}); 
        }

else{
  res.json({'status': 'User updated'});
}
        
    } 
    catch (err) {
        console.log(err)
        res.json({'status': 'something went wrong'});
    }


}

userController.deleteUser = async (req,res) => {


    console.log(req.params.id);
    await User.deleteOne({
        email: req.params.id
    });
    res.json({'status': 'user removed'});
}

module.exports = userController;