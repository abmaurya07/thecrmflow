const axios = require('axios');

async function addItemToMonday(boardId = '1922012467', itemName) {
    // Monday.com API configuration
    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQyMDQzMTk1OSwiYWFpIjoxMSwidWlkIjo2Njk1NTM4MSwiaWFkIjoiMjAyNC0xMC0wN1QxNjo1Njo0NS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU4MTE5MDMsInJnbiI6ImFwc2UyIn0.nK0ov9cGlW22AT5kk1oxcVI4XMrzPRSFFPpRTJ5R_MM";
    const API_URL = 'https://api.monday.com/v2';
    
    // Headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': API_KEY
    };
    
    // Prepare column values as a properly stringified JSON object
    const columnValues = JSON.stringify({
      lead_company: "test kd company",
      lead_phone: "545231894",
      lead_email: {email: "abmaurya07@gmail.com", text: "GCK", changed_at: Date.now()},
    });
    
    // GraphQL mutation query, with column_values as a string
    const query = `
      mutation {
        create_item(
          board_id: ${boardId}, 
          item_name: "${itemName}", 
          column_values: "${columnValues.replace(/"/g, '\\"')}",
        ) {
          id
        }
      }
    `;
  
    try {
      const response = await axios.post(API_URL, {
        query: query
      }, {
        headers: headers
      });
  
      if (response.data.errors) {
        console.log('Error adding item to Monday.com:', response.data.errors);
        throw new Error(response.data); // Throw an error
      }
  
      return response.data.data.create_item;
    } catch (error) {
      console.error('Error adding item to Monday.com:', error.message);
      throw error;
    }
  }


  addItemToMonday()