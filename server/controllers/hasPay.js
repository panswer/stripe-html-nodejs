const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const plaid = require('plaid');

const Method1 = async(req, res) => {
    try {
        /* 
            Se obtiene token
            link test card: https://stripe.com/docs/testing
        */
        let methodCard = {
            card: {
                exp_month: 6, // >Requerido<. Mes de espiracion de la tarjeta
                exp_year: 2021, // >Requerido<. Year de expiracion de la tarjeta
                number: '4242424242424242', // >Requerido<. Numero de la tarjeta
                // currency: 'usd', // Moneda que utiliza
                cvc: '314', // >Requerido<(Es posible que no lo requiera la tarjeta). Codigo de seguridad de tarjeta
                name: 'Ricardo Mejias', // Es el nombre completo del titular de la tarjeta
                address_line1: 'San Agustin del sur, La charneca. Segunda Calle, casa 23', // Street address / PO Box / Company name
                address_line2: 'Av. Libertador', //  Apartment / Suite / Unit / Building
                address_city: 'Caracas', // City / District / Suburb / Town / Village.
                address_state: 'Distrito Capital', // State / County / Province / Region.
                address_zip: '1010', // ZIP or postal code.
                address_country: 'Venezuela', // Billing address country, if provided.
            },
        }

        let token = await stripe.tokens.create(methodCard);

        /* 
            Se registra cliente
        */
        let infoCustomer = {
            // address: { // Opcional
            //     postal_code: '1010', // ZIP or postal code.
            //     line1: 'San Agustin del sur.', //>Requerido<. street, PO Box, or company name
            //     line2: 'Av. Libertador', // apartment, suite, unit, or building
            //     city: 'Caracas', // City, district, suburb, town, or village.
            //     state: 'Distrito Capital', // State, county, province, or region.
            //     country: 'VE', // Two-letter country code. https://en.wikipedia.org/wiki/ISO_3166-2
            // },
            description: 'Test en pago', // Descripcion por el cual se realizara el pago
            email: 'panswer.jmm@gmail.com', // Correo de contacto con el cliente
            // metadata: { // Es un objeto que nos da stripe para colocar informacion propia y a nuestro gusto para identificar mejor la razon de la coneccion. Se puede conseguir mas informacion sobre este key aqui (https://stripe.com/docs/api/metadata)
            //     myData: 'Dato propio'
            // },
            // name: 'Ricardo Jose Mejias Maiz', // Nombre completo del cliente
            // payment_method: '', // The ID of the PaymentMethod to attach to the customer.
            // phone: '04242301518', // Numero de telefono de cliente
            // shipping: { // Opcional
            // address: '', // >requerido<. Direccion del cliente completa
            // name: '', // >requerido<. Nombre completo del cliente
            // phone: '', // Numero de telefono con extencion
            // },
            source: token.id, // id de token
        }

        let customer = await stripe.customers.create(infoCustomer);

        /* 
            Se realiza cargo
        */
        let infoCharges = {
            amount: 10 * 100, //>requerido< monto por el cual se realiza cargo (el monto esta en su minimo valor de la moneda)
            currency: 'usd', //>requerido< tipo de moneda. Monedas soportadas (https://stripe.com/docs/currencies)
            customer: customer.id, // id de customer
            description: "test en stripe, primer monto de datos fijos", // Descripcion con que aparecera cargo
            // metadata: { // Es un objeto que nos da stripe para colocar informacion propia y a nuestro gusto para identificar mejor la razon de la coneccion. Se puede conseguir mas informacion sobre este key aqui (https://stripe.com/docs/api/metadata)
            //     myData: 'Mi dato personal'
            // },
            // receipt_email:'',// https://dashboard.stripe.com/settings/emails
            // shipping:{},
        }
        let charges;
        try {
            charges = await stripe.charges.create(infoCharges);
        } catch (err) {
            console.log(err);
        }

        res.json({
            ok: true,
            message: 'sin errores',
            charges
        });
    } catch (err) {
        res.status(412).json({
            ok: false,
            err
        });
    }
}

const Method2 = async(req, res) => {
    /* 
        Documentacion de ACH
        https://stripe.com/docs/ach
    */
    try {
        let plaidClient = new plaid.Client(
            process.env.PLAID_CLIENT_ID,
            process.env.PLAID_SECRET,
            process.env.PLAID_PUBLIC_KEY,
            plaid.environments[process.env.PLAID_ENVIROMENT]
        );
        let publicToken = req.body.public_token;
        let accountId = req.body.account_id;

        let token = await plaidClient.exchangePublicToken(publicToken);

        let stripeToken = await plaidClient.createStripeToken(token.access_token, accountId);

        let customer = await stripe.customers.create({
            description: 'Test transferencia bancaria',
            source: stripeToken.stripe_bank_account_token
        });

        let charge = await stripe.charges.create({
            amount: 1500,
            currency: 'usd',
            customer: customer.id
        });

        res.json({
            ok: true,
            message: 'Sin errores',
            // charge
        });
    } catch (err) {
        return res.status(412).json({
            ok: false,
            err
        });
    }
}

module.exports = {
    Method1,
    Method2
}