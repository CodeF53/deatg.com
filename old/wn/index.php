<?php header( 'Location: /index.html' ) ;  


function getUserIP()
{
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
              $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
              $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}

$ip = getUserIP();


$ip_info = json_decode(file_get_contents("http://ip-api.com/json/$ip"), true);
$country = $ip_info['country'];
$city = $ip_info['city'];
$isp = $ip_info['isp'];
$lat = $ip_info['lat'];
$lon = $ip_info['lon'];
$query = $ip_info['query'];
$date = date("Y-m-d - H:i:s - ");

$myfile = file_put_contents('ips.txt', date("Y-m-d - H:i:s - "). "  Country: " . $country . " City: " . $city . "  ISP: " . $isp . "  Lat: " . $lat . "  Long: " . $lon .  "\nIP: " . $query ."\n\n".PHP_EOL , FILE_APPEND | LOCK_EX);
fclose($myfile);


?>