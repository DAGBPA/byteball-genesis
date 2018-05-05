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
	'4SLXDI7VHHXW5UOBQEQTRP6XMPYMXMYP',
	'5MUJKK5RGOZXFD3BKFCY5KPSUOXS5MMJ',
	'BKUUB7ONE273XXMWMI2M222LT3AYSC4K',
	'FUKT6WRTZ54XR7EEXBHH3HK5MXC4RIBA',
	'G6G2OX7RPWQIHB3GVPA5KUU6YSJ4JOCD',
	'IN3TXAYFSQ54IWSQ5WO4AYOPU7IETJY7',
	'IZAE4LC5PJJYYGHDAM3P7CALOBK4642U',
	'LGWV5TFU6FIWFQRUPLS7XYW6WJHUDBUK',
	'LNAB7BGIP7I45WUAKIOYDXNKYEIXGF6O',
	'TE44ICY4NRDOTHFZQQQPIESFUJPB3U7N',
	'VBVINFYJA7YNIQIERZOJSYJBNJ4OHQSB',
	'YREYR7BS57RUFDQ7Z2GH5SDQE5JA22W6'
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
