// JSON type definition
/**
 * @typedef {string | number | boolean | null | { [key: string]: Json | undefined } | Json[]} Json
 */

// Database schema structure in JavaScript
const Database = {
    public: {
      Tables: {
        ranking: {
          Row: {
            created_at: "", // Date string in ISO format
            id: 0,          // Unique integer ID
            nickname: "",   // String for user nickname
            points: 0       // Integer for points scored
          },
          Insert: {
            created_at: "", // Optional for insert
            id: 0,          // Optional for insert
            nickname: "",   // Required nickname
            points: 0       // Optional points
          },
          Update: {
            created_at: "", // Optional for update
            id: 0,          // Optional for update
            nickname: "",   // Optional for update
            points: 0       // Optional for update
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
  
  // Example usage
  dbOperations.insert("ranking", { nickname: "Player1", points: 100 });
  dbOperations.update("ranking", { id: 1, points: 150 });
  dbOperations.getRow("ranking", 1);