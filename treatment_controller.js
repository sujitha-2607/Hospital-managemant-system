const connection = require('../connection')
const bcrypt = require('bcrypt');
async function populate_treatment(req, res) {
    try {

        connection.query("SELECT * FROM treatment", async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching treatment:", err2);
                return res.status(500).json({ error: "Failed to fetch treatments" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "already exist", treatments: result2 });
            }
      

        let values = [];

        for (let i = 0; i < 5; i++) {
            const aid = i + 1;
            const details = "this is details of treatment";
            values.push(`('${aid}', '${details}')`);
        }

        const query = `INSERT INTO treatment (aid, details) VALUES ${values.join(", ")};`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting treatments:", err);
                return res.status(500).json({ error: "Failed to insert treatments" });
            }

            console.log("treatments created successfully");
            connection.query("SELECT * FROM treatment", (err2, result2) => {
                if (err2) {
                    console.error("Error fetching treatments:", err2);
                    return res.status(500).json({ error: "Failed to fetch treatments" });
                }

                return res.status(200).json({ treatments: result2 });
            });
        });
    });

    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
function  update_treatment(req,res,next)
{
    let {id,details}=req.body;
    if (!id || !details )
    {
        return res.status(400).json({message:'id or details is null'});
    }
    try
    {
        connection.query('SELECT details FROM treatment where id=?',[id],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.details});

            }
            else
            {
                if (results.length==0)
                {
                    return res.status(400).json({message:'aid is invalid'});

                }
                else
                {

                   
                    
                    connection.query('UPDATE treatment set details=? WHERE id=?;',[details,id],async (err,results)=>{
                   
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

function  create_treatment(req,res,next)
{
    let {aid,details}=req.body;
    if (!aid || !details )
    {
        return res.status(400).json({message:'aid or details is null'});
    }
    try
    {
       
                    connection.query('INSERT INTO treatment (aid,details) values (?,?);',[aid,details],async (err,results)=>{
                   
                        if (err )
                        { console.log(err,results);
                            return res.status(400).json({message:'aid does not exist sorry cannot create details'});
            
                        }
                        else
                        {
                            return res.status(200).json({message:'sucessful insertion of treatment'});
                        }
                    });


                }
            
        
    catch(err)
    {
        console.log("Unexpected error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
    
}

function get_treatment(req,res,next)
{ const {aid}=req.params;
    if (!aid)
    {
        return res.status(500).json({ error: "aid is null please provide appointment id" });
    }
    try {

        connection.query("SELECT * FROM treatment WHERE aid=? ",[aid], async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching treatment:", err2);
                return res.status(500).json({ error: "Failed to fetch treatments" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "all treatment's list", tests: result2 });
            }
            else
            {
                return res.status(200).json({ message: "no treatment's exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}

function get_treatment_pid(req,res,next)
{ const {pid}=req.params;
    if (!pid)
    {
        return res.status(500).json({ error: "pid is null please provide appointment id" });
    }
    try {

        connection.query("SELECT * FROM treatment t inner join appointment ap on t.aid=ap.aid WHERE ap.pid=? ",[pid], async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching treatment:", err2);
                return res.status(500).json({ error: "Failed to fetch treatments" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "all treatment's list", tests: result2 });
            }
            else
            {
                return res.status(200).json({ message: "no treatment's exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}

function delete_treatment(req,res,next)
{ const {id}=req.params;
    if (!id)
    {
        return res.status(500).json({ error: "id is null please provide sppointment id" });
    }
    try {

        connection.query("SELECT * FROM treatment WHERE id=? ",[id], async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching treatment:", err2);
                return res.status(500).json({ error: "Failed to fetch treatments" });
            } 
            if (result2.length > 0) {
               
                connection.query('DELETE from treatment where id=?',[id],async (err,results)=>{
                   
                    if (err )
                    { console.log(err,results);
                        return res.status(400).json({message:'sorry we cannot retrive data,try some other time'});
        
                    }
                    else
                    {
                        return res.status(200).json({message:'sucessful deletion '});
                    }
                });
            }
            else
            {
                return res.status(200).json({ message: "no treatment's exist cannot delete" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}

module.exports={
    populate_treatment,
    get_treatment,
    update_treatment,
    create_treatment,
    delete_treatment,
    get_treatment_pid,
}