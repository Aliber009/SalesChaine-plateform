
const Organization=require('../models/organization')

const organizationController={
getAll:async function(req, res) {
    try{
    const org=await Organization.findAll();
    res.json({success: true, organizations: org})
    }
    catch(e){
      res.json({success: false})
    }
},
create:(req,res)=>{
   
    const {name,description}=req.body;
    const newOrganization = {name:name,description:description} 
    Organization.create(newOrganization).then((Organization)=>{ res.json({success:true,msg:"created",organizationId:Organization.id}) })
    .catch(()=>res.json({success:false,msg:"failed"})) 
},
edit:(req,res)=>{
    const {organizationId,name,description}=req.body
    Organization.findAll({ where: {id:organizationId}}).then((organization)=>{
        if (organization.length == 1)
         {
             const newValues={name:name,description:description}
             Organization.update(newValues,{where:{id: organization[0].id}})
             .then(()=> {
              res.json({success: true,organizationId:organizationId});
              })
             .catch(()=>{
                  // eslint-disable-next-line max-len
                  res.json({success: false, msg: 'There was an error. Please contract the administator'});
                }
              )
            }
        else
            {
              res.json({success: false});
            }
      })
    },
    delete:(req,res)=>{
        const {organizationId}=req.body
        Organization.findAll({where:{id:organizationId}}).then((organization)=>{
            if(organization.length == 1){
               Organization.destroy({where:{id: organization[0].id}}).then(o=>{
                   res.json({success: true,msg:"Organization deleted succesfully",organizationId:organizationId});
               })
               .catch(()=>{res.json({success:false,msg:"not deleted"})})
            }
            else{
                res.json({success: false});
            }
        })
    }
}
module.exports=organizationController