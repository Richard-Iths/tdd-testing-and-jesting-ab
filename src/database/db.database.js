class Database {
  instance = null;
  db = {
    users: [
      {
        id: "990s89da9a9fua9uf9",
        name: "Anders",
        password: "grillkorv",
        login: "grillkorv",
        role: "user"
      },
    ],
    products: [
      {
        id: "8948108401sjfaj",
        name: "Nike Shoes",
        price: 5000,
      },
      {
        id: "ssdada401sjfaj",
        name: "Nike underwear",
        price: 500,
      },
    ],
    carts: [
      {
        userId: "990s89da9a9fua9uf9",
        productId: "8948108401sjfaj",
        amount: 50,
      },
      {
        userId: "990s89da9a9fua9uf9",
        productId: "ssdada401sjfaj",
        amount: 10,
      },
    ],
  };
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }
  getFrom(table, query, params) {
    return new Promise((resolve, reject) => {
      if (!query || !params) {
        return this.db[table] && resolve("OK");
      }
      reject("Not found.")
    });
  }
}

const db = new Database();

export default db;
