
<?php
if($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = htmlspecialchars($_POST["from_name"]);
  $email = htmlspecialchars($_POST["from_email"]);
  $message = htmlspecialchars($_POST["message"]);

  $to = "s.tobler03@gmail.com";
  $subject = "Anfrage von $name";
  $body = "Name: $name\nEmail: $email\n\nNachricht:\n$message";

  $headers = "From: $email";

  if(mail($to, $subject, $body, $headers)) {
    echo "OK";
  } else {
    echo "Fehler";
  }
}
?>
