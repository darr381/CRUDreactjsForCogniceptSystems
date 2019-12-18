let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
var cors = require('cors');
let pg = require('pg');
const port = 3200;

// let pool = new pg.Pool({
//   user: 'postgres',
//   database: 'cruerrorclassification',
//   password: 'Darr@381',
//   host: 'localhost',
//   port: 5432,
//   max: 10
// });


let pool = new pg.Pool({
  user: 'cognicept',
  database: 'cruerrorclassification',
  password: 'cognicept18',
  host: '35.187.247.9',
  port: 5432,
  max: 10
});

    // db.query('SELECT * FROM first',(err,table) => {
    //   done();
    //   if(err){
    //     console.log(err);
    //   }
    //   else{
    //     console.log(table.rows);
    //     db.end();
    //   }
    //
    // });


let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(request,response,next){
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept ");
  next();
});
app.post('/public/table_data', function(request, response){
  pool.connect(function(err,db,done){
    if(err){
      return response.status(400).send(err);
    }
    else{
      let error_code = request.body.error_code
      console.log(error_code)
      db.query("SELECT * FROM first where error_code=$1",[error_code], function(err,table){
        done();
        if(err){
          return response.status(400).send(err);
        }
        else{
          console.log("table sent");
          console.log(table.rows);
          return response.status(200).send(table.rows);
        }
      });
    }
  });
})
app.delete('/public/delete_row',function(request,response){
  console.log('app.delete entered');
  pool.connect((err,db,done)=>{
    if(err){
      return console.log(err);
    }
    else{
      var error_code = request.body.error_code;
      db.query('DELETE FROM first WHERE error_code =$1 ',[error_code], (err,table)=>{
        done();
        if(err){
          console.log(err);
          response.status(400).send(err);
        }
        else{
          response.status(201).send({message: 'Data deleted'});
        }
      });
    }
  });
});
app.patch('/public/update_row', function(request, response){
  pool.connect((err,db,done) => {
    if(err){
      return console.log(err);
    }
    else{
      var error_code = request.body.error_code
      var error_type = request.body.error_type;
      var error_description = request.body.error_description;
      var robot_tags = '{' + request.body.robot_tags + '}';
      db.query('UPDATE first SET error_type = $1 ,error_description = $2 ,robot_tags =$3 WHERE error_code = $4 ',[error_type, error_description,robot_tags,error_code]
    , (err,table) => {
      done();
      if(err){
        console.log(err);
        response.status(400).send(err);
      }
      else{
        console.log('data updated');
        response.status(201).send({message: 'Data updated'});
      }
    });
    }
  });
});
app.post('/public/new_row', function(request,response){
  pool.connect((err,db,done) => {
    if(err){
      return console.log(err);
    }
    else{
      console.log('inside post')
      var error_code = request.body.error_code
      var error_type = request.body.error_type;
      var error_description = request.body.error_description;
      var robot_tags = '{' + request.body.robot_tags + '}';
      db.query('INSERT INTO first (error_code, error_type, error_description , robot_tags) VALUES($1 , $2 ,$3,$4)',
      [error_code,error_type,error_description,robot_tags],(err,table) => {
        done();
        if(err){
          console.log(err);
          response.status(400).send(err);
        }
        else{
          console.log('data inserted');
          //db.end();
          response.status(201).send({message: 'Data inserted'});
        }

      });
    }
  });
})

app.listen(port, () => console.log('Listening on port' + port));
