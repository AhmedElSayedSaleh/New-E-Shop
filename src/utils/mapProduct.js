// Helper function to get resized image URL
const getResizedImageUrl = (imageUrl, size = "medium") => {
  if (!imageUrl || typeof imageUrl !== "string") return imageUrl;

  // If it's a placeholder or external URL, return as is
  if (
    imageUrl.includes("placeholder") ||
    imageUrl.startsWith("data:") ||
    imageUrl.includes("gravatar")
  ) {
    return imageUrl;
  }

  // WooCommerce image sizes:
  // thumbnail: 150x150
  // medium: 300x300
  // medium_large: 768x768
  // large: 1024x1024

  const sizes = {
    thumbnail: "-150x150",
    medium: "-300x300",
    medium_large: "-768x768",
    large: "-1024x1024",
  };

  const sizePattern = sizes[size] || sizes.medium;

  // Check if the image URL has a valid extension
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const lastDotIndex = imageUrl.lastIndexOf(".");

  if (lastDotIndex === -1) return imageUrl;

  const extension = imageUrl.substring(lastDotIndex).toLowerCase();

  // Check if it's a valid image extension
  if (!validExtensions.some((ext) => extension.startsWith(ext))) {
    return imageUrl;
  }

  // Check if the URL already has a size suffix (e.g., already resized)
  const beforeExtension = imageUrl.substring(0, lastDotIndex);
  if (/-\d+x\d+$/.test(beforeExtension)) {
    // Already has a size suffix, replace it
    const withoutSize = beforeExtension.replace(/-\d+x\d+$/, "");
    return `${withoutSize}${sizePattern}${extension}`;
  }

  // Add size suffix before extension
  return `${beforeExtension}${sizePattern}${extension}`;
};

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
        ? getResizedImageUrl(item.images[0].src, "medium_large")
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
      item.images && item.images.length > 1
        ? getResizedImageUrl(item.images[1].src, "medium_large")
        : "",
    // use thumbnail size for better performance
    variationThumbnail1:
      item.images && item.images.length > 1
        ? getResizedImageUrl(item.images[1].src, "thumbnail")
        : "",
    variationColor2: "",
    variationImage2:
      item.images && item.images.length > 2
        ? getResizedImageUrl(item.images[2].src, "medium_large")
        : "",
    variationThumbnail2:
      item.images && item.images.length > 2
        ? getResizedImageUrl(item.images[2].src, "thumbnail")
        : "",
    description: item.description,
    shortDescription: item.short_description,
  };
};
