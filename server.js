const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_SECRET_STRIPE_KEY');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/processOrder', async (req, res) => {
    const { name, phone, address, menuItem, quantity, stripeToken } = req.body;
    
    try {
        // Create a charge
        const amount = calculateAmount(menuItem, quantity);
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: `Order by ${name}: ${menuItem}`,
            source: stripeToken,
        });
        
        // Handle order creation (e.g., save to database)
        // ...

        res.send({ success: true });
    } catch (error) {
        console.error('Payment failed:', error);
        res.send({ success: false, message: error.message });
    }
});

function calculateAmount(menuItem, quantity) {
    // Implement logic to calculate the amount based on menuItem and quantity
    let pricePerUnit;
    switch (menuItem) {
        case 'Afang Soup 5L':
        case 'Banga Soup 5L':
        case 'Egusi Soup 5L':
        case 'Ogbono Soup 5L':
        case 'Bitter Leaf Soup 5L':
        case 'Native Soup 5L':
        case 'White Soup 5L':
            pricePerUnit = 2500; // Price in cents
            break;
        case 'Fisherman Soup 5L':
        case 'Seafood Okro 5L':
            pricePerUnit = 3500; // Price in cents
            break;
        default:
            pricePerUnit = 2500; // Default price in cents
    }
    return pricePerUnit * quantity;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
