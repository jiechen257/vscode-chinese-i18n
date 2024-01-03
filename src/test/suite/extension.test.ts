import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	test("Sample test", () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test("Highlight Chinese Characters and Wrap with $t()", async () => {
		// Open a new untitled document
		const document = await vscode.workspace.openTextDocument({
			content: `
				这是一个测试文件，包含一些中文字符。
				中文字符1
				中文字符2
				这个插件应该能够高亮这些中文字符并将其用$t()包裹。
		`,
		});
		const editor = await vscode.window.showTextDocument(document);

		// Trigger the command to highlight Chinese characters and wrap with $t()
		await vscode.commands.executeCommand("extension.highlightChinese");

		// Wait for the command to be executed
		await sleep(2000);

		// Get the updated text content
		const updatedText = editor.document.getText();
		console.log(updatedText);

		// Assert that Chinese characters are highlighted and wrapped with $t()
		assert.strictEqual(updatedText.includes("$t()"), true);
		assert.strictEqual(updatedText.includes("$t('中文字符')1"), true);
		assert.strictEqual(updatedText.includes("$t('中文字符')2"), true);
		console.log("passed---");
	});
}).timeout(10000);

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
