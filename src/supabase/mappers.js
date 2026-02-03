// Función helper para mapear los campos de Supabase a los nombres esperados por los componentes
export const mapSupabaseProduct = (product) => {
  if (!product) return null;
  
  const images = Array.isArray(product.imagenes)
    ? product.imagenes.map((url, index) => ({ id: `${product.id || 'img'}-${index}`, url }))
    : product.imagenes
      ? [{ id: `${product.id || 'img'}-0`, url: product.imagenes }]
      : [];

  return {
    id: product.id,
    productName: product.nombre,
    price: product.precio,
    img: images[0]?.url || null,
    images,
    description: product.descripcion,
    stock: product.stock,
    category: product.categoria,
    categoria: product.categoria, // Mantener también el original para compatibilidad
    previousPrice: product.precioanterior,
    // Calcular descuento si hay precio anterior
    discount: product.precioanterior && product.precio 
      ? Math.round(((product.precioanterior - product.precio) / product.precioanterior) * 100)
      : 0,
    // Campos adicionales que podrían estar en Supabase
    enOferta: product.enOferta || false,
    freeShipping: product.freeShipping || false,
    rating: product.rating || { value: 0, count: 0 }
  };
};

// Función para mapear un array de productos
export const mapSupabaseProducts = (products) => {
  if (!products || !Array.isArray(products)) return [];
  return products.map(mapSupabaseProduct);
};
