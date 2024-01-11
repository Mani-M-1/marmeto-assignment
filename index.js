let productItemsWrapperEl = document.getElementById("productItemsWrapper");



function createProductItem(productDetails) {
    const {product_badge, product_image, product_title, product_variants} = productDetails;


    let productItem = document.createElement("li");
    productItem.textContent = "product 1";
    productItem.classList.add("product-item");
    productItemsWrapperEl.appendChild(productItem);
    
    console.log(product_image)
    
    let imageEl = document.createElement("img");
    imageEl.src = product_image;
    imageEl.alt = "product image";
    imageEl.classList.add("product-image");
    productItem.appendChild(imageEl);

    let productTitleEl = document.createElement("h2");
    productTitleEl.textContent = product_title;
    productItem.appendChild(productTitleEl);


    product_variants.forEach((variant) => {
        let paragraphEl = document.createElement("p");
        const key = Object.keys(variant)[0];
        const value = variant[key];
        paragraphEl.textContent = value; 
        productItem.appendChild(paragraphEl);
    })


}



async function fetchData() {
    const response = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093");
    
    if (!response.ok) {
        throw new Error('Error occured while fetching products');
    }
    
    const fetchedData = await response.json();

    fetchedData.data.forEach(product => createProductItem(product))
    
    console.log(fetchedData.data);
}

fetchData();



function onChangeInput(event) {
    if (event.target.value !== "") {
        let productItems = document.getElementsByClassName("product-item");
        
        for (let i = 0; i < productItems.length; i++) {
            let productItem = productItems[i];
    
            let paragraphElements = productItem.querySelectorAll('p');

            paragraphElements.forEach(paragraphElement => {
                if (paragraphElement.textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
                    console.log("true");
                    paragraphElement.classList.add("highlight");
                } else {
                    console.log("false");
                    paragraphElement.classList.remove("highlight");
                }
            });
        }
    }

}