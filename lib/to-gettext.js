'use babel';

import { CompositeDisposable } from 'atom';

export default {

  toGettextView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'to-gettext:convert': () => this.convert(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    let editor;
    if ((editor = atom.workspace.getActiveTextEditor())) {
      const selection = editor.getSelectedText();
      let finalText = null;
      if (this._isQuotedString(selection)) {
        finalText = ["_(", selection.slice(0,1), "fro: ", selection.slice(1), ")"].join('')
      } else {
        finalText = `= _("fro: ${selection}")`
      }
      editor.insertText(finalText);
    }
  },

  _isQuotedString(string) {
    return (
      (string.startsWith('"') && string.endsWith('"')) ||
      (string.startsWith("'") && string.endsWith("'"))
    );
  }
};
