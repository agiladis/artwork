# artwork

This app is already on air --> `artwork-production.up.railway.app`

[![Visit](https://railway.app/button.svg)](https://artwork-production.up.railway.app/)

## API endpoint

to create new gallery, use form-data type on postman. with 2 keys:

- _images : file data type_
- _data : json data type, with content-type application/json_

```
<!-- create new gallery -->
/api/v1/upload
```

to get all gallery data

```
<!-- get all gallery -->
/api/v1/artworks
```

to get specific gallery by id

```
<!-- get by id -->
/api/v1/artworks/:id
```

to update specific gallery data. use raw JSON on postman

```
<!-- update -->
http://localhost:3000/api/v1/artworks/:id

<!-- example -->
{
    "title": "update title 5 yang dihapus",
    "description": "update description 5"
}
```

to soft deletespecific gallery

```
<!-- soft delete -->
/api/v1/artworks/:id
```
