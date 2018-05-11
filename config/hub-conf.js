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

/* new testnet
exports.initial_witnesses = [
	'2FF7PSL7FYXVU5UIQHCVDTTPUOOG75GX',
	'2GPBEZTAXKWEXMWCTGZALIZDNWS5B3V7',
	'4H2AMKF6YO2IWJ5MYWJS3N7Y2YU2T4Z5',
	'DFVODTYGTS3ILVOQ5MFKJIERH6LGKELP',
	'ERMF7V2RLCPABMX5AMNGUQBAH4CD5TK4',
	'F4KHJUCLJKY4JV7M5F754LAJX4EB7M4N',
	'IOF6PTBDTLSTBS5NWHUSD7I2NHK3BQ2T',
	'O4K4QILG6VPGTYLRAI2RGYRFJZ7N2Q2O',
	'OPNUXBRSSQQGHKQNEPD2GLWQYEUY5XLD',
	'PA4QK46276MJJD5DBOLIBMYKNNXMUVDP',
	'RJDYXC4YQ4AZKFYTJVCR5GQJF5J6KPRI',
	'WELOXP3EOA75JWNO6S5ZJHOO3EYFKPIR'
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
