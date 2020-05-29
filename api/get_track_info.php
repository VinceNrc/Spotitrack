
<?php
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// require "connect.php"


$username = "root";
$password = "root";
$database = "spotifydb";
$mysqli = new mysqli("localhost", $username, $password, $database);


$query = "SELECT * FROM played_tracks";


if ($tracks = $mysqli->query($query)) {
  if(mysqli_num_rows($tracks) > 0){
    $all_tracks = mysqli_fetch_all($tracks,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"track"=>$all_tracks]);
    }
    else{
      echo json_encode(["success"=>0]);
    }
        $tracks->free();
}


// $tracks = mysqli_query($db_conn,"SELECT * FROM `users`");
// if(mysqli_num_rows($allUsers) > 0){
//     $all_users = mysqli_fetch_all($allUsers,MYSQLI_ASSOC);
//     echo json_encode(["success"=>1,"users"=>$all_users]);
// }
// else{
//     echo json_encode(["success"=>0]);
// }
?>
