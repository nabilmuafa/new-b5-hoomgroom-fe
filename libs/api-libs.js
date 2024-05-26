export const getAllProducts = async () => {
    const response =  await fetch('http://localhost:8080/admin/product/list', { next: { cache: 'no-store', revalidate: 0 } })
    const products = await response.json()
    return products
}

export const getFilteredProduct = async (filterType, amount, fromLowest, keyword) => {
    const url = keyword ?
        `http://localhost:8080/admin/product/filter?filterType=${filterType}&amount=${amount}&fromLowest=${fromLowest}&keyword=${keyword}` :
        `http://localhost:8080/admin/product/filter?filterType=${filterType}&amount=${amount}&fromLowest=${fromLowest}`;

    const response = await fetch(url);
    const products = await response.json();
    return products;
}

export const getDetailProduct = async (productId) => {
    const response = await fetch(`http://localhost:8080/admin/product/update/${productId}`)
    const product = await response.json()
    return product
}