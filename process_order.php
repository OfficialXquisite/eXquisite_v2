<?php
// process_order.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $item = htmlspecialchars($_POST['item']);
    $quantity = htmlspecialchars($_POST['quantity']);
    $delivery = htmlspecialchars($_POST['delivery']);
    
    // Save or process the order (e.g., store in database, send email)
    // For demonstration purposes, we're just echoing the values
    echo "<h1>Order Received</h1>";
    echo "<p>Thank you, $name. Your order for $quantity of $item has been received.</p>";
    echo "<p>Delivery method: $delivery</p>";
    echo "<p>We will contact you at $phone or $email.</p>";
} else {
    echo "<h1>Error</h1>";
    echo "<p>Invalid request method.</p>";
}
?>
