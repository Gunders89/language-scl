'use babel';

import LanguageSclView from './language-scl-view';
import { CompositeDisposable } from 'atom';
import indermediateProvider from './indermediate-provider';

export default {

  languageSclView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageSclView = new LanguageSclView(state.languageSclViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageSclView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-scl:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageSclView.destroy();
  },

  serialize() {
    return {
      languageSclViewState: this.languageSclView.serialize()
    };
  },

  toggle() {
    console.log('LanguageScl was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

  getProvider(){
    return [intermediateProvider];
  }

};
