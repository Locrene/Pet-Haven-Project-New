import Pet from "../models/Pet";

const PETS_KEY = "pawhavenPets";

const defaultPets = [
  new Pet(1, "Luna",  2, "Cebu City",  "dog", "available", "Friendly and energetic dog who loves outdoor play.",    "/images/dog1.jpg"),
  new Pet(2, "Browny",5, "Labangon",   "dog", "missing",   "Lost dog last seen near Labangon market.",              "/images/dog2.jpg"),
  new Pet(3, "Rocky", 3, "Lapu-Lapu", "dog", "adopted",   "Loyal guard dog — now in his forever home.",            "/images/dog3.jpg"),
  new Pet(4, "Milo",  1, "Mandaue",   "dog", "adopted",   "Playful puppy adopted by a loving family.",             "/images/dog4.jpg"),
  new Pet(5, "Cal",   2, "Cebu City", "cat", "available", "Playful and clingy — loves laps and sunny windows.",    "/images/cal.jpg"),
  new Pet(6, "Sven",  3, "Busay",     "cat", "available", "Friendly and curious, great with other pets.",          "/images/sven.jpg"),
  new Pet(7, "Lizzy", 1, "Ayala",     "cat", "available", "Sassy but affectionate — perfect for quiet households.","/images/lizzy.jpg"),
];

class PetService {
  /** Return all pets, loading from localStorage if available */
  getAllPets() {
    const raw = localStorage.getItem(PETS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // First run — persist the defaults
    localStorage.setItem(PETS_KEY, JSON.stringify(defaultPets));
    return defaultPets;
  }

  /** Add a new pet listing and persist */
  addPet(formData) {
    const pets = this.getAllPets();
    const newPet = new Pet(
      Date.now(),
      formData.name    || "Unnamed",
      formData.age     || 0,
      formData.location|| "Unknown",
      formData.breed   || "Unknown",
      formData.status  || "available",
      formData.description || "",
      formData.image   || "/images/default.jpg"
    );
    const updated = [...pets, newPet];
    localStorage.setItem(PETS_KEY, JSON.stringify(updated));
    return newPet;
  }

  /** Update a pet's status */
  updateStatus(petId, status) {
    const pets = this.getAllPets();
    const updated = pets.map((p) => (p.id === petId ? { ...p, status } : p));
    localStorage.setItem(PETS_KEY, JSON.stringify(updated));
  }
}

export default new PetService();
