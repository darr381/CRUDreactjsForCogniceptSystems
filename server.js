let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const port = 3000;

let pool = new pg.Pool({
  user: 'postgres',
  database: 'cruerrorclassification',
  password: 'Darr@381',
  host: 'localhost',
  port: 5433,
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(request,response,next){
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept ");
  next();
});
app.get('/public/table_data', function(request, response){
  pool.connect(function(err,db,done){
    if(err){
      return response.status(400).send(err);
    }
    else{
      db.query("SELECT * FROM first", function(err,table){
        done();
        if(err){
          return response.status(400).send(err);
        }
        else{
          console.log("table sent");
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
      var s_num = request.body.s_num;
      db.query('DELETE FROM first WHERE s_num =$1 ',[s_num], (err,table)=>{
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
      var s_num = request.body.s_num;
      var error_type = request.body.error_type;
      var error_description = request.body.error_description;
      var robot_tags = '{' + request.body.robot_tags + '}';
      db.query('UPDATE first SET error_type = $1 ,error_description = $2 ,robot_tags =$3 WHERE s_num=$4',[error_type, error_description,robot_tags,s_num]
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
      var s_num = request.body.s_num;
      var error_type = request.body.error_type;
      var error_description = request.body.error_description;
      var robot_tags = '{' + request.body.robot_tags + '}';
      var resolution =  request.body.resolution ;
      db.query('INSERT INTO first (s_num , error_type, error_description , robot_tags, resolution) VALUES($1 , $2 ,$3 , $4 , $5)',
      [s_num,error_type,error_description,robot_tags,resolution],(err,table) => {
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
