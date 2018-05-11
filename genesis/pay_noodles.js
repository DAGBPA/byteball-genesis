/*jslint node: true */
"use strict";
const fs = require('fs');
const db = require('dag-pizza-dough/db.js');
const eventBus = require('dag-pizza-dough/event_bus.js');
const headlessWallet = require('dag-pizza-headless/start.js');
const constants = require('dag-pizza-dough/constants.js');
const objectHash = require('dag-pizza-dough/object_hash.js');
const Mnemonic = require('bitcore-mnemonic');
const ecdsaSig = require('dag-pizza-dough/signature.js');
const validation = require('dag-pizza-dough/validation.js');

const configPath = "../wallets/";
const genesisConfigFile = configPath+"genesis-config.json";
let genesis_address;


function onError(err) {
    if (err) {
        throw Error(err);
    }
}


function loadWalletConfig(onDone) {
    // Read genesis config file
	let data = fs.readFileSync(genesisConfigFile, 'utf8');
	let wallet = JSON.parse(data);
    genesis_address = wallet['address'];
    onDone();
}


function createNoodlesPayment(){
	var network = require('dag-pizza-dough/network.js');
	var indivisibleAsset = require('dag-pizza-dough/indivisible_asset.js');
	var walletGeneral = require('dag-pizza-dough/wallet_general.js');
	
	indivisibleAsset.composeAndSaveIndivisibleAssetPaymentJoint({
		asset: constants.NOODLES_ASSET, 
		paying_addresses: [genesis_address],
		fee_paying_addresses: [genesis_address],
		change_address: genesis_address,
		to_address: "Y4CBGPKWYXMTQ7LGDVD3EBL3CO54VPKZ",
		amount: 21110000000000000-2500, 
		tolerance_plus: 0, 
		tolerance_minus: 0, 
		signer: headlessWallet.signer, 
		callbacks: {
			ifError: onError,
			ifNotEnoughFunds: onError,
			ifOk: function(objJoint, arrRecipientChains, arrCosignerChains){
				network.broadcastJoint(objJoint);
				if (arrRecipientChains){ // if the asset is private
					// send directly to the receiver
					//network.sendPrivatePayment('wss://example.org/bb', arrRecipientChains);
					
					// or send to the receiver's device address through the receiver's hub
					walletGeneral.sendPrivatePayments("0332EAWUPAABKFRQLUBEAQL44INCLPRE2", arrRecipientChains);
				}
			}
		}
	});
}

eventBus.once('headless_wallet_ready', function() {
	console.log("> Create noodles payment");
    loadWalletConfig(function() {
        createNoodlesPayment();
    });
});

