# Primera preentrega    




## Installation

Sobre la carpeta del proyecto ejecutar:

```bash
  npm install 
```
## Ejecución

Una vez instaladas las dependencias ejecutar:

```bash
  npm start
```    
## Referencia API

### Productos
#### Obtener todos los productos

```http
  GET /products
  GET /products?limit=${number}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `number` | **Opcional**. |

#### Obtener un producto

```http
  GET /products/:pid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pid`      | `number` | **Requerido**. ID del artículo a buscar |

#### Crear un producto
```http
  POST /products
```

Esta request debe tener un body, ejemplo:

*Aquellos campos con asteriscos son requeridos:
```json
{
	*"title":"Elder Wand",
	*"description":"The Elder Wand was one of three magical objects that made up the fabled Deathly Hallows, along with the Resurrection Stone and the Cloak of Invisibility.",
	*"code":"r21a",
	*"price":2000,
	*"stock":1,
	*"category":"Magic Wands",
	 "thumbnails":[]
}
```

#### Crear un producto
```http
  PUT /products/:pid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pid`      | `number` | **Requerido**. ID del artículo a actualizar |

Esta request debe tener un body, ejemplo:
```json
{
	"title":"La copa de los tre mago",
	"thumbnails":["https://static.wikia.nocookie.net/harrypotter/images/5/59/Elder_Wand.png/revision/latest/scale-to-width-down/350?cb=20161128051519"]
}
```

#### Eliminar un producto

```http
  DELETE /products/:pid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pid`      | `number` | **Requerido**. ID del artículo a eliminar |

### Carritos

#### Crear un carrito
```http
  POST /carts
```

Esta request opcionalmente tiene un body, ejemplo:

```json
{
	"products":[
		{
                "pid": 4,
                "quantity": 10
            }
	]
}
```
**Sino se crea un carrito nuevo sin productos iniciales.**

#### Obtener un carrito

```http
  GET /carts/:cid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `number` | **Requerido**. ID del carrito a buscar |


#### Agregar un producto al carrito

```http
  POST /products/:cid/product/:pid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `number` | **Requerido**. ID del carrito a buscar |
| `pid`      | `number` | **Requerido**. ID del producto a agregar |

Opcionalmente se le puede pasar la cantidad de productos:

```json
{
	"quantity":1
}
```

**El articulo solo puede aumentar su cantidad en 1 si ya se encuentra en el carrito**
