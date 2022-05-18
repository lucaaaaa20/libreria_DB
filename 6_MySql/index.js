const express = require('express')
const mysql = require('mysql2')
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const port = 3000
const host = "localhost"

const database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "localhost",
    database: "libreria",
    insecureAuth: true
})

app.listen(port, host, () => {
    console.log(`Sono connesso all'indirizzo http://${host}:${port}`)
})

//--------------------- VISUALIZZA LISTA LIBRI ----------------------------------
app.get("/libreria/lista", (req, res) => {
    database.query("SELECT * FROM lista_libri", (errore, risultato, campi) => {
        if (!errore)
            res.json(risultato);
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

//--------------------- VISUALIZZA LIBRO TRAMITE ISBN ---------------------------
app.get("/libreria/libro/:isbn", (req, res) => {
    database.query(`SELECT * FROM lista_libri WHERE isbn = ${req.params.isbn} `, (errore, risultato, campi) => {
        if (!errore)
            res.json(risultato);
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

//------------------------------ AGGIUNTA LIBRO ---------------------------------
app.post("/libreria/addLibro", (req, res) => {
    database.query(`INSERT INTO lista_libri (isbn, autore, titolo) VALUES ("${req.body.isbn}", "${req.body.autore}", "${req.body.titolo}" )`, (errore, risultato, campi) => {
        if (!errore)
            res.json("libro aggiunto con successo");
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })

})

//--------------------- MODIFICA LIBRO TRAMITE ISBN -----------------------------
app.put("/libreria/modifica/:isbn", (req, res) => {
    database.query(`UPDATE lista_libri SET autore = "${req.body.autore}", titolo = "${req.body.titolo}" WHERE isbn = ${req.params.isbn} `, (errore, risultato, campi) => {
        if (!errore)
            res.json("success");
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

//--------------------- ELIMINA LIBRO TRAMITE ISBN -----------------------------
app.delete("/libreria/elimina/:isbn", (req, res) => {
    database.query(`DELETE FROM lista_libri WHERE isbn = ${req.params.isbn}`, (errore, risultato, campi) => {
        if (!errore)
            res.json("success");
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})















