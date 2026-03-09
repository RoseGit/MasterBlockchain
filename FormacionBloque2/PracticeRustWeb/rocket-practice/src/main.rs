#[macro_use] extern crate rocket;

// Definimos la ruta GET básica
#[get("/")]
fn index() -> &'static str {
    "¡Hola desde Rocket en el puerto 8090! part2"
}

#[get("/hello")]
fn hello() -> &'static str{
    "Hello from /hello endpoint "
}

// Punto de entrada principal
// #[launch] levanta el servidor como tal 
// routes![index] index apunta realmente a la funcion fn index() -> &'static str 
#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, hello]) // Registramos las rutas
        //.mount("/api", routes![helloApi]) // Registramos las rutas con contexto /api
}


