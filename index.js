console.log("Inicio del programa...")
const url_API = "https://fakestoreapi.com"
const argumentos = process.argv.slice(2)
const argumentos_validos = ["GET", "POST", "PUT", "DELETE"]
console.log("Argumentos recibidos:", argumentos)

async function programa_principal(argumentos = []) {
    if (!argumentos_validos.includes(argumentos[0])) {
        console.log("Comando incorrecto")
        return
    }
    switch (argumentos[0]) {
        case "GET":
            if (!argumentos[1].includes("/") && argumentos[1] == "products") {
                try {
                    const response = await fetch(`${url_API}/products`, {
                        method: "GET"
                    })
                    if (response.status !== 200) {
                        throw new Error("Falla solicitud")
                        break
                    }
                    const data = await response.json()
                    data.forEach(element => {
                        console.log(element)
                    });
                    break;
                    console.table(data)
                } catch (error) {
                    console.log(error)
                    break
                }
            } else if (argumentos[1].includes("/") && argumentos[1].includes("products")) {
                let id_sinseparar = argumentos[1].split("/")
                try {
                    const id = parseInt(id_sinseparar[1])
                    const reponse = await fetch(`${url_API}/products/${id}`, {
                        method: "GET"
                    })
                    if (reponse.status != 200) {
                        throw new Error("Error en la solicitud")
                        break;
                    }
                    const data = await reponse.json()
                    console.log(data)
                    break;
                } catch (error) {
                    console.log(error)
                    break;
                }
            } else {
                console.log("Comando incorrecto")
                break;
            }
        case "POST":
            if (argumentos.length === 5 && argumentos[1] === "products") {
                const [, , title, price, category] = argumentos;
                const nuevoProducto = { title, price, category };

                const response = await fetch(`${url_API}/products`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...nuevoProducto })
                });
                console.log("Solicitud enviada:", { ...nuevoProducto });
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                const data = await response.json();
                console.log("Producto creado:", data);
                break;
            } else {
                console.log("Solicitud incompleta");
                break;
            }

        case "PUT":
            if (argumentos.length === 6 && argumentos[1].includes("/") && argumentos[1].includes("products")) {
                let id_sinseparar = argumentos[1].split("/")
                const id = parseInt(id_sinseparar[1])
                const [, , , title, price, category] = argumentos
                const response = await fetch(`${url_API}/products/${id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, price, category })
                })
                if (!response.ok) {
                    throw new Error("Error en la solicitud")
                }
                const data = await response.json()
                console.log(data)
                break
            } else {
                console.log("Solicitud incompleta")
                break
            }
        case "DELETE":
            if (argumentos[1].includes("/") && argumentos[1].includes("products")) {
                let id_sinseparar = argumentos[1].split("/")
                try {
                    const id = parseInt(id_sinseparar[1])
                    const reponse = await fetch(`${url_API}/products/${id}`, {
                        method: "DELETE"
                    })
                    if (!reponse.ok) {
                        throw new Error("Error en la solicitud")
                        break;
                    }
                    const data = await reponse.json()
                    console.log(data)
                    break;
                } catch (error) {
                    console.log(error)
                    break;
                }
            } else {
                console.log("Solicitud incorrecta")
            }
    }
}
