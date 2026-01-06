const connection = require('../connection')
const bcrypt = require('bcrypt');
async function populate_patient(req, res) {
    try {

        connection.query("SELECT * FROM patient", (err2, result2) => 
            {
            if (err2) {
                console.error("Error fetching patients:", err2);
                return res.status(500).json({ error: "Failed to fetch patients" });
            } if (result2.length>0)
{
            return res.status(200).json({ message:"already exist",patients: result2 });
}
        });
    
        let values = [];

        for (let i = 0; i < 10; i++) {
            const username = `patient${i + 1}`;
            const password = await bcrypt.hash(`patient${i + 1}@123`, 12);
            values.push(`(${i+1},'${username}', '${password}', '1234567890' )`);
        }

        const query = `INSERT INTO patient (id,name, password,contact) VALUES ${values.join(", ")};`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting patients:", err);
                return res.status(500).json({ error: "Failed to insert patients" });
            }

            console.log("patients created successfully");
            connection.query("SELECT * FROM patient", (err2, result2) => {
                if (err2) {
                    console.error("Error fetching patients:", err2);
                    return res.status(500).json({ error: "Failed to fetch patients" });
                }

                return res.status(200).json({ patients: result2 });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

function  login_patient(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'name or password is null'});
    }
    try
    { const name=username;
        connection.query('SELECT * FROM patient where name=?',[name],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            { 
                if (results.length==0)
                {
                    return res.status(400).json({message:'name is invalid'});

                }
                else
                { 
                    if (await bcrypt.compare(password,results[0].password))
                    {
                    return res.status(200).json({message:"successful-login",name:results});
                    }
                    else
                    {
                        return res.status(400).json({message:'password is invalid'});

                    }


                }
            }
        })

    }
    catch(err)
    {
        console.log("Unexpected error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
    
}
function  register_patient(req,res,next)
{
    let {username,password,contact}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'name or password is null'});
    }
    try
    {const name=username;
        connection.query('SELECT password FROM patient where name=?',[name],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                  let hashed_password=await bcrypt.hash(password,12);
              
                    
        connection.query('INSERT INTO patient (name,password,contact) VALUES (?,?,?);',[name,hashed_password,contact],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time'});

            }
            else
            {
                return res.status(200).json({message:'sucessful entry'});
            }
        });
                }
                else
                { 

                    return res.status(400).json({message:'name exists try to login'});

                }
            }
        })

    }
    catch(err)
    {
        console.log("Unexpected error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
    
}

function  update_patient(req,res,next)
{
    let {username,password,contact}=req.body;
    if (!username)
    {
        return res.status(400).json({message:'name  is null'});
    }
    try
    {let name=username;
        connection.query('SELECT password FROM patient where name=?',[name],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                    return res.status(400).json({message:'name is invalid'});

                }
                else
                {  let fieldsToUpdate = [];
                    let values = [];
                    
                    // Hash the password only if it's not null
                    if (password) {
                        const hashed_password = await bcrypt.hash(password, 10);
                        fieldsToUpdate.push("password = ?");
                        values.push(hashed_password);
                    }
                    
                    if (contact) {
                        fieldsToUpdate.push("contact = ?");
                        values.push(contact);
                    }
                    
                  
                    
                    if (fieldsToUpdate.length === 0) {
                        return res.status(400).json({ message: "No valid fields provided for update." });
                    }
                    values.push(name);
                    
                    connection.query(`UPDATE patient SET ${fieldsToUpdate.join(", ")} WHERE name = ?`,values,async (err,results)=>{
                   
                        if (err )
                        { 
                            return res.status(400).json({message:'internal server error ,try some other time'});
            
                        }
                        else
                        {
                            return res.status(200).json({message:'sucessful update'});
                        }
                    });

                }
            }
        })

    }
    catch(err)
    {
        console.log("Unexpected error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
    
}
function  delete_patient(req,res,next)
{
    let {username}=req.params;
    if (!username )
    {
        return res.status(400).json({message:'name is null'});
    }
    try
    {let name=username;
        connection.query('SELECT password FROM patient where name=?',[name],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                    return res.status(400).json({message:'name is invalid'});

                }
                else
                {
                    connection.query('DELETE FROM patient  WHERE name=?;',[name],async (err,results)=>{
                   
                        if (err )
                        { console.log(err,results);
                            return res.status(400).json({message:'internal server error ,try some other time',err:err});
            
                        }
                        else
                        {
                            return res.status(200).json({message:'sucessful delete'});
                        }
                    });


                }
            }
        })

    }
    catch(err)
    {
        console.log("Unexpected error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
    
}

function get_patient(req,res,next)
{
    try {

        connection.query("SELECT name,contact FROM patient", async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching patient:", err2);
                return res.status(500).json({ error: "Failed to fetch patients" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "all patient's list", patients: result2 });
            }
            else
            {
                return res.status(200).json({ message: "no patient's exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}

function get_patient_by_username(req,res,next)
{ const {username}=req.params;
const name=username;
    try {

        connection.query("SELECT name,contact FROM patient where name=?",[name], async (err2, result2) => {
            
            if (err2) 
                {
                console.error("Error fetching patient:", err2);
                return res.status(500).json({ error: "Failed to fetch patients" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "patient", patients: result2[0] });
            }
            else
            {
                return res.status(200).json({ message: "this usernmaed patient does not exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}



module.exports = 
{
    populate_patient,
    login_patient,
    register_patient,
    update_patient,
    delete_patient,
    get_patient,
    get_patient_by_username
}
