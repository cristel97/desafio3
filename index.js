const fs = require('fs')

class Contenedor {
    constructor (file) {
        this.file = file
    }

    async save(producto){
        try {
            let content = await fs.promises.readFile(this.file)
            let contObj = JSON.parse(content)
            let newId;
            newId = contObj.length > 0 ? newId = contObj.length + 1 : newId = 1
            producto.id = newId
            contObj.push(producto)
            await fs.promises.writeFile(this.file, JSON.stringify(contObj))
        } catch (error) {
            console.log(error)
        }
    }

    async getByID(id){
        try {
            let contObj = await this.getAll()
            let resultado = contObj.find(obj => obj.id == id)
            console.log(resultado)
        } catch(error) {
            console.log(error)
        }
        
    }

    async getAll(){
        try {
            let content = await fs.promises.readFile(this.file)
            let contObj = JSON.parse(content)
            return contObj
        } catch (error) {
            return(error)
        }
    }

    async deleteByID(id){
        try {
            let contObj = await this.getAll()
            let nuevoObj = contObj.filter(obj => obj.id !== id)
            await fs.promises.writeFile(this.file, JSON.stringify(nuevoObj))
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.file, "[]")
        } catch(error){
            console.log(error)
        }
        
    }

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }
}


module.exports = Contenedor;