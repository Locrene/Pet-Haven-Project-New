import Pet from "../models/Pet";

class PetService {
  constructor() {
    this.pets = [
      new Pet(1, "Luna", 2, "Cebu City", "dog", "avaiable", "Friendly dog", "/images/dog1.jpg"),
      new Pet(2, "Browny", 5, "Labangon", "dog", "missing", "Lost dog", "/images/dog2.jpg"),
      new Pet(3, "Rocky", 3, "Lapu-Lapu", "dog", "adopted", "Guard dog", "/images/dog3.jpg"),
      new Pet(4, "Milo", 1, "Mandaue", "dog", "adopted", "Playful puppy", "/images/dog4.jpg"),
      new Pet(5, "Cal", 2, "Cebu City", "cat", "available", "Playful/Clingy", "/images/cal.jpg"),
      new Pet(6, "Sven", 3, "Busay", "cat", "available", "Friendly/Playful", "/images/sven.jpg"),
      new Pet(7, "Lizzy", 1, "Ayala", "cat", "available", "Sassy", "/images/lizzy.jpg"),
    ];
  }

  getAllPets() {
    return this.pets;
  }
}

export default new PetService();