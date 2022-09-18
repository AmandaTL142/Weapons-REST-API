// import express
const express = require("express");
// instantiate the library express
const app = express();
const Joi = require('joi');
app.use(express.json())

//GET

//Return all weapons
app.get("/weapons", (req, res) => {
    res.send({
        message: "Information about the actor",
        ...req.query
    });
});

//Retrun specific weapon
app.get("/weapons/:id", (req, res) => {
    if (Number(req.params.id) === 1) {
        res.send({ name: "Bambi", theBestAndOGDeer: true });
    } else {
        res.send({ errorMessage: "I don't know that deer" });
    }
});

//POST
app.post('/api/weapons', (req,res)=>{

    const weapon ={
        id: weapons.length + 1,
        name: req.body.name, 
    }
    weapons.push(weapon)

   res.send(weapon)
})


//POST VALIDATION

app.post('/api/weapons', (req,res)=>{
   
   const schema ={

       name: Joi.string().min(3).required
   };

   const result = Joi.validate(req.body,schema)

   if (result.error)  return res.status(404).send(result.error.details[0].message)
  
   const weapon ={
       id: weapons.length + 1,
       name: req.body.name,
   }
   weapons.push(weapon)

   res.send(weapon)
})


//PUT
app.put('/api/weapons/:id',(req,res)=>{

    const weapon =  weapons.find(c => c.id === parseInt(req.params.id)) // req.params return a string, therefor parseInt
    
    if(!weapon) return res.status(404).send('The weapon with id ' + id + ' was not found.');
    
    
    const {error} =  validateWeapon(req.body) //equal to result.error
   
        if (error) return res.status(404).send(error.details[0].message)
        
    


    weapon.name = req.body.name;

    res.send(weapon)
})

function validateWeapon(weapon){
    const schema ={
        name: Joi.string().min(3).required
    };
 
    return Joi.validate(weapon,schema)

}

module.exports.validateWeapon= validateWeapon();



//DELETE
app.delete('/api/weapons:id', (req,res)=>{

    const weapon =  weapons.find(c => c.id === parseInt(req.params.id)) // req.params return a string, therefor parseInt
    
    if(!weapon) return  res.status(404).send('The weapon with id ' + id + ' was not found.');

    const index = weapons.indexOf(weapons);

    weapons.splice(index,1)
  

    res.send(weapon)

})

app.listen(8080, () => {
    console.log("Server is running on port", 8080);
});

