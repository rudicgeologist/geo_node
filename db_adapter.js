const Pool = require('pg').Pool;

const pool = 

new Pool({
  user: 'deadnikifor',
  host: 'ep-cold-night-344467.eu-central-1.aws.neon.tech',
  database: 'neondb',
  password: 'WcfJxVw2iu7P',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// new Pool({
//   user: 'eituryimwkkeqi',
//   host: 'ec2-34-247-141-1.eu-west-1.compute.amazonaws.com',
//   database: 'df87tf2cgjqesh',
//   password: '708eca41d662e8b9f32c7b0fe784638a53f36ecc24b4b7a3a78e758cb35d4f7a',
//   port: 5432,
//   ssl: { rejectUnauthorized: false }
// });

module.exports = {

    GetHoles: async function () {
    //   var query = `select register_new_user(\'${login}\', \'${pass}\');`;  

      var query = ' select * from "geoapp_holeN" '  // 'select * from "geoapp_holeD" as hd where hd.n_id = 2 '

      console.log(query);
      try {
        const res = await pool.query(
          query,
          []
        );
        // console.log(res);
        return res.rows;
        // console.log(res.rows[0].register_new_user);
        // return res.rows[0].register_new_user;
      } catch (error) {
        console.error(error);
        return "GetHoles: smth error";
      }
    },

    GetHoleDepths: async function (hole_id, hole_depth_id) {
  
        var query = ` select * from get_hole_depths(${hole_id}, ${hole_depth_id}) `    
          
        console.log(query);
        try {
          const res = await pool.query(
            query,
            []
          );
          // console.log(res);
          return res.rows;
          // console.log(res.rows[0].register_new_user);
          // return res.rows[0].register_new_user;
        } catch (error) {
          console.error(error);
          return "GetHolesD: smth error";
        }
      },

    SaveHoleDepth: async function (hole_id, hole_depth_id,  depth_, description_) {

        var query = ` select * from save_hole_depth(${hole_id}, ${hole_depth_id},  ${depth_}, '${description_}') `    
          
        console.log(query);
        try {
          const res = await pool.query(
            query,
            []
          );
          console.log('db_a: ' + res);
          return res.rows;
          // console.log(res.rows[0].register_new_user);
          // return res.rows[0].register_new_user;
        } catch (error) {
          console.error(error);
          return "SaveHoleDepth: smth error";
        }
      },

      SaveMediaToObject: async function (url, media_type, object_type, object_id) {

        var object_table = ""

        switch (object_type) {
          case 'hole':
            object_table = "geoapp_holeN"
            break;
          
          case 'depth':
            object_table = "geoapp_holeD"
            break;
          default:
            object_table = "noTable"
        }

        if (object_table != "noTable") {
          var query =  //` select * from save_hole_depth(${hole_id}, ${hole_depth_id},  ${depth_}, '${description_}') `  
            `insert into "${object_table}_media" 
            (url, caption, ${object_table}_id, type)
            values 
            ('${url}', 'cap1', ${object_id}, '${media_type}') `;
            
            console.log(query);

            try {
              const res = await pool.query(
                query,
                []
              );
              console.log('SaveMediaToObject_res: ' + res);
              return res.rows;
            } catch (error) {
              console.error(error);
              return "SaveMediaToObject: smth error";
            }
        }
      },  
  };
