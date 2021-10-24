<?php 

// if (file_exists('./produkty-dlabystrzakow.xml')) {
//     $xml = simplexml_load_file('./produkty-dlabystrzakow.xml');
 
//     print_r($xml);
// } else {
//     exit('Failed to open file');
// }
if (filter_var('https://dlabystrzakow.pl/xml/produkty-dlabystrzakow.xml', FILTER_VALIDATE_URL)) {
    $xml = simplexml_load_file('https://dlabystrzakow.pl/xml/produkty-dlabystrzakow.xml');
    header('Content-Type: application/json');
    $json = json_encode($xml, JSON_PRETTY_PRINT);
    $bytes = file_put_contents("./booksfromxlmlink.json", $json);
    echo "The number of bytes written are $bytes.";
    echo $json; 
} else {
    $localxml = simplexml_load_file('./produkty-dlabystrzakow.xml');
 echo $localxml->getName();
}

//$url = 'https://dlabystrzakow.pl/xml/produkty-dlabystrzakow.xml';
//*****/
//Getting data from .xml local file 
// $books = simplexml_load_file('./produkty-dlabystrzakow.xml'); 
//header() function to notify the browser about the JSON format.
// header('Content-Type: application/json');
//encode array to json, parameter JSON_PRETTY_PRINT to prettify the JSON string 
// $json = json_encode($books, JSON_PRETTY_PRINT);


//Create new file books.json with data from xml $books
// $bytes = file_put_contents("./books.json", $json); 
// echo "The number of bytes written are $bytes.";
// echo $json; 

//Get data from books.json local file
// $Json = file_get_contents("./books.json");
// $dataArray = json_decode($Json, true);
// $dataObject = json_decode($Json);
// echo("The data is: \n");
// var_dump($dataObject);   
  

// echo $dataArray['tytul'];
// foreach ($ksiazka as $key=> $data1) {
    // echo $key, " : ";
    // echo $data1, "\n";
   
// }
?>