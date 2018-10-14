
const child_process = require("child_process");
const readline = require("readline");

let exe = child_process.spawn("python", ["fakebot.py"]);

let scanner = readline.createInterface({
	input: exe.stdout,
	output: undefined,
	terminal: false
});

let outgoing_messages = ["Oh hi", "I help", "wif ur bugs"];

scanner.on("line", (line) => {
	console.log(`Hub received this message: ${line}`);
	if (outgoing_messages.length > 0) {
		write_to_exe(outgoing_messages[0]);
		outgoing_messages = outgoing_messages.slice(1);
	}
});

function write_to_exe(msg) {
	try {
		exe.stdin.write(msg + "\n");
		console.log(`Hub wrote the message: ${msg}`);
	} catch (e) {
		console.log(e);
	}
}

write_to_exe("Let's get this party started");
