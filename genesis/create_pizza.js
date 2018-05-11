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


const chef_budget = 1000000;
const chef_budget_count = 8;

const chefConfigFile = configPath+"chef-config.json";
const genesisConfigFile = configPath+"genesis-config.json";

let chefs = [];
let genesis_address;

let walletConfigData = {};
let arrOutputs = [];

const creation_message = "In pizza we eat";


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
    walletConfigData[wallet['address']] = wallet;
    arrOutputs.push({ address: genesis_address, amount: 0 });

    // Read chef config file
    data = fs.readFileSync(chefConfigFile, 'utf8');    
    let wallets = JSON.parse(data);

    for (let wallet of wallets) {
        walletConfigData[wallet['address']] = wallet;
        chefs.push(wallet['address']);

        for(let i = 0; i < chef_budget_count; ++i) {
            arrOutputs.push({address: wallet['address'], amount: chef_budget});
        }
    }
    chefs = chefs.sort();
    onDone();
}


function getDerivedKey(mnemonic_phrase, passphrase, account, is_change, address_index) {
    //console.log("**************************************************************");
    //console.log(mnemonic_phrase);

    let mnemonic = new Mnemonic(mnemonic_phrase);
    let xPrivKey = mnemonic.toHDPrivateKey(passphrase);
    //console.log(">> about to  signature with private key: " + xPrivKey);
    let path = "m/44'/0'/" + account + "'/"+is_change+"/"+address_index;
    let derivedPrivateKey = xPrivKey.derive(path).privateKey;
    //console.log(">> derived key: " + derivedPrivateKey);
    return derivedPrivateKey.bn.toBuffer({size:32});        // return as buffer
}


// signer that uses chef address
let signer = {
    readSigningPaths: function(conn, address, handleLengthsBySigningPaths) {
        handleLengthsBySigningPaths({r: constants.SIG_LENGTH});
    },
    readDefinition: function(conn, address, handleDefinition) {
        let wallet = walletConfigData[address];
        let definition = wallet["definition"];
        handleDefinition(null, definition);
    },
    sign: function(objUnsignedUnit, assocPrivatePayloads, address, signing_path, handleSignature) {
        let buf_to_sign = objectHash.getUnitHashToSign(objUnsignedUnit);
        let wallet = walletConfigData[address];
        let derivedPrivateKey = getDerivedKey(
            wallet["mnemonic_phrase"],
            wallet["passphrase"],
            0,
            wallet["is_change"],
            wallet["address_index"]
          );
        handleSignature(null, ecdsaSig.sign(buf_to_sign, derivedPrivateKey));
    }
};


function createGenesisUnit(onDone) {
    let composer = require('dag-pizza-dough/composer.js');
    let network = require('dag-pizza-dough/network.js');

    let savingCallbacks = composer.getSavingCallbacks({
        ifNotEnoughFunds: onError,
        ifError: onError,
        ifOk: function(objJoint) {
            network.broadcastJoint(objJoint);
            onDone(objJoint.unit.unit);
        }
    });

    composer.setGenesis(true);

    let genesisUnitInput = {
        witnesses: chefs,
        paying_addresses: chefs,
        outputs: arrOutputs,
        signer: signer,
        callbacks: {
            ifNotEnoughFunds: onError,
            ifError: onError,
            ifOk: function(objJoint, assocPrivatePayloads, composer_unlock) {
                constants.GENESIS_UNIT = objJoint.unit.unit;
                savingCallbacks.ifOk(objJoint, assocPrivatePayloads, composer_unlock);
            }
        },
        messages: [{
            app: "text",
            payload_location: "inline",
            payload_hash: objectHash.getBase64Hash(creation_message),
            payload: creation_message
        }]
    };
    composer.composeJoint( genesisUnitInput );
}


eventBus.once('headless_wallet_ready', function() {
    console.log("> Create genesis unit");
    loadWalletConfig(function() {
        createGenesisUnit(function(genesisHash) {
            console.log("\n\nGenesis unit: " + genesisHash+ "\n\n");
            let placeholders = Array.apply(null, Array(chefs.length)).map(function(){ return '(?)'; }).join(',');
            db.query("REPLACE INTO my_witnesses (address) VALUES "+placeholders, chefs, function() {
                console.log('inserted chefs');
            });
        });
    });
});
