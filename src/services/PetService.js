import Pet from "../models/Pet";

class PetService {
  constructor() {
    this.pets = [
      // ── Original 6 ──────────────────────────────────────────────────────────
      new Pet(
        1, "Luna", 2, "Cebu City", "Golden Retriever", "available",
        "Luna is a sweet, energetic Golden Retriever who loves to play fetch and cuddle. She is great with kids and other dogs. Fully vaccinated and house-trained.",
        "/images/dog1.jpg",
        { name: "Maria Santos", phone: "+63 912 345 6789", email: "maria@email.com", address: "Labangon, Cebu City" },
        "Dog"
      ),
      new Pet(
        2, "Browny", 5, "Labangon", "Askal", "available",
        "Browny is a loyal street dog rescued from the streets of Labangon. He is calm, gentle, and gets along well with humans. Needs a loving forever home.",
        "/images/dog2.jpg",
        { name: "Juan Reyes", phone: "+63 917 654 3210", email: "juan@email.com", address: "Labangon, Cebu City" },
        "Dog"
      ),
      new Pet(
        3, "Rocky", 3, "Lapu-Lapu", "German Shepherd", "available",
        "Rocky is a trained German Shepherd looking for an active family. He knows basic commands and is an excellent guard dog. Loves long walks and outdoor play.",
        "/images/dog3.jpg",
        { name: "Ana Cruz", phone: "+63 918 111 2222", email: "ana@email.com", address: "Lapu-Lapu City, Cebu" },
        "Dog"
      ),
      new Pet(
        4, "Milo", 1, "Mandaue", "Mixed", "adopted",
        "Milo is an adorable mixed-breed puppy full of energy and mischief. He loves to play and will bring joy to any household. Already adopted but you can see similar pets!",
        "/images/dog4.jpg",
        { name: "Carla Lim", phone: "+63 920 333 4444", email: "carla@email.com", address: "Mandaue City, Cebu" },
        "Dog"
      ),
      new Pet(
        5, "Snowball", 3, "Cebu City", "Persian Cat", "available",
        "Snowball is a fluffy Persian cat who loves lounging in sunny spots and being groomed. She is calm, quiet, and perfect for apartment living.",
        "/images/cat1.jpg",
        { name: "Lea Gomez", phone: "+63 921 555 6666", email: "lea@email.com", address: "IT Park, Cebu City" },
        "Cat"
      ),
      new Pet(
        6, "Whiskers", 2, "Talisay", "Domestic Shorthair", "available",
        "Whiskers is a playful domestic shorthair cat who enjoys chasing toys and birds outside the window. He is curious, affectionate, and gets along with kids.",
        "/images/cat2.jpg",
        { name: "Ben Torres", phone: "+63 922 777 8888", email: "ben@email.com", address: "Talisay City, Cebu" },
        "Cat"
      ),

      // ── 8 New Pets ──────────────────────────────────────────────────────────
      new Pet(
        7, "Max", 4, "Cebu City", "Labrador Retriever", "available",
        "Max is a friendly and intelligent Labrador who is great with children and other pets. He loves swimming and fetching. Neutered and fully vaccinated.",
        "/images/dog5.jpg",
        { name: "Rosa Dela Cruz", phone: "+63 923 888 0001", email: "rosa@email.com", address: "Mabolo, Cebu City" },
        "Dog"
      ),
      new Pet(
        8, "Bella", 2, "Consolacion", "Shih Tzu", "available",
        "Bella is an adorable Shih Tzu who loves being pampered. She is quiet, gentle, and great for apartment life. She enjoys cuddles and short walks.",
        "/images/dog6.jpg",
        { name: "Tina Aquino", phone: "+63 924 888 0002", email: "tina@email.com", address: "Consolacion, Cebu" },
        "Dog"
      ),
      new Pet(
        9, "Charlie", 6, "Danao", "Beagle", "available",
        "Charlie is a senior Beagle with a nose for adventure. Despite his age, he is still playful and loves sniffing around the garden. Very calm indoors.",
        "/images/dog7.jpg",
        { name: "Greg Santos", phone: "+63 925 888 0003", email: "greg@email.com", address: "Danao City, Cebu" },
        "Dog"
      ),
      new Pet(
        10, "Oreo", 1, "Mandaue", "Aspin", "available",
        "Oreo is a black-and-white Aspin puppy with a playful spirit. He is very sociable and loves playing with other dogs. Currently learning basic commands.",
        "/images/dog8.jpg",
        { name: "Mike Tan", phone: "+63 926 888 0004", email: "mike@email.com", address: "Mandaue City, Cebu" },
        "Dog"
      ),
      new Pet(
        11, "Mittens", 3, "Cebu City", "Siamese Cat", "available",
        "Mittens is a talkative Siamese cat who loves attention. She is very vocal, playful, and bonds deeply with her owner. Ideal for someone who wants a close companion.",
        "/images/cat3.jpg",
        { name: "Cathy Lim", phone: "+63 927 888 0005", email: "cathy@email.com", address: "Banilad, Cebu City" },
        "Cat"
      ),
      new Pet(
        12, "Ginger", 2, "Liloan", "Tabby Cat", "available",
        "Ginger is a gorgeous orange tabby who is independent but affectionate. She loves basking in the sun and playing with string toys. Low maintenance and sweet.",
        "/images/cat4.jpg",
        { name: "Peter Ngo", phone: "+63 928 888 0006", email: "peter@email.com", address: "Liloan, Cebu" },
        "Cat"
      ),
      new Pet(
        13, "Shadow", 4, "Toledo", "Maine Coon Mix", "available",
        "Shadow is a large, fluffy Maine Coon mix with a calm and regal demeanor. He is great with older children and prefers quiet homes. Loves being brushed.",
        "/images/cat5.jpg",
        { name: "Dina Reyes", phone: "+63 929 888 0007", email: "dina@email.com", address: "Toledo City, Cebu" },
        "Cat"
      ),
      new Pet(
        14, "Peanut", 1, "Carcar", "Dutch Rabbit", "available",
        "Peanut is a fluffy Dutch rabbit who loves hopping around and munching on veggies. He is litter-trained, gentle, and perfect for families with children.",
        "/images/rabbit1.jpg",
        { name: "Luz Fernandez", phone: "+63 930 888 0008", email: "luz@email.com", address: "Carcar City, Cebu" },
        "Other"
      ),
    ];

    this.nextId = 15;
  }

  getAllPets() {
    return [...this.pets];
  }

  getPetById(id) {
    return this.pets.find((p) => p.id === id);
  }

  addPet(petData) {
    const newPet = new Pet(
      this.nextId++,
      petData.name,
      petData.age,
      petData.location,
      petData.breed,
      "available",
      petData.description,
      petData.image || "/images/default.jpg",
      { name: petData.ownerName, phone: petData.phone, email: petData.email, address: petData.address },
      petData.type
    );
    this.pets.unshift(newPet);
    return newPet;
  }
}

export default new PetService();