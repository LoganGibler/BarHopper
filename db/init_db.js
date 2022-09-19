const { client, create_user, getAllUsers } = require("./index");

async function drop_tables() {
  console.log("Attempting to drop tables.");
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);
    // console.log("Finished dropping tables.");
  } catch (error) {
    console.log("Error dropping tables.");
    throw error;
  }
}

async function build_tables() {
  console.log("Starting to build tables.");
  try {
    await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `);
    // console.log("Finished building tables.");
  } catch (error) {
    console.log("Error building tables.");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    const user_one = await create_user({
      username: "LoganGibler",
      password: "FullstackAcademy",
    });
    const user_two = await create_user({
      username: "HoldenGibler",
      password: "FloridaAtlanticUniversity",
    });
    const user_three = await create_user({
      username: "PaytonGibler",
      password: "FullstackAcademy2",
    });
    // console.log(user_one, user_two, user_three);
    return [user_one, user_two, user_three];
  } catch (error) {
    console.log("Error creating initial users.");
    throw error;
  }
}


async function rebuildDB() {
  try {
    client.connect();
    await drop_tables();
    await build_tables();
    await createInitialUsers();
    console.log("Finished building database.");
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
