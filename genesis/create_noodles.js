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


function createNoodles(onDone){
	let composer = require('dag-pizza-dough/composer.js');
	let network = require('dag-pizza-dough/network.js');

	let callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
			onDone(objJoint.unit.unit);
		}
	});
	let asset = {
		cap: (1+2*2+5+10+20*2+50+100+200*2+500+1000+2000*2+5000+10000+20000*2+50000+100000)*1e11,
		is_private: true,
		is_transferrable: true,
		auto_destroy: false,
		fixed_denominations: true,
		issued_by_definer_only: true,
		cosigned_by_definer: false,
		spender_attested: false,
		denominations: [
			{denomination: 1, count_coins: 1e11},
			{denomination: 2, count_coins: 2e11},
			{denomination: 5, count_coins: 1e11},
			{denomination: 10, count_coins: 1e11},
			{denomination: 20, count_coins: 2e11},
			{denomination: 50, count_coins: 1e11},
			{denomination: 100, count_coins: 1e11},
			{denomination: 200, count_coins: 2e11},
			{denomination: 500, count_coins: 1e11},
			{denomination: 1000, count_coins: 1e11},
			{denomination: 2000, count_coins: 2e11},
			{denomination: 5000, count_coins: 1e11},
			{denomination: 10000, count_coins: 1e11},
			{denomination: 20000, count_coins: 2e11},
			{denomination: 50000, count_coins: 1e11},
			{denomination: 100000, count_coins: 1e11}
		]
	};
	composer.composeAssetDefinitionJoint(genesis_address, asset, headlessWallet.signer, callbacks);
}

eventBus.once('headless_wallet_ready', function() {
    loadWalletConfig(function() {
        createNoodles(function(assetHash) {
            console.log("noodles asset created: " + assetHash);
            //process.exit(0);
        });
    });
});

