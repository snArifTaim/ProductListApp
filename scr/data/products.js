const ProductsData = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  name: `Product ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  image: "https://via.placeholder.com/100",
}));

export default ProductsData;
