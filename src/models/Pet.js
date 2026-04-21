class Pet {
  constructor(id, name, age, location, breed, status, description, image, owner = {}, type = "Dog") {
    this.id = id;
    this.name = name;
    this.age = age;
    this.location = location;
    this.breed = breed;
    this.status = status;
    this.description = description;
    this.image = image;
    this.owner = owner;
    this.type = type;
  }
}

export default Pet;