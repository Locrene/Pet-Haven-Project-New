class Pet {
  constructor(id, name, age, location, breed, status, description, image, owner, contact) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.location = location;
    this.breed = breed;
    this.status = status; // adopted / available / missing
    this.description = description;
    this.image = image;
    this.owner = owner || "Unknown";       // new — optional, defaults to "Unknown"
    this.contact = contact || "N/A";       // new — optional, defaults to "N/A"
  }

  markAdopted() {
    this.status = "adopted";
  }

  markMissing() {
    this.status = "missing";
  }
}

export default Pet;