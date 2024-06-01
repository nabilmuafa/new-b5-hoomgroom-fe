export const getAllProducts = async () => {
  const response = await fetch(
    "https://api.b5-hoomgroom.com/admin/product/list",
    {
      next: { cache: "no-store", revalidate: 0 },
    }
  );
  const products = await response.json();
  return products;
};

export const getFilteredProduct = async (
  filterType,
  amount,
  fromLowest,
  keyword
) => {
  const url = keyword
    ? `https://api.b5-hoomgroom.com/admin/product/filter?filterType=${filterType}&amount=${amount}&fromLowest=${fromLowest}&keyword=${keyword}`
    : `https://api.b5-hoomgroom.com/admin/product/filter?filterType=${filterType}&amount=${amount}&fromLowest=${fromLowest}`;

  const response = await fetch(url);
  const products = await response.json();
  return products;
};

export const getDetailProduct = async (productId) => {
  const response = await fetch(
    `https://api.b5-hoomgroom.com/admin/product/update/${productId}`
  );
  const product = await response.json();
  return product;
};
