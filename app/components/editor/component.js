import Component from '@glimmer/component';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema as basic } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { action } from '@ember-decorators/object';

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const schema = new Schema({
  nodes: addListNodes(basic.spec.nodes, 'paragraph block*', 'block'),
  marks: basic.spec.marks
});

export default class EditorComponent extends Component {
  @action
  setupEditor(el) {
    let contentEl = el.querySelector('.content');
    this.editorView = new EditorView(el, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(contentEl),
        plugins: exampleSetup({ schema })
      })
    });
  }

  @action
  destroyEditor() {
    this.editorView.destroy();
  }
}
