const connection = require('../connection')
const bcrypt = require('bcrypt');
const main=require('../mail');
async function populate_doctors(req, res) {
    try {
        connection.query("SELECT * FROM doctor", (err2, result2) => 
            {
            if (err2) {
                console.error("Error fetching doctors:", err2);
                return res.status(500).json({ error: "Failed to fetch doctors" });
            } if (result2.length>0)
{
            return res.status(200).json({ message:"already exist",doctors: result2 });
}
        });
    
        let values = [];
       let  departments=['cardiology','general','dentist','neurology','radiology'];

        for (let i = 0; i < 10; i++) {

            const name = `doctor${i + 1}`;
            
            const password = await bcrypt.hash(`doctor${i + 1}@123`, 12);
            values.push(`(${i+1},'${name}','M.B.B.S,M.D in ${departments[i%5]}',${10+i%2}, '${password}','${departments[i%5]}')`);
        }

        const query = `INSERT INTO doctor (id,name,qualification,experience, password,department) VALUES ${values.join(", ")};`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting doctors:", err);
                return res.status(500).json({ error: "Failed to insert doctors" });
            }

            console.log("doctors created successfully");
            connection.query("SELECT * FROM doctor", (err2, result2) => {
                if (err2) {
                    console.error("Error fetching doctors:", err2);
                    return res.status(500).json({ error: "Failed to fetch doctors" });
                }

                return res.status(200).json({ doctors: result2 });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

function  login_doctor(req,res,next)
{ 
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'name or password is null'});
    }
    try
    { const name=username;
        connection.query('SELECT * FROM doctor where name=?',[name],async (err,results)=>{
       
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
function  register_doctor(req,res,next)
{
    let {username,password,department,qualification,experience}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'name or password is null'});
    }
    try
    {const name=username;
        connection.query('SELECT password FROM doctor where name=?',[name],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                  let hashed_password=await bcrypt.hash(password,12);
              
                    
        connection.query('INSERT INTO doctor (name,qualification,experience,password,department) VALUES (?,?,?,?,?);',[name,qualification,experience,hashed_password,department],async (err,results)=>{
       
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

function  update_doctor(req,res,next)
{
    let {username,password,department,qualification,experience}=req.body;
    if (!username)
    {
        return res.status(400).json({message:'name  is null'});
    }
    try
    { const name=username;
        connection.query('SELECT password FROM doctor where name=?',[name],async (err,results)=>{
       
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
                    
                    if (department) {
                        fieldsToUpdate.push("department = ?");
                        values.push(department);
                    }
                    
                    if (qualification) {
                        fieldsToUpdate.push("qualification = ?");
                        values.push(qualification);
                    }
                    
                    if (experience) {
                        fieldsToUpdate.push("experience = ?");
                        values.push(experience);
                    }
                    
                    if (fieldsToUpdate.length === 0) {
                        return res.status(400).json({ message: "No valid fields provided for update." });
                    }
                    values.push(name);
                    
                    connection.query(`UPDATE doctor SET ${fieldsToUpdate.join(", ")} WHERE name = ?`,values,async (err,results)=>{
                   
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
function  delete_doctor(req,res,next)
{
    let {username}=req.params;
    if (!username )
    {
        return res.status(400).json({message:'name is null'});
    }
    try
    {const name=username;
        connection.query('SELECT password FROM doctor where name=?',[name],async (err,results)=>{
       
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
                    connection.query('DELETE FROM doctor  WHERE name=?;',[name],async (err,results)=>{
                   
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

function get_doctor(req,res,next)
{
    try {

        connection.query("SELECT name,qualification,experience,department,id FROM doctor", async (err2, result2) => {
            if (err2) 
                {
                console.error("Error fetching doctor:", err2);
                return res.status(500).json({ error: "Failed to fetch doctors" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "all doctor's list", doctors: result2 });
            }
            else
            {
                return res.status(200).json({ message: "no doctor's exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}

function get_doctor_by_username(req,res,next)
{ const {username}=req.params;
const name=username;
    try {

        connection.query("SELECT name,qualification,experience,department,id  FROM doctor where name=?",[name], async (err2, result2) => {
            
            if (err2) 
                {
                console.error("Error fetching doctor:", err2);
                return res.status(500).json({ error: "Failed to fetch doctors" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "doctor", doctors: result2[0] });
            }
            else
            {
                return res.status(200).json({ message: "this usernmaed doctor does not exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}



async function get_doctor_prevappointments(req, res, next) {
    const { did } = req.params;
    
    const uid = did;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Convert to 'YYYY-MM-DD HH:mm:ss'
    // console.log(currentDateTime);
    // console.log(req.params);

    try {
        const query = `
            SELECT 
             appointment_date,
      appointment_time,
      appointment_details,
      remarks,
      d.name AS dname,
      p.name AS pname,
      d.qualification,
      d.experience,
      d.department,aid,pid,did  
            FROM doctor d 
            INNER JOIN appointment a ON a.did = d.id  
            INNER JOIN patient p ON a.pid=p.id
            WHERE d.id = ? 
            AND STR_TO_DATE(CONCAT(a.appointment_date, ' ', a.appointment_time), '%Y-%m-%d %H:%i:%s') < ?
        `;

        connection.query(query, [uid, currentDateTime], (err, result) => {
            if (err) {
                console.error("Error fetching appointments:", err);
                return res.status(500).json({ error: "Failed to fetch previous appointments" });
            }

            if (result.length > 0) {
                return res.status(200).json({ message: "Previous appointments fetched", appointments: result });
            } else {
                return res.status(200).json({ message: "No previous appointments found for this doctor" });
            }
        });
    } catch (err) {
        console.error("Internal server error:", err);
        return res.status(500).json({ message: 'Internal server error, try again later' });
    }
}


async function get_doctor_upcappointments(req, res, next) {
    const { did } = req.params;
    
    const uid = did;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:mm:ss'

    try {
        const query = `
            SELECT 
             appointment_date,
      appointment_time,
      appointment_details,
      remarks,
      d.name AS dname,
      p.name AS pname,
      d.qualification,
      d.experience,
      d.department,aid ,pid,did    
            FROM doctor  d
            INNER JOIN appointment  a ON a.did = d.id  
            inner join patient p on a.pid = p.id 
            WHERE d.id = ? 
            AND STR_TO_DATE(CONCAT(a.appointment_date, ' ', a.appointment_time), '%Y-%m-%d %H:%i:%s') > ?
        `;

        connection.query(query, [uid, currentDateTime], (err, result) => {
            if (err) {
                console.error("Error fetching appointments:", err);
                return res.status(500).json({ error: "Failed to fetch upcoming appointments" });
            }
            console.log(result);
            if (result.length > 0) {
                return res.status(200).json({ message: "Upcoming appointments fetched", appointments: result });
            } else {
                return res.status(200).json({ message: "No upcoming appointments found for this doctor" });
            }
        });
    } catch (err) {
        console.error("Internal server error:", err);
        return res.status(500).json({ message: 'Internal server error, try again later' });
    }
}





function get_doctor_by_department(req,res,next)
{ const {department}=req.params;

    try {

        connection.query("SELECT name,qualification,experience,department FROM doctor where department=?",[department], async (err2, result2) => {
            
            if (err2) 
                {
                console.error("Error fetching doctor:", err2);
                return res.status(500).json({ error: "Failed to fetch doctors" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "doctor", doctors: result2 });
            }
            else
            {
                return res.status(200).json({ message: "this dept  doctor does not exist" });
            }
        });
    }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({message:'internal server error,try next time'})
        }
}

function get_depts(req,res,next)
{ 

    try {

        connection.query("SELECT DISTINCT department FROM doctor ", async (err2, result2) => {
            
            if (err2) 
                {
                console.error("Error fetching doctor:", err2);
                return res.status(500).json({ error: "Failed to fetch doctors" });
            } 
            if (result2.length > 0) {
                return res.status(200).json({ message: "doctor", doctors: result2 });
            }
            else
            {
                return res.status(200).json({ message: "no dept exists" });
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
    populate_doctors,
    login_doctor,
    register_doctor,
    update_doctor,
    delete_doctor,
    get_doctor,
    get_doctor_by_username,
    get_doctor_by_department,
    get_doctor_prevappointments,
    get_doctor_upcappointments,
    get_depts,
    
}
