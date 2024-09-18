const ratingSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    category: { type: String, required: true },
    details: { type: String, required: true },
  });
  
  const Rating = mongoose.model("Rating", ratingSchema);