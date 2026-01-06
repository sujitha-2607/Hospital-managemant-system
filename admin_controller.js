const connection = require('../connection')
const bcrypt = require('bcrypt');
function create_table_admin(req, res, next) {
    connection.query("SHOW TABLES LIKE ?", ['admin'], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ message: 'internal server error' })
        } else if (results.length > 0) {
            console.log(` Table '${tableName}' exists.`);
            return res.status(200).json({ message: 'table exists' })
        } else {
            connection.query(`CREATE TABLE admin(  
                  username varchar(50) UNIQUE PRIMARY KEY ,
                  password varchar(100) );`, (err, results) => {
                if (err) {
                    console.error("Query error:", err);
                    return res.status(500).json({ message: 'internal server error' })
                } else {
                    console.log(` Table created exists.`);
                    return res.status(200).json({ message: 'table created successfully' })

                }
            });

        }
    });

}

function create_table_fdo(req, res, next) {
    connection.query("SHOW TABLES LIKE ?", ['fdo'], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ message: 'internal server error' })
        } else if (results.length > 0) {
            console.log(` Table fdo exists.`);
            return res.status(200).json({ message: 'table exists' })
        } else {
            connection.query(`CREATE TABLE fdo(  
                  username varchar(50) UNIQUE PRIMARY KEY ,
                  password varchar(100) );`, (err, results) => {
                if (err) {
                    console.error("Query error:", err);
                    return res.status(500).json({ message: 'internal server error' })
                } else {
                    console.log(` Table created exists.`);
                    return res.status(200).json({ message: 'table created successfully' })

                }
            });

        }
    });
}

function create_table_deo(req, res, next) {
    connection.query("SHOW TABLES LIKE ?", ['deo'], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ message: 'internal server error' })
        } else if (results.length > 0) {
            console.log(` Table 'deo' exists.`);
            return res.status(200).json({ message: 'table exists' })
        } else {
            connection.query(`CREATE TABLE deo(  
                  username varchar(50) UNIQUE PRIMARY KEY ,
                  password varchar(100) );`, (err, results) => {
                if (err) {
                    console.error("Query error:", err);
                    return res.status(500).json({ message: 'internal server error' })
                } else {
                    console.log(` Table created exists.`);
                    return res.status(200).json({ message: 'table created successfully' })

                }
            });

        }
    });
}











function create_table_doctor(req, res, next) {
    const tableName = "doctor"; // Define the table name

    connection.query("SHOW TABLES LIKE ?", [tableName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            console.log(`Table '${tableName}' already exists.`);
            return res.status(200).json({ message: "Table already exists" });
        } else {
            const createTableQuery = `
            CREATE TABLE ${tableName} (
              id INT PRIMARY KEY AUTO_INCREMENT,
              name VARCHAR(50),
              qualification VARCHAR(40),
              experience INT,
              password VARCHAR(100),
              department ENUM('cardiology','general','dentist','neurology','radiology')
            );
          `;

            connection.query(createTableQuery, (err2, result) => {
                if (err2) {
                    console.error("Error creating table:", err2);
                    return res.status(500).json({ error: "Failed to create table" });
                }

                console.log(` Table '${tableName}' created successfully.`);
                return res.status(200).json({ message: "Table created successfully" });
            });
        }
    });
}




function create_table_patient(req, res, next) {
    const tableName = "patient"; // Define the table name

    connection.query("SHOW TABLES LIKE ?", [tableName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            console.log(`Table '${tableName}' already exists.`);
            return res.status(200).json({ message: "Table already exists" });
        } else {
            const createTableQuery = `
            CREATE TABLE ${tableName} (
              id INT PRIMARY KEY AUTO_INCREMENT,
              name VARCHAR(50),
              password varchar(100),
              contact varchar(10)
            );
          `;

            connection.query(createTableQuery, (err2, result) => {
                if (err2) {
                    console.error("Error creating table:", err2);
                    return res.status(500).json({ error: "Failed to create table" });
                }

                console.log(` Table '${tableName}' created successfully.`);
                return res.status(200).json({ message: "Table created successfully" });
            });
        }
    });
}


function create_table_appointments(req, res, next) {
    const tableName = "appointment";

    connection.query("SHOW TABLES LIKE ?", [tableName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            console.log(`Table '${tableName}' already exists.`);
            return res.status(200).json({ message: "Table already exists" });
        } else {
            const createTableQuery = `
            CREATE TABLE ${tableName} (
              aid INT PRIMARY KEY AUTO_INCREMENT,
              pid INT,
              did INT,
              details varchar(150),
              remarks varchar(150),
              appointment_time ENUM(
        '10:00:00',
        '11:00:00',
        '12:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00'
    ),
              appointment_date DATE,
              FOREIGN KEY (pid) REFERENCES patient(id),
              FOREIGN KEY (did) REFERENCES doctor(id)
            );
          `;

            connection.query(createTableQuery, (err2, result) => {
                if (err2) {
                    console.error("Error creating table:", err2);
                    return res.status(500).json({ error: "Failed to create table" });
                }

                console.log(`Table '${tableName}' created successfully.`);
                return res.status(200).json({ message: "Table created successfully" });
            });
        }
    });
}

function create_table_treatment(req, res, next) {
    const tableName = "treatment";

    connection.query("SHOW TABLES LIKE ?", [tableName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            console.log(`Table '${tableName}' already exists.`);
            return res.status(200).json({ message: "Table already exists" });
        } else {
            const createTableQuery = `
            CREATE TABLE ${tableName} (
            id INT PRIMARY KEY AUTO_INCREMENT,
              aid INT,
              details varchar(100),
              FOREIGN KEY (aid) REFERENCES appointment(aid)
            );
          `;

            connection.query(createTableQuery, (err2, result) => {
                if (err2) {
                    console.error("Error creating table:", err2);
                    return res.status(500).json({ error: "Failed to create table" });
                }

                console.log(`Table '${tableName}' created successfully.`);
                return res.status(200).json({ message: "Table created successfully" });
            });
        }
    });
}

function create_table_test(req, res, next) {
    const tableName = "test";

    connection.query("SHOW TABLES LIKE ?", [tableName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            console.log(`Table '${tableName}' already exists.`);
            return res.status(200).json({ message: "Table already exists" });
        } else {
            const createTableQuery = `
            CREATE TABLE ${tableName} (
            id INT PRIMARY KEY AUTO_INCREMENT,
              aid INT,
              details varchar(100),
              FOREIGN KEY (aid) REFERENCES appointment(aid)
            )
          `;

            connection.query(createTableQuery, (err2, result) => {
                if (err2) {
                    console.error("Error creating table:", err2);
                    return res.status(500).json({ error: "Failed to create table" });
                }

                console.log(`Table '${tableName}' created successfully.`);
                return res.status(200).json({ message: "Table created successfully" });
            });
        }
    });
}

function create_table_room(req, res, next) {
    const tableName = "room";

    connection.query("SHOW TABLES LIKE ?", [tableName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            console.log(`Table '${tableName}' already exists.`);
            return res.status(200).json({ message: "Table already exists" });
        } else {
            const createTableQuery = `
            CREATE TABLE ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pid int,
                details varchar(100),
                start_time DATETIME,
                end_time DATETIME,
                FOREIGN KEY (pid) REFERENCES patient(id)
            );
            `;

            connection.query(createTableQuery, (err2, result) => {
                if (err2) {
                    console.error("Error creating table:", err2);
                    return res.status(500).json({ error: "Failed to create table" });
                }

                console.log(`Table '${tableName}' created successfully.`);
                return res.status(200).json({ message: "Table created successfully" });
            });
        }
    });
}


async function populate_admins(req, res) {
    try {

        connection.query("SELECT * FROM admin", (err2, result2) => 
            {
            if (err2) {
                console.error("Error fetching admins:", err2);
                return res.status(500).json({ error: "Failed to fetch admins" });
            } if (result2.length>0)
{
            return res.status(200).json({ message:"already exist",admins: result2 });
}
        });
    
        let values = [];

        for (let i = 0; i < 10; i++) {
            const username = `admin${i + 1}`;
            const password = await bcrypt.hash(`Admin${i + 1}@123`, 12);
            values.push(`('${username}', '${password}')`);
        }

        const query = `INSERT INTO admin (username, password) VALUES ${values.join(", ")};`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting admins:", err);
                return res.status(500).json({ error: "Failed to insert admins" });
            }

            console.log("Admins created successfully");
            connection.query("SELECT * FROM admin", (err2, result2) => {
                if (err2) {
                    console.error("Error fetching admins:", err2);
                    return res.status(500).json({ error: "Failed to fetch admins" });
                }

                return res.status(200).json({ admins: result2 });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

function  login_admin(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'username or password is null'});
    }
    try
    {
        connection.query('SELECT password FROM admin where username=?',[username],async (err,results)=>{
       
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


function  register_admin(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'username or password is null'});
    }
    try
    {
        connection.query('SELECT password FROM admin where username=?',[username],async (err,results)=>{
       
            if (err )
            { console.log(err,results);
                return res.status(400).json({message:'error in retriving data,try some other time', error:results.password});

            }
            else
            {
                if (results.length==0)
                {
                  let hashed_password=await bcrypt.hash(password,12);
                    
        connection.query('INSERT INTO ADMIN (username,password) VALUES (?,?);',[username,hashed_password],async (err,results)=>{
       
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

function  update_admin(req,res,next)
{
    let {username,password}=req.body;
    if (!username || !password)
    {
        return res.status(400).json({message:'username or password is null'});
    }
    try
    {
        connection.query('SELECT password FROM admin where username=?',[username],async (err,results)=>{
       
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
                    
                    connection.query('UPDATE admin set password=? WHERE username=?;',[hashed_password,username],async (err,results)=>{
                   
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

function  delete_admin(req,res,next)
{
    let {username}=req.params;
    if (!username )
    {
        return res.status(400).json({message:'username is null'});
    }
    try
    {
        connection.query('SELECT password FROM admin where username=?',[username],async (err,results)=>{
       
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
                    connection.query('DELETE FROM admin  WHERE username=?;',[username],async (err,results)=>{
                   
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








module.exports = {
    create_table_admin,
    create_table_appointments,
    create_table_doctor,
    create_table_patient,
    create_table_treatment,
    create_table_test,
    create_table_deo,
    create_table_fdo,
    create_table_room,
    populate_admins,
    login_admin,
    register_admin,
    update_admin,
    delete_admin
};