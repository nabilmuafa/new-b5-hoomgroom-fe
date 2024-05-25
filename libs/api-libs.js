export const getAllProducts = async () => {
    const response =  await fetch('http://localhost:8080/admin/product/list', { next: { cache: 'no-store', revalidate: 0 } })
    const products = await response.json()
    return products
}