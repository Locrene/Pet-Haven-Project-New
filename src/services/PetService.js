import Pet from "../models/Pet";

const STORAGE_KEY = "postedPets";

// Seed pets — always present
const SEED_PETS = [
  new Pet(1,  "Luna",   2, "Cebu City",   "Golden Retriever", "available", "Friendly and loves cuddles",   "/images/dog1.jpg", "Maria Santos",     "09171234567"),
  new Pet(2,  "Browny", 5, "Labangon",    "Askal",            "available", "Energetic and loyal",          "/images/dog2.jpg", "Juan Dela Cruz",   "09281234567"),
  new Pet(3,  "Rocky",  3, "Lapu-Lapu",   "German Shepherd",  "available", "Smart and protective",         "/images/dog3.jpg", "Ana Reyes",        "09391234567"),
  new Pet(4,  "Milo",   1, "Mandaue",     "Mixed",            "available", "Playful and affectionate",     "/images/dog4.jpg", "Carlo Gomez",      "09501234567"),
  new Pet(5,  "Bella",  2, "Talisay",     "Shih Tzu",         "available", "Calm and great with kids",     "/images/dog1.jpg", "Rosa Lim",         "09611234567"),
  new Pet(6,  "Coco",   4, "Consolacion", "Askal",            "available", "Street-smart and gentle",      "/images/dog2.jpg", "Pedro Bautista",   "09721234567"),
  new Pet(7,  "Nala",   1, "Cebu City",   "Mixed Breed",      "available", "Tiny bundle of energy",        "/images/dog3.jpg", "Liza Flores",      "09831234567"),
  new Pet(8,  "Max",    6, "Mandaue",     "Labrador",         "available", "Laid-back and loves walks",    "/images/dog4.jpg", "Rico Tan",         "09941234567"),
  new Pet(9,  "Daisy",  3, "Lapu-Lapu",  "Poodle Mix",        "available", "Fluffy and loves attention",   "/images/dog1.jpg", "Grace Villanueva", "09151234567"),
  new Pet(10, "Bruno",  5, "Labangon",    "Rottweiler Mix",   "available", "Big but super gentle",         "/images/dog2.jpg", "Mark Ocampo",      "09261234567"),
  new Pet(11, "Kitty",  2, "Talisay",     "Puspin",           "available", "Independent and curious",      "/images/dog3.jpg", "Nina Cruz",        "09371234567"),
  new Pet(12, "Buddy",  1, "Cebu City",   "Beagle Mix",       "available", "Nose always to the ground",    "/images/dog4.jpg", "Ben Ramos",        "09481234567"),
];

class PetService {
  constructor() {
    this.seedPets = SEED_PETS;
  }

  // Returns seed + user-posted pets merged
  getAllPets() {
    const posted = this._getPostedPets();
    return [...this.seedPets, ...posted];
  }

  getPetById(id) {
    return this.getAllPets().find((pet) => pet.id === id);
  }

  // Add a new pet posted by the user
  addPet(petData) {
    const posted = this._getPostedPets();
    const newId = Date.now(); // unique id
    const newPet = new Pet(
      newId,
      petData.name,
      Number(petData.age),
      petData.location,
      petData.breed,
      "available",
      petData.description,
      petData.image,   // base64 data URL from file input
      petData.owner,
      petData.contact
    );
    posted.push(newPet);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posted));
    return newPet;
  }

  // Delete a user-posted pet (seed pets cannot be deleted)
  deletePet(id) {
    const posted = this._getPostedPets().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posted));
  }

  // Update pet status (e.g., to "adopted" after adoption)
  updatePetStatus(id, newStatus) {
    const allPets = this.getAllPets();
    const pet = allPets.find((p) => p.id === id);
    
    if (!pet) return false;
    
    // Check if it's a user-posted pet
    const posted = this._getPostedPets();
    const postedPet = posted.find((p) => p.id === id);
    
    if (postedPet) {
      // Update in localStorage
      postedPet.status = newStatus;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posted));
      return true;
    }
    
    // For seed pets, we'd need a different storage mechanism
    // For now, we can store status updates in a separate key
    const adoptions = JSON.parse(localStorage.getItem("petAdoptions")) || {};
    adoptions[id] = newStatus;
    localStorage.setItem("petAdoptions", JSON.stringify(adoptions));
    return true;
  }

  // Get effective pet status (considering adoption updates)
  getPetStatus(id) {
    const adoptions = JSON.parse(localStorage.getItem("petAdoptions")) || {};
    if (adoptions[id]) {
      return adoptions[id];
    }
    const pet = this.getPetById(id);
    return pet?.status || "available";
  }
  _getPostedPets() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
}

export default new PetService();