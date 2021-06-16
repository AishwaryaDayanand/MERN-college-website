const jwt = require("jsonwebtoken")
function authentication(req,res,next){
    try{
      const token = req.cookies.token;
      if (!token) {
        return res.json({ msg: "please log in" });
      }
      //verify token if exist or created using the secret key we provided....it returns the payload
      // as we used _id as payload we get it back as object --{userId:id_value}

      const verified = jwt.verify(
        token,
        "jNzb-nncUP7asaR_G9JMpH*58hyqGydm*B6e@AYnzxtBxrGhgp"
      );
      req.userId = verified.userId; // add user_id to req object, which is supported in JS,userId is now accessible to callback function(i,e fun which called middleware)
      next();
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg:",,,unauthorised"})
    }
}

module.exports = authentication