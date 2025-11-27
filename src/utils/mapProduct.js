export const mapProduct = (item) => {
  return {
    brand: "Generic", // WooCommerce doesn't always have brand
    brandUrl: "#",
    category:
      item.categories && item.categories.length > 0
        ? item.categories[0].name
        : "Uncategorized",
    codCountry: "Global",
    currency: "$", // Or get from settings
    rawPrice: item.regular_price || item.price,
    discount: item.on_sale ? "Sale" : "",
    productId: item.id,
    primaryImage:
      item.images && item.images.length > 0
        ? item.images[0].src
        : "https://via.placeholder.com/300",
    isNew: item.date_created, // logic to check if new
    likesCount: 0,
    model: "Generic",
    name: item.name,
    currentPrice: item.price,
    subcategory:
      item.categories && item.categories.length > 0
        ? item.categories[0].name
        : "Uncategorized",
    // keep original categories array for filtering
    categories: item.categories || [],
    url: item.permalink,
    // Use additional images as variations if available
    variationColor1: "",
    variationImage1:
      item.images && item.images.length > 1 ? item.images[1].src : "",
    // use the full src for thumbnails so size is better in UI
    variationThumbnail1:
      item.images && item.images.length > 1 ? item.images[1].src : "",
    variationColor2: "",
    variationImage2:
      item.images && item.images.length > 2 ? item.images[2].src : "",
    variationThumbnail2:
      item.images && item.images.length > 2 ? item.images[2].src : "",
    description: item.description,
    shortDescription: item.short_description,
  };
};
