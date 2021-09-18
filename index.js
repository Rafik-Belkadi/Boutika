// On stock les produits sous forme d'un tableau d'objets
const products = [
    {
        id: 0,
        name: "Choco",
        description: "tres bon",
        quantity: 1,
        price: 120,
    },
    {
        id: 1,
        name: "Hlib",
        description: "tres bon",
        quantity: 1,
        price: 120
    },
    {
        id: 2,
        name: "Nutella",
        description: "tres bon",
        quantity: 1,
        price: 2000
    },
    {
        id: 3,
        name: "Pain",
        description: "tres bon",
        quantity: 1,
        price: 10
    },
]
// Je Déclare un tableau de favoris vide
var favorites = []
// Je déclare un panier vide
var panier = []
var productsDiv = document.getElementById('products')
// On prépare une variable qui va contenir l'html de toutes les cards
var htmlToInject = ""
// On boucle sur le tableau, et pour chaque object, on ajoute l'html d'une card
for (var i = 0; i < products.length; i++) {
    // J'extrait les props d'un objets en utilisant la déconstruction
    var { id, name, description, price, quantity } = products[i]
    // Je concatène à la variable l'html d'une card 
    htmlToInject += `<div class="card product">
            <img class="card-img-top" src="https://via.placeholder.com/250" alt="Card image cap">
            <div class="card-body">
                <div class="flex flex-space-between">
                    <h5 class="card-title">${name}</h5>
                    <i onclick="addToFavorite(${id})" id="favoris-${id}" class="fas fa-heart favorite"></i>
                </div>
                <p class="card-text">${description}</p>
                <p>${price}</p>
                <div class="d-flex align-items-center justify-content-between">
                    <button id="${id}" onclick="addToCart(${id})" class="btn btn-primary commander">Commander</button>
                    <div class="d-flex align-items-center buttons-quantity">
                        <div onclick="incrementQuantity(${id})" class="btn btn-primary plus">+</div>
                        <h4 id="quantity-${id}" >${quantity}</h4>
                        <div onclick="decrementQuantity(${id})" class="btn btn-primary moins">-</div>
                    </div>
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
    var total = 0;

    var prod = products.find((e) => e.id == id)
    var foundProd = panier.find(e => e.id == id)
    const { name, price, quantity } = prod
    if (!foundProd) {

        panier.push(prod)
        document.getElementById('taille-panier').innerText = panier.length
        // TODO: Injecter l'html du produit ajouté au MODAL
        // 1- Récuperer la div tbody avec l'id "panier-products"
        const panierProductsDiv = document.getElementById('panier-products')
        // 2- Ajouter à l'html de la div un <tr>
        panierProductsDiv.innerHTML += `<tr id="element-${id}">
                                <th scope="row">${id}</th>
                                <td>${name}</td>
                                <td>${quantity}</td>
                                <td>${price}</td>
                                <td><button onclick="deleteFromPanier(${id})" class="btn btn-danger">Delete</button></td>
                            </tr>`

    } else {
        foundProd.quantity++
    }
    var totalDiv = document.getElementById('total')
    for (let index = 0; index < panier.length; index++) {
        const element = panier[index];
        total += element.price * element.quantity
    }

    console.log({ total, panier })
    totalDiv.innerText = total + ' DZD'
}

// Fonction pour ajouter ou supprimer des favoris
const addToFavorite = (id) => {
    // Récuperer l'icone 
    var favori = document.getElementById('favoris-' + id)
    // Vérifier si le tableau de favoris contient l'element en question
    if (favorites.includes(id)) {
        favori.style.color = 'rgba(77, 76, 76, 0.507)'
        favorites = favorites.filter(e => e !== id)
        // TODO: Supprimer la div de l'html ou du DOM
        document.getElementById('favori-card-' + id).remove()
    } else {
        favori.style.color = 'red'
        favorites.push(id)
        // TODO: Ajoute de l'html au modal des favoris
        const { name, description } = products.find(e => e.id === id)

        document.getElementById('favorite-modal-body').innerHTML += `<div id="favori-card-${id}" class="product-card-favorite">
                        <div class="left">
                            <img src="https://via.placeholder.com/250" alt="">
                            <div class="product-card-favorite-details">
                                <h4>${name}</h4>
                                <p>${description}</p>
                            </div>
                        </div>
                        <div class="right">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>`
    }
}

// Créer une fonction deleteFromFavori
const deleteFromFavori = (id) => {
    favorites = favorites.filter((e) => e.id !== id)
    document.getElementById('favoris-' + id).remove()
}

// Function to increment product quantity
const incrementQuantity = (id) => {
    var prod = products[products.findIndex(e => e.id === id)]
    prod.quantity++

    document.getElementById('quantity-' + id).innerText = prod.quantity
}
// Function to decrement product quantity
const decrementQuantity = (id) => {
    var index = products.findIndex(e => e.id === id)
    var prod = products[index]
    if (prod.quantity > 0)
        prod.quantity--


    document.getElementById('quantity-' + id).innerText = prod.quantity
}

// TODO: Ajouter le checkout avec l'email et les details de la commande


async function handleSubmit() {
    var emailContent = ""
    for (var i = 0; i < panier.length; i++) {
        var { name, quantity, price } = panier[i]
        emailContent += `product: ${name} | quantité: ${quantity} | prix: ${price} \n`
    }

    var data = {
        email: 'rafik.belkadi.dz@gmail.com',
        message: emailContent
    }
    fetch('https://formspree.io/f/mjvjlwzl', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        console.log("ça marche bien")
        console.log({ response })
    }).catch(error => {
        console.log({ error })
    });
}
document.getElementById('confirmer').addEventListener("click", handleSubmit)