export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  ecoImpact: string;
  inStock: boolean;
}

export const parseCSV = (csv: string): Product[] => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = parseCSVLine(line);
    const product: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      
      switch (header.trim()) {
        case 'id':
        case 'price':
        case 'reviews':
          product[header.trim()] = parseInt(value);
          break;
        case 'originalPrice':
          product[header.trim()] = value ? parseInt(value) : undefined;
          break;
        case 'rating':
          product[header.trim()] = parseFloat(value);
          break;
        case 'features':
          product[header.trim()] = value ? value.split('|') : [];
          break;
        case 'inStock':
          product[header.trim()] = value === 'true';
          break;
        default:
          product[header.trim()] = value;
      }
    });
    
    return product as Product;
  });
};

// Helper function to properly parse CSV lines with quoted values
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};
