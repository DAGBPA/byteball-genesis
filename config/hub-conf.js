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
	'2ENW4WKEYTVGNSL46YVEQBISHSRPC53D',
	'54PBHWKAEHNO2N3TEACRLYKQC2VUNSRF',
	'6E7NW3HQTMTWVC6ALPGRW4JLLRBUKGBW',
	'CIVUJVNVOFR7X77NQNJRZDRLZLXETKLN',
	'DFWMDFYBFCUHJIKDD2YC44K4DG3A2H46',
	'FK6ZHLE7SIXNUHCT25NTXBKQKXPOM7S5',
	'M6OWPKNG7PRCH4XXMYWYWVCIVUI4XYW3',
	'PEG7DXO5ST7E2Z2AZBJIUD5PLVFS76AF',
	'R3FGVXQVZWJFSHD3BBDJWPNJF2BDZ634',
	'S3N4J74BX7SOVT4BOWN6JOS4OIS5DSVS',
	'U4EJIFOINWKSOY4TQTAWXAI3E5A6TOOH',
	'WZ7ZR5HBUAQHVYWNYYFFKIHUUFXRNSUI'
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
