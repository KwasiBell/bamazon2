var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "flyguy89",
  database: 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function queryProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    inquirer.prompt([
      {
        type: "input",
        message: "What is the Item ID of the product you would like to buy?",
        name: "product",
        filter: Number
      },

      {
        type: "input",
        name: "quantity",
        message: "How many units of this product would you like to buy?",
        filter: Number
      }
    ]).then(function (answer) {

      checkQuantity(answer)


    });
  });
}

function productInfo() {
  queryProducts()

};
function checkQuantity(item){
  if (item.product !== "") {

    console.log(item.product);
  }
  connection.query("SELECT * FROM products where item_id =?",[item.product], function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    if (res.length === 0) {
      console.log('ERROR: Select a valid Item ID from the Products list.');
      start();
    }
  });

}

function start(){
  productInfo()
}
