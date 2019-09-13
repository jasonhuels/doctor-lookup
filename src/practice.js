export class Practice {
  constructor(address, city, state, zip, phone, website, newPatients) {
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.website = website;
    this.newPatients = newPatients;
  }

  practiceString() {
    return `
      <p>${this.address}<br>${this.city}, ${this.state} ${this.zip}
      <br>${this.phone}
      <br>${this.website}
      <br>${this.newPatients}
      </p>
    `;
  }
}
