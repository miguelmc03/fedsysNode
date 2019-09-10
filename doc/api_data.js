define({ "api": [
  {
    "type": "delete",
    "url": "/articulo",
    "title": "Eliminar articulo",
    "name": "DeleteArticulo",
    "group": "Articulo",
    "version": "0.0.0",
    "filename": "controllers/articulos.js",
    "groupTitle": "Articulo"
  },
  {
    "type": "get",
    "url": "/articulo",
    "title": "Obtener articulo por id",
    "name": "GetArticulo",
    "group": "Articulo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID del articulo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articulo",
            "description": "<p>Informacion del articulo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articulo.completa",
            "description": "<p>Articulo completo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articulo.vistaPrevia",
            "description": "<p>Informacion para vista previa del articulo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articulo.vistaPrevia.titulo",
            "description": "<p>Titulo del articulo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articulo.vistaPrevia.contenido",
            "description": "<p>Resumen para vista previa del articulo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articulo.vistaPrevia.imgUrl",
            "description": "<p>Url de la imagen miniatura del articulo.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/articulos.js",
    "groupTitle": "Articulo"
  },
  {
    "type": "post",
    "url": "/articulo",
    "title": "Crear articulo",
    "name": "PostArticulo",
    "group": "Articulo",
    "version": "0.0.0",
    "filename": "controllers/articulos.js",
    "groupTitle": "Articulo"
  },
  {
    "type": "put",
    "url": "/articulo",
    "title": "Editar articulo",
    "name": "PutArticulo",
    "group": "Articulo",
    "version": "0.0.0",
    "filename": "controllers/articulos.js",
    "groupTitle": "Articulo"
  },
  {
    "type": "get",
    "url": "/articulos",
    "title": "Obtener lista de articulos",
    "name": "GetArticulos",
    "group": "Articulos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "articulos",
            "description": "<p>Lista de articulos.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/articulos.js",
    "groupTitle": "Articulos"
  },
  {
    "type": "post",
    "url": "/uploadImg",
    "title": "Subir imagen",
    "name": "PostUploadImg",
    "group": "Image",
    "version": "0.0.0",
    "filename": "controllers/articulos.js",
    "groupTitle": "Image"
  }
] });
