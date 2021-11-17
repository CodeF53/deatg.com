
<!DOCTYPE html>
<html>
  <head>
    <title>bot of deatg</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="old/png/bot_small.png" >
    <style>
      #main {
        width: 45%; 
        border: 1px solid black; 
        padding: 3%; 
        background-color: white; 
        margin: 2% 23% 2% 23%;  
      }
      #images {
        width: 55%; 
        margin: 2% 20% 2% 20%;
      }
      #header {
        width: 90%; 
        border: 1px solid black; 
        padding: 5%; 
        background-color: white; 
        margin: 2% 0% 2% 0%;  
        background-image: linear-gradient(white, gray); 
        background-size: cover;
      }
      #leaderboard p {
        color: white;
        background-color: black;
      }
    </style>
  </head>
  <body style="background-image: url('old/png/discord.PNG')">
     <div id="main">
        <div id="header">
           <a href="index.html"><img src="old/png/back.png"/></a><br>
           <h1>bot of deatg</h1>
           <img src="old/png/bot_small.png" alt="bot" style="width: 100%;"/>
           <a href="https://discord.com/api/oauth2/authorize?client_id=847900236071567390&permissions=0&scope=bot" style="font-size: 25px;">click here to invite bot to server</a>
        </div>
        <div id="leaderboard">

        </div>
        <div id="dom-target">

          <?php
            $host = "ec2-52-44-31-100.compute-1.amazonaws.com";
            $user = "bkpsbvehfzmaip";
            $password = getenv("DATABASE_PASSWORD");
            $dbname = "d9sog7i18caten";
            $port = "5432";

            $con = pg_connect("host=$host dbname=$dbname user=$user password=$password")
                or die ("Could not connect to server\n"); 

            $query = "SELECT * FROM users ORDER BY xp desc"; 

            $rs = pg_query($con, $query) or die("Cannot execute query: $query\n");

            echo "<p id=\"data\">";

            $database_data = "";

            $token = getenv("BOT_TOKEN");

            $json_options = [
              "http" => [
                "method" => "GET",
                "header" => "Authorization: Bot $token"
              ]
            ];
            $json_context = stream_context_create($json_options);
            
            foreach ($json_decode as $key => $val) {
              echo "$val, ";
           }

            while ($row = pg_fetch_row($rs)) {
              //echo "$row[0],$row[1],$row[2]|";
              $json_get = file_get_contents("https://discord.com/api/v9/users/$row[0]", false, $json_context);
              $json_decode = json_decode($json_get, true);
              echo "$json_decode[0], $json_decode[1], $json_decode[2]";
              echo "<div class=\"user\"> <img src=\"https://cdn.discordapp.com/avatars/" . $row[0] . "/" . $json_decode["avatar"] . ".webp?size=80\"/> <p>" . $json_decode["username"] . "#" . $json_decode["discriminator"] . ":level " . $row[2] . ", xp " . $row[1] . "</p> </div>";
            }

            echo $database_data;

            echo "</p>";

            



          ?>
        </div>
     </div>
  </body>
  <script>
    function GetData() 
    {
      var div = document.getElementById("dom-target");
      var text = div.textContent;
      console.log(text);
      const Data = text.toString().split("|");
      Data.forEach(TheLoop);
      
    }

    function TheLoop(element) 
    {
      const Data = element.toString().split(",");
      Data.forEach(TheSubLoop);
    }

    function TheSubLoop(element)
    {
      var div = document.getElementById('leaderboard');
      p = document.createElement("p");
      if (element.length == 18 || element.length == 19) 
      {
        p.setAttribute("id", "userid");
      }
      p.innerHTML = element;
      div.append(p);
    }
  </script>

</html>

