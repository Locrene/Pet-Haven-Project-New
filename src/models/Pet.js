class Pet {
  constructor(id, name, age, location, breed, status, description, image) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.location = location;
    this.breed = breed;
    this.status = status; // adopted / available / missing
    this.description = description;
    this.image = image;
  }

  markAdopted() {
    this.status = "adopted";
  }

  markMissing() {
    this.status = "missing";
  }
}

export default Pet;