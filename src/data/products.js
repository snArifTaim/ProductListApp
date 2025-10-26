export const products = [];

export async function fetchProducts() {
  try {
    const response = await fetch(
      'https://dummyjson.com/products/category/smartphones?limit=20'
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default products;
