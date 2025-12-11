import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSeller } from "@/contexts/SellerContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Loader2, Package } from "lucide-react";
import { toast } from "sonner";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const API_URL = 'http://localhost:5000/api';

// Initialize Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


const categories = [
  "Reusable Bags",
  "Bamboo Products",
  "Organic Clothing",
  "Solar Gadgets",
  "Biodegradable Items",
  "Eco-friendly Home",
  "Natural Beauty",
  "Sustainable Food",
  "Zero Waste",
  "Other"
];

const ecoScores = ["A+", "A", "B", "C"];

export default function AddProduct() {
  const { seller, isAuthenticated } = useSeller();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    ecoScore: "B"
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/seller-login");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    try {
        console.log("Starting image upload...");
        console.log("Firebase Config:", {
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
        });

        const timestamp = Date.now();
        const fileName = `products/${seller?.id}/${timestamp}_${file.name}`;
        const storageRef = ref(storage, fileName);

        console.log("Uploading to path:", fileName);
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Upload successful, getting download URL...");
        
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Download URL obtained:", downloadURL);
        
        return downloadURL;
    } catch (error: any) {
        console.error("Firebase Upload Error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!formData.name.trim()) {
    toast.error("Product name is required");
    return;
  }
  if (!formData.description.trim()) {
    toast.error("Product description is required");
    return;
  }
  if (!formData.price || parseFloat(formData.price) <= 0) {
    toast.error("Please enter a valid price");
    return;
  }
  if (!formData.category) {
    toast.error("Please select a category");
    return;
  }
  if (!formData.stock || parseInt(formData.stock) < 0) {
    toast.error("Please enter a valid stock quantity");
    return;
  }
  if (!imageFile) {
    toast.error("Please upload a product image");
    return;
  }

  setIsLoading(true);

  try {
    console.log("=== Starting Product Creation ===");
    console.log("Seller Info:", seller);
    
    // Upload image to Firebase
    console.log("Step 1: Uploading image to Firebase...");
    const imageUrl = await uploadImageToFirebase(imageFile);
    console.log("Step 1 Complete: Image URL =", imageUrl);

    // Create product data
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      category: formData.category,
      stock: parseInt(formData.stock),
      ecoScore: formData.ecoScore,
      image: imageUrl,
      sellerId: seller?.id,
      sellerName: seller?.businessName || seller?.name
    };

    console.log("Step 2: Product data prepared:", productData);

    // Send to backend
    console.log("Step 3: Sending to backend API...");
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });

    console.log("Response Status:", response.status);
    console.log("Response OK:", response.ok);

    if (response.ok) {
      const result = await response.json();
      console.log("Step 3 Complete: Product created:", result);
      toast.success("Product added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        stock: "",
        ecoScore: "B"
      });
      setImageFile(null);
      setImagePreview("");
      
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate("/seller-dashboard");
      }, 1000);
    } else {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      toast.error(errorData.message || "Failed to add product");
    }
  } catch (error: any) {
    console.error("=== Error During Product Creation ===");
    console.error("Error Type:", error.constructor.name);
    console.error("Error Message:", error.message);
    console.error("Full Error:", error);
    toast.error(error.message || "Failed to add product. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/seller-dashboard")}
            className="border-green-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="bg-white border-green-100 shadow-lg">
          <CardHeader className="border-b border-green-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Add New Product</CardTitle>
                <CardDescription>Fill in the details to list your eco-friendly product</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Image */}
              <div className="space-y-2">
                <Label htmlFor="image">Product Image *</Label>
                <div className="border-2 border-dashed border-green-200 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview("");
                        }}
                        className="border-green-200"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="image" className="cursor-pointer block">
                      <Upload className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">Click to upload product image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Bamboo Toothbrush Set"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product's features and eco-friendly benefits..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-500 min-h-32"
                  required
                />
              </div>

              {/* Price and Original Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Selling Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="299"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="399 (optional)"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Category and Eco Score */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ecoScore">Eco Score *</Label>
                  <Select
                    value={formData.ecoScore}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, ecoScore: value }))}
                  >
                    <SelectTrigger className="border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ecoScores.map(score => (
                        <SelectItem key={score} value={score}>{score}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="50"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700"
                >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                    <div style={{ transform: 'scale(0.3)' }}>
                        <Loader />
                    </div>
                    <span className="ml-2">Adding Product...</span>
                    </div>
                ) : (
                    <>
                    <Package className="mr-2 h-4 w-4" />
                    Add Product
                    </>
                )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/seller-dashboard")}
                  disabled={isLoading}
                  className="border-green-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
