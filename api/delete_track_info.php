
<?php
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// require "connect.php"


$username = "root";
$password = "root";
$database = "spotifydb";
$mysqli = new mysqli("localhost", $username, $password, $database);

$data = json_decode(file_get_contents("php://input"));
if(isset($data->idtodelete) && trim($data->idtodelete)){
  $idToDelete = mysqli_real_escape_string($mysqli, trim($data->idtodelete));
  $query = "DELETE FROM played_tracks WHERE id_track=$idToDelete";
  echo $query;
  if ($mysqli->query($query)) {
      echo json_encode(["success"=>1]);
  }
  else{
        echo json_encode(["success"=>0]);
  }
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
