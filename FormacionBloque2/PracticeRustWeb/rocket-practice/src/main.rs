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

// Nueva ruta que recibe un parámetro 'id'
// El tipo 'i32' asegura que solo acepte números enteros
#[get("/item/<id>/nombre/<name>")]
fn get_item(id: i32, name:String) -> String {
    format!("Has solicitado el ítem con el ID: {} and name: {}", id, name)
}

#[get("/items?<page>&<per_page>&<sort_by>")]
fn get_items(page:Option<u32>, per_page:Option<u32>, sort_by:Option<String> ) -> String {    
    let page = page.unwrap_or(1);
    let per_page = per_page.unwrap_or(10);
    let sort_by = sort_by.unwrap_or_else(|| String::from("id"));
    
    
    format!(
        "Listando items: Página {}, mostrando {} registros, ordenados por: '{}'",
        page, per_page, sort_by
    )
}



// Punto de entrada principal
// #[launch] levanta el servidor como tal 
// routes![index] index apunta realmente a la funcion fn index() -> &'static str 
#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, hello, get_item, get_items]) // Registramos las rutas
        //.mount("/api", routes![helloApi]) // Registramos las rutas con contexto /api
}


