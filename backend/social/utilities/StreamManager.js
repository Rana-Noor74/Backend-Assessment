const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// const processMessage = async (kafkaMessage) => {
//   try {
//     const event_name = kafkaMessage.event_name;
//     const dataObject = kafkaMessage.properties;
//     if (event_name === 'tenant_created') {
//       // Insert into Tenant_Profile table
//       await db('Tenant_Profile').insert(properties);
//     } else if (event_name === 'user_created') {
//       // Insert into User_Profile table
//       await db('User_Profile').insert(properties);
//     } else {
//       console.log(`Unknown event: ${event_name}`);
//     }
//   } catch (err) {
//     console.error('Error processing message:', err.message);
//   }
// };

// module.exports = { processMessage };

const processMessage = async (kafkaMessage) => {
  console.log(kafkaMessage);

  const event_name = kafkaMessage.event_name;
  const dataObject = kafkaMessage.properties; 
  
  if(event_name == "user_created"){
    let user_object =     {
      "first_name": dataObject.first_name,
      "last_name": dataObject.last_name,
      "department": dataObject.department,
      "designation": dataObject.designation,
      "tenant_id": dataObject.tenant_id,
      "image_url": dataObject.image_url,
      "city": dataObject.city,
      "country": dataObject.country,
      "bio": dataObject.bio,
      "social_links": dataObject.social_links,
      "employee_id": dataObject.employee_id,
    }
    await db('User_Profile').insert(user_object);
  }else{
    let tenant_object = {
      "tenant_name": dataObject.name,
      "address": dataObject.address,
      "city": dataObject.city,
      "country": dataObject.country,
      "zip_code": dataObject.zip_code,
      "phone": dataObject.phone,
      "web_url": dataObject.web_url,
      "state" : dataObject.state
    }
    await db("Tenant_Profile").insert(tenant_object);
  }

};

module.exports = { processMessage };
