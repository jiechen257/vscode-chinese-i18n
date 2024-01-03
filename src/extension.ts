import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	console.log("插件 highlight-chinese 已激活");
	let disposable = vscode.commands.registerCommand(
		"extension.highlightChinese",
		() => {
			const editor = vscode.window.activeTextEditor;
  
			if (editor) {
				const text = editor.document.getText();
				const chineseRegExp = /[\u4e00-\u9fa5]+/g;

				const edits: vscode.TextEdit[] = [];
				let match;
				while ((match = chineseRegExp.exec(text)) !== null) {
					const startPos = editor.document.positionAt(match.index);
					const endPos = editor.document.positionAt(
						match.index + match[0].length
					);
					const range = new vscode.Range(startPos, endPos);
					const edit = vscode.TextEdit.replace(range, `$t('${match[0]}')`);
					edits.push(edit);
				}

				const edit = new vscode.WorkspaceEdit();
				edit.set(editor.document.uri, edits);
				vscode.workspace.applyEdit(edit);
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
