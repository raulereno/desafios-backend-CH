# Practica Integradora




## Instalación

Sobre la carpeta del proyecto ejecutar:

```bash
  npm install 
```
## Ejecución

Una vez instaladas las dependencias ejecutar:

```bash
  npm start
```    

## Variables de entorno

### Conexión a la base de datos

Para conectar con su base de datos debe crear un archivo .env y en la variable STRING_CONNECTION agregarle el string que genera atlas para la conexión.
Link:https://www.mongodb.com/cloud/atlas/register
### Puerto
Por defecto el puerto del servidor es el 8080, si se necesita se puede indicar en el archivo .env antes creado una variable PORT para poner el puerto que desee.

## Productos

### Llenar base de datos

Para llenar la base de datos utilice el siguiente endpoint y los siguientes productos para iniciar el proyecto con algunos productos cargados


| Método HTTP | URL                                  | Descripción                                         |
| ----------- | ------------------------------------ | --------------------------------------------------- |
| POST        | `/products/createMany`                      | Crea muchos productos                            |

### Productos de prueba

```json
[
    {
      "title": "Peine",
      "description": "Peine para pelajes largos",
      "price": 800,
      "image": "/uploads/cepillo.jpg"
    },
    {
      "title": "Cepillo de dientes",
      "description":
        "Cepillo de dientes para una buena salud en los dientes de tu mascota",
      "price": 500.99,
      "image": "/uploads/cepillo_dientes.jpg"
    },
    {
      "title": "Champu",
      "description": "Champu de uso frecuente",
      "price": 600,
      "image": "/uploads/champu.jpg"
    },
    {
      "title": "Collar con cascabel",
      "description":
        "Ideal para saber donde se encuentra tu mascota",
      "price":700,
      "image": "/uploads/collar_cascabel.jpg"
    },
    {
      "title": "Collares de cuero",
      "description":
        "Duraderos collares de cuero para tu mascota",
      "price": 1500,
      "image": "/uploads/collares_cuero.jpg"
    },
    {
      "title": "Colonia Pulgicida",
      "description":
        "Vienen de distintos olores y son ideales para que tu mascota siempre huela bien y este protegida de las pulgas.",
      "price": 1000,
      "image": "/uploads/colonia_pulgicida.jpg"
    },
    {
      "title": "Comederos dobles de plastico",
      "description": "Para el agua y la comida de tu mascota",
      "price": 1100,
      "image": "/uploads/comedero.jpg"
    },
    {
      "title": "Corta Uñas",
      "description":
        "Para mantener las uñas cortas",
      "price": 2000,
      "image": "/uploads/corta_uñas.jpg"
    },
    {
      "title": "Varita masticable",
      "description":
        "Palito de carnaza para masticar.",
      "price": 300.99,
      "image": "/uploads/masticable.jpg"
    },
    {
      "title": "Sobrecitos de Pedigree",
      "description":
        "Sobrecitos de distintos sabores para perros de raza pequeña.",
      "price": 600.99,
      "image": "/uploads/sobrecitos_pedigree.jpg"
    }
  ]
```