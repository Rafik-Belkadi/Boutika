// On stock les produits sous forme d'un tableau d'objets
const products = [
    {
        id: 0,
        name: "Choco",
        description: "tres bon",
        price: 120,
    },
    {
        id: 1,
        name: "Hlib",
        description: "tres bon",
        price: 120
    },
    {
        id: 2,
        name: "Nutella",
        description: "tres bon",
        price: 2000
    },
    {
        id: 3,
        name: "Pain",
        description: "tres bon",
        price: 10
    },
]
// Je déclare un panier vide
var panier = []
var productsDiv = document.getElementById('products')
// On prépare une variable qui va contenir l'html de toutes les cards
var htmlToInject = ""
// On boucle sur le tableau, et pour chaque object, on ajoute l'html d'une card
for (var i = 0; i < products.length; i++) {
    // J'extrait les props d'un objets en utilisant la déconstruction
    var { id, name, description, price } = products[i]
    // Je concatène à la variable l'html d'une card 
    htmlToInject += `<div class="card product">
            <img class="card-img-top" src="https://via.placeholder.com/250" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                <div class="d-flex align-items-center justify-content-between">
                    <p>${price}</p>
                    <a id="${id}" onclick="addToCart(${id})" href="#" class="btn btn-primary commander">Commander</a>
                </div>
            </div>
        </div>`
}
// Je récupére la div parents des cards
// J'y inject l'html
productsDiv.innerHTML = htmlToInject;



// Créer la fonction Delete du panier
const deleteFromPanier = (id) => {
    panier = panier.filter((e) => e.id !== id)
    document.getElementById('element-' + id).remove()
}
// Fonction pour ajouter au panier
const addToCart = (id) => {
    var prod = products.find((e) => e.id == id)
    const { name, price } = prod
    panier.push(prod)
    document.getElementById('taille-panier').innerText = panier.length
    // TODO: Injecter l'html du produit ajouté au MODAL
    // 1- Récuperer la div tbody avec l'id "panier-products"
    const panierProductsDiv = document.getElementById('panier-products')
    // 2- Ajouter à l'html de la div un <tr>
    panierProductsDiv.innerHTML += `<tr id="element-${id}">
                                <th scope="row">${id}</th>
                                <td>${name}</td>
                                <td>${price}</td>
                                <td><button onclick="deleteFromPanier(${id})" class="btn btn-danger">Delete</button></td>
                            </tr>`
}

