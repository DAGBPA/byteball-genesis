/*jslint node: true */
"use strict";

exports.clientName = 'dagpizza';
exports.minClientVersion = '0.1.0';

// https://console.developers.google.com
exports.pushApiProjectNumber = 0;
exports.pushApiKey = '';

exports.port = 6611;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = true;
exports.bSaveJointJson = true;
exports.bLight = false;

// this is used by wallet vendor only, to redirect bug reports to developers' email
exports.bug_sink_email = 'admin@example.org';
exports.bugs_from_email = 'bugs@example.org';

exports.HEARTBEAT_TIMEOUT = 300*1000;

exports.storage = 'sqlite';


exports.initial_witnesses = [
	'2EJUTB3UPBUH6RWHNLS7PMTXXUA3YO4O',
	'4TGKERS33UWVH6EGSCNOOY3FIS4FFAMG',
	'4UTAUHJKFC6QVHS2524RXUWFRWURJKEF',
	'6SQXNZGBQXLR4LFTCTDWGEHIP675EPPM',
	'DQ4UINMRE7WBN5ET2RUKVZSOKRWDYX75',
	'GKIR2PNT5L5B3PGFPY36T47DX4IDUFN5',
	'HAV6GVOQWNQZEHQQ4EKNWSTQZOEB72SD',
	'HLLGWWZSACGMTAXE2JZH7R726YEWJ2F2',
	'I6PCBM6Q67AFO4TDGB6JKJ64RTHEYVSP',
	'KMVJ2RKO2BCHWXNGBWTBWICZ7OBY3ETH',
	'TWE5KHLJISFE42QSZ7SKO64XVRIX6JKZ',
	'VPTZWFS4ZKOUDRJPV5WRQAPQAPDWBXKK'
];

/* testnet
exports.initial_witnesses = [
	'3HNHMZCCPINTBGJHDP6UAT53IB4WNAD2',
	'3PICZP4I4GVKW767CV3RKQXEXOIPHB7F',
	'A5ZRRMKHFBY35LPEII3H7DYVTQX3OSLE',
	'BW4X7A5FUALRVJMIPV5C6FUMFYSHSPVV',
	'F34S5JKFLXSBRFXWSULFIU4IGZAUFWZW',
	'JLS6RBASYAM5DF2ZZ6L2CHFEUMETW4UM',
	'LUGMHIRFQ5Y4JNFBMZ7EHFDRYECASCJU',
	'OD6FZRMAYVEE5YACRIFZSYFZXO4FUIL2',
	'Q7XMC3GXPWALIBMGYIDZQCNAINCFA5XX',
	'XMKZO4QD7Y2FD6CKVGV6MOJ7ALM2PMV4',
	'XVNA2DMK7P4TMFLVB6M5DSBC7Q4DLZBS',
	'XYEPISY7WPZWOO3TTOCPNW6IFCZI3CN2'
];
*/

exports.initial_peers = [
];

/*
exports.trustedRegistries = {
	'AM6GTUKENBYA54FYDAKX2VLENFZIMXWG': 'market'
};
*/

console.log('finished hub conf');
