const express = require('express')
const multer = require('multer')
const app = express()

app.use(express.static('.'))

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload')
    },
    filename: function(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer ({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end('Não foi possivel concluir')
        }
        res.end('Upload concluído.')
    })
})


app.get('/index.html', (req, res) => res.send())
app.listen(8080, console.log('Executando o servidor...'))