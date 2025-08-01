import express from 'express';


const app = express()


app.use(express.json())

const products = [
    {
    "id": 1,
    "nombre": "Camiseta",
    "precio": 200.00,
    "descripcion": "Camiseta de algodón suave",
    "categoria": "Ropa",
    "imagen": "camiseta.jpg"
    },
    {
        "id": 2,
        "nombre": "Zapatillas",
        "precio": 500.00,
        "descripcion": "Zapatillas deportivas cómodas",
        "categoria": "Calzado",
        "imagen": "zapatillas.jpg"
    },
    {
        "id": 3,
        "nombre": "Reloj",
        "precio": 750.00,
        "descripcion": "Reloj elegante con correa de cuero",
        "categoria": "Accesorios",
        "imagen": "reloj.jpg"
    }
]

const getAllProducts = () => {
    return products
}

const getProductById = (product_id) => {
    
    return products.find((product) => {
        return Number(product.id) === Number(product_id)
    })
}

app.get('/products', (req, resp) => {
    const products = getAllProducts()
    const response_to_send = {
        message: "productos obtenidos OK!",
        data: {
            products: products
        }
    }
    return resp.json(response_to_send)
})


app.get('/products/:product_id', (req, resp) => {
    const product_id = req.params.product_id

    const product_found = getProductById(product_id)

    if(!product_found){
        return resp.json({
            message: 'Producto NO encontrado!'
        })
    }
    return resp.json({
        message: 'Producto encontrado',
        data: {
            product: product_found
        }
    })
})

app.post('/products', (req, resp) => {
    const product_nombre = req.body.nombre
    const product_precio = req.body.precio
    const product_descripcion = req.body.descripcion
    const product_categoria = req.body.categoria
    const product_imagen = req.body.imagen

    const new_product = {
        id: products.length + 1,
        nombre: product_nombre,
        precio: product_precio,
        descripcion: product_descripcion,
        categoria: product_categoria,
        imagen: product_imagen
    }

    products.push(new_product)

    resp.json({
        message:'Producto creado OK!',
        data: {
            product: getAllProducts()
        }
    })
})



app.listen(8080, () => {
    console.log('SERVER WATCH - PORT: ' + 8080)
})