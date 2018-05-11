/*jslint node: true */
"use strict";
const fs = require('fs');
const headlessWallet = require('dag-pizza-headless/start.js');
const eventBus = require('dag-pizza-dough/event_bus.js');

const configPath = "../wallets/";
const genesisConfigFile = configPath+"genesis-config.json";
let genesis_address;

function onError(err){
	throw Error(err);
}

function loadWalletConfig(onDone) {
	let data = fs.readFileSync(genesisConfigFile, 'utf8');
	let wallet = JSON.parse(data);
    genesis_address = wallet['address'];

	onDone();
}

function createPayment() {
	let composer = require('dag-pizza-dough/composer.js');
	let network = require('dag-pizza-dough/network.js');
	let callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});

	let arrOutputs = [
		{address: genesis_address, amount: 0},      // the change
		{address: 'Y4CBGPKWYXMTQ7LGDVD3EBL3CO54VPKZ', amount: 10000}  // the receiver
	];
	composer.composePaymentJoint([genesis_address], arrOutputs, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', function() {
	console.log("> Create payment");
    loadWalletConfig(function() {
		setInterval(createPayment, 1000*30);
	});
});
