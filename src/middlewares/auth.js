 const adminAuth = (req, res, next) => {
    console.log("Admin is getting checked ")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("un authorised request")
    } else {
        next();
    }
}

const userAuth =(req,res,next)=>{
    console.log("user validation")
    const token = "xyz";
    const isuserAuthorised=token==="yer";
    if(!isuserAuthorised){
        res.status(401).send("Un authorised")
    }else{
        next();
    }
}

module.exports={adminAuth,userAuth}