<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eXquisite - Bank Transfer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <img src="https://i.imgur.com/uYrWLAD.png" alt="eXquisite Logo" class="logo">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="menu.html">Menu</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <section class="bank-transfer">
        <h1>Bank Transfer Details</h1>
        <?php
        // Determine the selected item and size from the form submission
        $item = htmlspecialchars($_POST['menu-item']);
        $size = htmlspecialchars($_POST['size']);

        // Set the price based on the selected item and size
        $price = 0;
        switch ($item) {
            case "Afang Soup":
                $price = $size === "5L" ? 25000 : ($size === "3L" ? 20000 : 0);
                break;
            case "Banga Soup":
                $price = $size === "5L" ? 25000 : ($size === "3L" ? 20000 : ($size === "2L" ? 15000 : 0));
                break;
            case "Fisherman Soup":
                $price = $size === "5L" ? 35000 : ($size === "3L" ? 30000 : ($size === "2L" ? 25000 : 0));
                break;
            case "Egusi Soup":
                $price = $size === "5L" ? 25000 : ($size === "3L" ? 20000 : ($size === "2L" ? 15000 : 0));
                break;
            case "Ogbono Soup":
                $price = $size === "5L" ? 25000 : ($size === "3L" ? 20000 : ($size === "2L" ? 15000 : 0));
                break;
            case "Bitter Leaf Soup":
                $price = $size === "5L" ? 25000 : ($size === "3L" ? 20000 : ($size === "2L" ? 15000 : 0));
                break;
            case "Native Soup":
                $price = $size === "5L" ? 25000 : ($size === "3L" ? 20000 : ($size === "2L" ? 15000 : 0));
                break;
            case "Seafood Okro":
                $price = $size === "5L" ? 30000 : ($size === "3L" ? 25000 : ($size === "2L" ? 20000 : 0));
                break;
            case "White Soup":
                $price = $size === "5L" ? 30000 : ($size === "3L" ? 25000 : ($size === "2L" ? 20000 : 0));
                break;
            case "Assorted Meat Stew":
                $price = $size === "1L" ? 10000 : ($size === "0.5L" ? 5000 : 0);
                break;
            case "Goat Meat Stew":
                $price = $size === "1L" ? 12000 : ($size === "0.5L" ? 6000 : 0);
                break;
            case "Chicken Stew":
                $price = $size === "1L" ? 10000 : ($size === "0.5L" ? 5000 : 0);
                break;
            case "Turkey Stew":
                $price = $size === "1L" ? 12000 : ($size === "0.5L" ? 6000 : 0);
                break;
            case "Catfish Stew":
                $price = $size === "1L" ? 13000 : ($size === "0.5L" ? 6500 : 0);
                break;
            case "Gizzard Stew":
                $price = $size === "1L" ? 12000 : ($size === "0.5L" ? 6000 : 0);
                break;
            case "Stockfish Stew":
                $price = $size === "1L" ? 14000 : ($size === "0.5L" ? 7000 : 0);
                break;
            case "Exquisite Special Sauce":
                $price = $size === "1L" ? 15000 : ($size === "0.5L" ? 7500 : 0);
                break;
            case "Tilapia Peppersoup":
                $price = $size === "1L" ? 15000 : ($size === "0.5L" ? 7500 : 0);
                break;
            case "Assorted Peppersoup":
                $price = $size === "1L" ? 16000 : ($size === "0.5L" ? 8000 : 0);
                break;
            case "Cowtail Peppersoup":
                $price = $size === "1L" ? 18000 : ($size === "0.5L" ? 9000 : 0);
                break;
            case "Goat Meat Peppersoup":
                $price = $size === "1L" ? 18000 : ($size === "0.5L" ? 9000 : 0);
                break;
            case "Croaker Peppersoup":
                $price = $size === "1L" ? 20000 : ($size === "0.5L" ? 10000 : 0);
                break;
            case "Seafood Peppersoup":
                $price = $size === "1L" ? 25000 : ($size === "0.5L" ? 12500 : 0);
                break;
            case "Dry Fish Peppersoup":
                $price = $size === "1L" ? 22000 : ($size === "0.5L" ? 11000 : 0);
                break;
            default:
                $price = 0;
        }
        ?>

        <p>Account Number: 8157772259</p>
        <p>Bank Name: Palmpay</p>
        <p>Account Name: Abara Comfort Pius</p>
        <p>Amount to be Paid: ₦<?php echo number_format($price, 2); ?></p>
        
        <form action="order_confirmation.php" method="POST">
            <input type="hidden" name="order-details" value="<?php echo htmlspecialchars($_POST['order-details']); ?>">
            <button type="submit" name="payment-status" value="paid">Payment Made</button>
            <button type="submit" name="payment-status" value="cancel">Cancel Order</button>
        </form>
    </section>
    <footer>
        <p>&copy; 2024 eXquisite. All rights reserved.</p>
        <p>eXquisite is registered with the Corporate Affairs Commission (CAC) of Nigeria. CAC Number: Exquisite BN: 3145838</p>
    </footer>
</body>
</html>
