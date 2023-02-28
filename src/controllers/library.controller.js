import {getConnection} from "./../database/database";

const getBooks = async (req,res) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM LIBROS");
        res.status(200).json(result);
    } catch(error){
        res.status(500).send(error.message);
    }
};

const getBook = async (req,res) =>{
	try{
		console.log(req.params);
			const {id} = req.params;
			const connection = await getConnection();
			const result = await connection.query("SELECT * FROM LIBROS WHERE id = ?", parseInt(id));
			if(result.length === 0){
				return res.status(400).json("Book isn't registered");
			}
			res.status(200).json(result);
	} catch(error){
			res.status(500).send(error.message);
	}
};

const addBook = async (req,res) =>{
    try{
        const { nombre, autor, anio_edicion} = req.body;
        if (nombre == undefined || autor == undefined || anio_edicion == undefined){
          return res.status(400).send("Pleas, fill all the information")
        } else if (nombre == "" || autor == "" || anio_edicion == ""){
					return res.status(400).send("Pleas, fill all the information")
				}
        const book = {
            nombre,
            autor,
            anio_edicion
        }
        const connection = await getConnection();
        await connection.query("INSERT INTO libros SET ?", book);
       // const result = await connection.query("SELECT * FROM LIBROS");
        res.status(200).json("Book added");
    } catch(error){
        res.status(500).send(error.message);
    }
};

const deleteBook = async (req,res) =>{
	try{
			const {id} = req.params;
			const connection = await getConnection();
			const book = await connection.query("SELECT * FROM LIBROS WHERE id = ?", parseInt(id));
			if(book.length === 0){
				return res.status(400).json("Book isn't registered");
			}
			await connection.query("DELETE FROM libros where id = ?", id)
			res.status(200).json("Book deleted");
	} catch(error){
			res.status(500).send(error.message);
	}
};

const updateBook = async (req,res) =>{
	try{
		const {id} = req.params;
		const { nombre, autor, anio_edicion} = req.body;
		if ( id == undefined || nombre == undefined || autor == undefined || anio_edicion == undefined){
			return res.status(400).send("Pleas, fill all the information")
		} else if (id == "" || nombre == "" || autor == "" || anio_edicion == ""){
			return res.status(400).send("Pleas, fill all the information");
		}
		const updatebook = {
				nombre,
				autor,
				anio_edicion
		}
			const connection = await getConnection();
			const book = await connection.query("SELECT * FROM LIBROS WHERE id = ?", parseInt(id));
			if(book.length === 0){
				return res.status(400).json("Book isn't registered");
			}
			await connection.query("UPDATE libros SET ? WHERE id = ?", [updatebook, id])
			res.status(200).json("Book updated");
	} catch(error){
			res.status(500).send(error.message);
	}
};

export const methods = {
    getBooks,
		getBook,
    addBook,
		deleteBook,
		updateBook
}