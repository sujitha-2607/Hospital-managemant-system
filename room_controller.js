const connection = require('../connection')
const bcrypt = require('bcrypt');
async function populate_room(req, res) {
    try {

        connection.query("SELECT * FROM room", (err2, result2) => {
            if (err2) {
                console.log("Error fetching rooms:", err2);
                return res.status(500).json({ error: "Failed to fetch rooms" });
            } if (result2.length > 0) {
                return res.status(200).json({ message: "already exist", rooms: result2 });
            }
        });

        let values = [];
        for (let i = 0; i < 10; i++) {
            values.push(`(${i + 1}, ${(i % 2) ? i : 'NULL'}, 'the sophisticated room with ventilator and oxygen support', NOW(), NULL)`);
        }

        const query = `INSERT INTO room (id, pid, details, start_time, end_time) VALUES ${values.join(", ")};`;
        console.log(query);;

        connection.query(query, (err, result) => {
            if (err) {
                console.log("Error inserting rooms:", err);
                return res.status(500).json({ error: "Failed to insert rooms" });
            }

            console.log("rooms created successfully");
            connection.query("SELECT * FROM room", (err2, result2) => {
                if (err2) {
                    console.log("Error fetching rooms:", err2);
                    return res.status(500).json({ error: "Failed to fetch rooms" });
                }

                return res.status(200).json({ rooms: result2 });
            });
        });

    } catch (error) {
        console.log("Unexpected error:", error);
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
async function get_room(req, res) {
    try {

        connection.query("SELECT * FROM room WHERE  end_time IS  NOT NULL OR (pid IS NULL AND end_time IS NULL)", (err2, result2) => {
            if (err2) 
            {
                console.log("Error fetching rooms:", err2);
                return res.status(500).json({ error: "Failed to fetch rooms" });
            }
            else 
            {
                if (result2.length > 0) 
                    {
                     return res.status(200).json({ message: "available rooms", rooms: result2 }); 
                    }
                else
                    {
                        return res.status(400).json({ message: "no rooms avialable" })
                    }
            }
            });
        }


     catch (error) {
        console.log("Unexpected error:", error);
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
async function get_filled_room(req, res) {
    try {

        connection.query("SELECT *  FROM room WHERE  end_time IS   NULL AND pid IS NOT NULL ", (err2, result2) => {
            if (err2) 
            {
                console.log("Error fetching rooms:", err2);
                return res.status(500).json({ error: "Failed to fetch rooms" });
            }
            else 
            {
                if (result2.length > 0) 
                    {
                     return res.status(200).json({ message: "available rooms", rooms: result2 }); 
                    }
                else
                    {
                        return res.status(400).json({ message: "no rooms avialable" })
                    }
            }
            });
        }


     catch (error) {
        console.log("Unexpected error:", error);
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

async function get_room_by_pid(req, res) {
    const {pid}= req.params;
    try {

        connection.query("SELECT id FROM room WHERE  pid=? ",[pid] ,(err2, result2) => {
            if (err2) 
            {
                console.log("Error fetching rooms:", err2);
                return res.status(500).json({ error: "Failed to fetch rooms" });
            }
            else 
            {
                if (result2.length > 0) 
                    {
                     return res.status(200).json({ message: `the ${pid} is in room ${result2[0].id}` }); 
                    }
                else
                    {
                        return res.status(400).json({ message: "this pid is not alloted to any room" })
                    }
            }
            });
        }


     catch (error) {
        console.log("Unexpected error:", error);
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}





async function discharge_room(req, res) {
    const {id} = req.params;
    try {
        

        connection.query("UPDATE  room set end_time=NOW() WHERE  id=?",[id] ,(err2, result2) => {
            if (err2) 
            {
                console.log("Error fetching rooms:", err2);
                return res.status(400).json({ error: err2,message:err2 });
            }
            else 
            {
               
                        return res.status(200).json({ message: "sucessful discharge" })
                    
            }
            });
        }


     catch (error) {
        console.log("Unexpected error:", error);
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
async function admit_room(req, res) {
    const {id,pid} = req.body;
    if (!id || !pid)
    {
        return res.status(500).json({ error: "provide both room id and patient id" });
    }
    

    try {
        connection.query("select pid from   room WHERE  pid=? AND end_time IS NULL ",[pid] ,(err2, result2) => {
            if (err2) 
            {
                console.log("Error fetching data:", err2);
                return res.status(500).json({ error: "error fetching data" });
            }
            else 
            {
                if (result2.length>0)
                       { return res.status(400).json({ message: "cannot admit one patient in two room" })}
                else
                {
                    connection.query(`UPDATE  room set start_time=NOW(),pid=${pid},end_time=NULL WHERE  id=? AND end_time is NOT NULL`,[id] ,(err2, result2) => {
                        if (err2) 
                        {
                            console.log("Error fetching rooms:", err2);
                            return res.status(500).json({ error: "invalid pid/room id check once " });
                        }
                        else 
                        {
                           
                                    return res.status(200).json({ message: "sucessful admit" })
                                
                        }
                        });
                }
                    
            }
            });
        

       
        }


     catch (error) {
        console.log("Unexpected error:", error);
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
module.exports = {
    populate_room,
    get_room,
    discharge_room,
    admit_room,
    get_room_by_pid,
    get_filled_room

}