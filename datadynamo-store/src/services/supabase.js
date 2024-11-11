// JSON type definition
/**
 * @typedef {string | number | boolean | null | { [key: string]: Json | undefined } | Json[]} Json
 */

// Updated database schema structure for `users` table
const Database = {
    public: {
      Tables: {
        users: { // Change to `users` table
          Row: {
            created_at: "", // Date string in ISO format
            id: 0,          // Unique integer ID
            username: "",   // String for user username
            email: ""       // String for user email
          },
          Insert: {
            created_at: "", // Optional for insert
            id: 0,          // Optional for insert
            username: "",   // Required username
            email: ""       // Required email
          },
          Update: {
            created_at: "", // Optional for update
            id: 0,          // Optional for update
            username: "",   // Optional for update
            email: ""       // Optional for update
          },
          Relationships: []
        }
      },
      Views: {},
      Functions: {},
      Enums: {},
      CompositeTypes: {}
    }
  };

// Placeholder for interacting with tables and retrieving data.
function Tables(tableName) {
  // Mock function to mimic database fetch based on table name
  if (Database.public.Tables[tableName]) {
    return Database.public.Tables[tableName].Row;
  } else {
    throw new Error("Table not found");
  }
}

// Mock CRUD functions for interaction
const dbOperations = {
  insert: (tableName, data) => {
    if (Database.public.Tables[tableName]) {
      // Validate and insert based on `Insert` type structure
      console.log(`Inserting into ${tableName}`, data);
    }
  },
  update: (tableName, data) => {
    if (Database.public.Tables[tableName]) {
      // Validate and update based on `Update` type structure
      console.log(`Updating ${tableName}`, data);
    }
  },
  getRow: (tableName, id) => {
    if (Database.public.Tables[tableName]) {
      // Simulate fetching a row by ID
      console.log(`Fetching row with id ${id} from ${tableName}`);
      return Database.public.Tables[tableName].Row;
    }
  }
};

// Example usage with `users` table
dbOperations.insert("users", { username: "User123", email: "user123@example.com" });
dbOperations.update("users", { id: 1, email: "updateduser@example.com" });
dbOperations.getRow("users", 1);
