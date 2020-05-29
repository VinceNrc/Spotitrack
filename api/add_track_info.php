<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$username = "root";
$password = "root";
$database = "spotifydb";
$mysqli = new mysqli("localhost", $username, $password, $database);

// POST DATA
$data = json_decode(file_get_contents("php://input"));
if(isset($data->name_track)
	&& isset($data->name_artist)
	&& isset($data->preview_song)
	&& !empty(trim($data->name_track))
	&& !empty(trim($data->name_artist))
	&& !empty(trim($data->preview_song))
){
    $nameTrack = mysqli_real_escape_string($mysqli, trim($data->name_track));
    $nameArtist = mysqli_real_escape_string($mysqli, trim($data->name_artist));
		$nameAlbum = mysqli_real_escape_string($mysqli, trim($data->name_album));
		$dateAlbum = mysqli_real_escape_string($mysqli, trim($data->release_date_album));
		$coverAlbum = mysqli_real_escape_string($mysqli, trim($data->cover_album));
		$popularity = mysqli_real_escape_string($mysqli, trim($data->popularity_song));
		$preview = mysqli_real_escape_string($mysqli, trim($data->preview_song));
		$userid = mysqli_real_escape_string($mysqli, trim($data->user_id));

		// echo $nameTrack."\n";
		// echo $nameArtist."\n";
		// echo $nameAlbum."\n";
		// echo $dateAlbum."\n";
		// echo $coverAlbum."\n";
		// echo $popularity."\n";
		// echo $preview;

		$query = "INSERT INTO played_tracks(name_track,name_artist,name_album,date_album,popularity_track,preview_track,album_pic,iduser)
					    VALUES('$nameTrack','$nameArtist','$nameAlbum','$dateAlbum','$popularity','$preview','$coverAlbum','$userid')";

		if ($mysqli->query($query)) {
					echo json_encode(["success"=>1]);
					echo "New record created successfully";
		}
		else{
			echo json_encode(["success"=>0]);
		}


}
else if(isset($data->name_track)
	&& isset($data->name_artist)
	&& !isset($data->preview_song)
	&& !empty(trim($data->name_track))
	&& !empty(trim($data->name_artist))
){

	$nameTrack = mysqli_real_escape_string($mysqli, trim($data->name_track));
	$nameArtist = mysqli_real_escape_string($mysqli, trim($data->name_artist));
	$nameAlbum = mysqli_real_escape_string($mysqli, trim($data->name_album));
	$dateAlbum = mysqli_real_escape_string($mysqli, trim($data->release_date_album));
	$coverAlbum = mysqli_real_escape_string($mysqli, trim($data->cover_album));
	$popularity = mysqli_real_escape_string($mysqli, trim($data->popularity_song));
	$userid = mysqli_real_escape_string($mysqli, trim($data->user_id));

	$query = "INSERT INTO played_tracks(name_track,name_artist,name_album,date_album,popularity_track,album_pic,iduser)
						VALUES('$nameTrack','$nameArtist','$nameAlbum','$dateAlbum','$popularity','$coverAlbum','$userid')";

	if ($mysqli->query($query)) {
				echo json_encode(["success"=>1]);
				echo "New record created successfully";
		}
	else{
				echo json_encode(["success"=>0]);
	}
}
