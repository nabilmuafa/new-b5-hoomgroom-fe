export const getAllProducts = async () => {
    const response =  await fetch('http://localhost:8080/admin/product/list', { next: { cache: 'no-store', revalidate: 0 } })
    const products = await response.json()
    return products
}

export const getSearchedProduct = async (filterType, amount, fromLowest, keyword) => {
    const url = keyword ?
        `http://localhost:8080/admin/product/filter?filterType=${filterType}&amount=${amount}&fromLowest=${fromLowest}&keyword=${keyword}` :
        `http://localhost:8080/admin/product/filter?filterType=${filterType}&amount=${amount}&fromLowest=${fromLowest}`;

    const response = await fetch(url);
    const products = await response.json();
    return products;
}