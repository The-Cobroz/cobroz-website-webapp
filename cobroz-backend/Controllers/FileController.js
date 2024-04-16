import pool from "../Config/db.config.js";

export function addFileDetails(fileid, by, as, path){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO upload(upload_id, upload_by, uploaded_as, file_add) VALUES(?, ?, ?, ?)", [fileid, by, as, path], (err, results) => {
            if(err){
                console.log("Error in file controller function", err);
                reject(err);
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                reject("Problem");
            }
        });
    });
}

export function checkFileId(fileId){
    return new Promise((resolve, reject) => {
        pool.query("SELECT file_add FROM upload WHERE upload_id = ?", [fileId], (err, results) => {
            if(err){
                console.log("Error in checking file id", err);
                reject("error");
            }
            else{
                if(results.length === 0){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            }
        });
    });
}

