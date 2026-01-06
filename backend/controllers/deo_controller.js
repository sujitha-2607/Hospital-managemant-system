const connection = require('../connection')
const bcrypt = require('bcrypt');
async function populate_deo(req, res) {
    try {

        connection.query("SELECT * FROM deo", async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching deo:", err2);
                return res.status(500).json({ error: "Failed to fetch deos" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "already exist", deos: result2 });
            }
      

        let values = [];

        for (let i = 0; i < 5; i++) {
            const username = `deo${i + 1}`;
            const password = await bcrypt.hash(`deo${i + 1}@123`, 12);
            values.push(`('${username}', '${password}')`);
        }

        const query = `INSERT INTO deo (username, password) VALUES ${values.join(", ")};`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting deos:", err);
                return res.status(500).json({ error: "Failed to insert deos" });
            }

            console.log("deos created successfully");
            connection.query("SELECT * FROM deo", (err2, result2) => {
                if (err2) {
                    console.error("Error fetching deos:", err2);
                    return res.status(500).json({ error: "Failed to fetch deos" });
                }

                return res.status(200).json({ deos: result2 });
            });
        });
    });

    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

function  login_deo(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'username or password is null'});
    }
    try
    {
        connection.query('SELECT password FROM deo where username=?',[username],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                    return res.status(400).json({message:'username is invalid'});

                }
                else
                { 
                    if (await bcrypt.compare(password,results[0].password))
                    {
                    return res.status(200).json({message:"successful-login",username:username});
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


function  register_deo(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'username or password is null'});
    }
    try
    {
        connection.query('SELECT password FROM deo where username=?',[username],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                  let hashed_password=await bcrypt.hash(password,12);
                    
        connection.query('INSERT INTO deo (username,password) VALUES (?,?);',[username,hashed_password],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                return res.status(200).json({message:'sucessful entry'});
            }
        });
                }
                else
                { 

                    return res.status(400).json({message:'username exists try to login'});



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

function  update_deo(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'username or password is null'});
    }
    try
    {
        connection.query('SELECT password FROM deo where username=?',[username],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                    return res.status(400).json({message:'username is invalid'});

                }
                else
                {

                    let hashed_password=await bcrypt.hash(password,12);
                    
                    connection.query('UPDATE deo set password=? WHERE username=?;',[hashed_password,username],async (err,results)=>{
                   
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

function  delete_deo(req,res,next)
{
    let {username}=req.params;
    if (!username )
    {
        return res.status(400).json({message:'username is null'});
    }
    try
    {
        connection.query('SELECT password FROM deo where username=?',[username],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                    return res.status(400).json({message:'username is invalid'});

                }
                else
                {
                    connection.query('DELETE FROM deo  WHERE username=?;',[username],async (err,results)=>{
                   
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

function get_deo(req,res,next)
{
    try {

        connection.query("SELECT username FROM deo", async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching deo:", err2);
                return res.status(500).json({ error: "Failed to fetch deos" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "all deo's list", deos: result2 });
            }
            else
            {
                return res.status(200).json({ message: "no deo's exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}
function get_deo_by_username(req,res,next)
{ const {username}=req.params;
    try {

        connection.query("SELECT username FROM deo where username=?",[username], async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching deo:", err2);
                return res.status(500).json({ error: "Failed to fetch deos" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "deo", deos: result2[0] });
            }
            else
            {
                return res.status(200).json({ message: "this usernmaed deo does not exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}



module.exports = {
    populate_deo,
    login_deo,
    register_deo,
    update_deo,
    delete_deo,
    get_deo,
    get_deo_by_username

}
